import { useEffect, useRef, useState } from 'react'
import LogPanel from '../components/LogPanel.jsx'
import Note from '../components/Note.jsx'
import { useEventLog } from '../hooks/useEventLog.js'
import { describeNode, phaseName, phaseTone } from '../lib/eventUtils.js'

/**
 * 5) React 합성 이벤트(SyntheticEvent) 와 네이티브 이벤트의 관계
 *
 * React 17 부터 React 는 이벤트 리스너를 document 가 아니라
 * "루트 컨테이너(createRoot 에 넘긴 DOM 노드, 여기서는 #root)" 에
 * capture / bubble 두 개로 붙인다.
 *
 * 그래서 실제 실행 순서는 이렇게 된다.
 *
 *   document capture (네이티브)
 *   → #root capture  : React 가 onClickCapture 들을 위→아래로 대신 실행
 *   → div#outer capture (네이티브, #root 보다 아래)
 *   → button 자신의 네이티브 리스너 (AT_TARGET)
 *   → div#outer bubble (네이티브)
 *   → #root bubble   : React 가 onClick 들을 아래→위로 대신 실행
 *   → document bubble (네이티브)
 *
 * 즉 "부모의 네이티브 bubble 리스너" 가 "자식의 React onClick" 보다 먼저 실행된다.
 */
export default function ReactEventLab() {
  const { entries, push, clear } = useEventLog(24)
  const [stopIn, setStopIn] = useState('none') // none | react-button | native-outer

  const outerRef = useRef(null)
  const stopRef = useRef(stopIn)
  useEffect(() => {
    stopRef.current = stopIn
  }, [stopIn])

  // document / div#outer 에 네이티브 리스너를 직접 등록한다.
  useEffect(() => {
    const outer = outerRef.current
    if (!outer) return

    const log = (label) => (event) => {
      if (!outer.contains(event.target)) return
      push({
        tone: phaseTone(event.eventPhase),
        phase: phaseName(event.eventPhase),
        label,
        detail: `native · currentTarget=${describeNode(event.currentTarget)}`,
      })
    }

    const docCapture = log('document 네이티브 capture')
    const docBubble = log('document 네이티브 bubble')
    const outerCapture = log('div#outer 네이티브 capture')

    const outerBubble = (event) => {
      log('div#outer 네이티브 bubble')(event)
      if (stopRef.current === 'native-outer') {
        event.stopPropagation()
        push({
          tone: 'stop',
          phase: 'STOP',
          label: 'div#outer 네이티브 리스너에서 stopPropagation()',
          detail: '이벤트가 #root 까지 못 올라가므로 React onClick 이 전부 죽는다',
        })
      }
    }

    document.addEventListener('click', docCapture, true)
    document.addEventListener('click', docBubble)
    outer.addEventListener('click', outerCapture, true)
    outer.addEventListener('click', outerBubble)

    return () => {
      document.removeEventListener('click', docCapture, true)
      document.removeEventListener('click', docBubble)
      outer.removeEventListener('click', outerCapture, true)
      outer.removeEventListener('click', outerBubble)
    }
  }, [push])

  const reactLog = (label) => (event) =>
    push({
      tone: phaseTone(event.eventPhase),
      phase: phaseName(event.eventPhase),
      label,
      detail: `React SyntheticEvent · target=${describeNode(
        event.target,
      )} · currentTarget=${describeNode(event.currentTarget)}`,
    })

  const onButtonClick = (event) => {
    reactLog('button React onClick')(event)
    if (stopIn === 'react-button') {
      event.stopPropagation()
      push({
        tone: 'stop',
        phase: 'STOP',
        label: 'button React onClick 에서 event.stopPropagation()',
        detail: 'React 트리 전파 + 네이티브 전파(#root 위쪽) 모두 중단된다',
      })
    }
  }

  return (
    <section className="lab">
      <header className="lab-head">
        <h2>5. React 합성 이벤트 vs 네이티브 이벤트</h2>
        <p>
          React 의 <code>onClick</code> 은 해당 DOM 노드에 직접 붙은 리스너가 아닙니다. React 는
          루트 컨테이너(<code>#root</code>)에 리스너를 하나씩 붙여 두고, 이벤트가 거기 도달했을 때{' '}
          <b>DOM 트리를 따라가며 여러분의 핸들러를 대신 호출</b>합니다.
        </p>
      </header>

      <div className="controls">
        <label>
          전파 중단
          <select value={stopIn} onChange={(e) => setStopIn(e.target.value)}>
            <option value="none">중단 없음</option>
            <option value="react-button">button 의 React onClick 에서</option>
            <option value="native-outer">div#outer 의 네이티브 bubble 리스너에서</option>
          </select>
        </label>
        <button type="button" className="ghost" onClick={clear}>
          로그 지우기
        </button>
      </div>

      <div className="split">
        <div className="panel">
          <div
            id="outer"
            ref={outerRef}
            className="ring"
            onClickCapture={reactLog('div#outer React onClickCapture')}
            onClick={reactLog('div#outer React onClick')}
          >
            <span className="ring-label">div#outer — React 핸들러 + 네이티브 리스너</span>
            <div className="ring">
              <span className="ring-label">div#inner</span>
              <button
                type="button"
                className="target-btn"
                onClickCapture={reactLog('button React onClickCapture')}
                onClick={onButtonClick}
              >
                클릭!
              </button>
            </div>
          </div>

          <Note kind="info" title="예상 순서 (중단 없음)">
            <ol className="tight">
              <li>document 네이티브 capture</li>
              <li>div#outer React onClickCapture</li>
              <li>button React onClickCapture</li>
              <li>div#outer 네이티브 capture</li>
              <li>div#outer 네이티브 bubble</li>
              <li>button React onClick</li>
              <li>div#outer React onClick</li>
              <li>document 네이티브 bubble</li>
            </ol>
            <p className="muted">
              React 의 capture 핸들러가 <code>div#outer</code> 의 <b>네이티브</b> capture 보다 먼저
              실행되고, <code>button</code> 의 React <code>onClick</code> 이 부모의 네이티브 bubble
              리스너보다 <b>나중에</b> 실행됩니다. React 리스너가 그 노드가 아니라 더 위쪽인{' '}
              <code>#root</code> 에 붙어 있기 때문입니다.
            </p>
            <p className="muted">
              그래서 React 핸들러 줄의 <code>eventPhase</code> 뱃지는 "그 순간 네이티브 이벤트가{' '}
              <code>#root</code> 에서 어느 단계였는지"를 뜻합니다. React 트리 기준의 단계가 아닙니다.
            </p>
          </Note>
        </div>

        <div className="panel">
          <LogPanel entries={entries} onClear={clear} title="실행 순서" scrollable={false} />

          {stopIn === 'react-button' && (
            <Note kind="warn" title="React 의 stopPropagation 은 어디까지 막나">
              React 트리 위쪽 핸들러(<code>div#outer</code> 의 onClick)와 <code>#root</code> 보다
              위인 <code>document</code> bubble 은 막습니다. 하지만 <b>이미 실행된</b>{' '}
              <code>div#outer</code> 의 네이티브 bubble 리스너는 되돌릴 수 없습니다.
            </Note>
          )}
          {stopIn === 'native-outer' && (
            <Note kind="warn" title="네이티브에서 막으면 React 가 통째로 죽는다">
              이벤트가 <code>#root</code> 에 도달하지 못하므로 React 의 <code>onClick</code> 이 하나도
              실행되지 않습니다. 서드파티 스크립트가 상위 노드에서 <code>stopPropagation()</code> 을
              호출할 때 React 핸들러가 "안 먹는" 전형적인 원인입니다.
            </Note>
          )}
        </div>
      </div>
    </section>
  )
}
