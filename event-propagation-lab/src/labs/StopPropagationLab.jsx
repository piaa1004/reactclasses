import { useEffect, useRef, useState } from 'react'
import LogPanel from '../components/LogPanel.jsx'
import Note from '../components/Note.jsx'
import { useEventLog } from '../hooks/useEventLog.js'

/**
 * 4) 전파를 멈춰야 할 때
 *   ① stopPropagation()          — 이후 경로로의 전파 중단
 *   ② stopImmediatePropagation() — 전파 중단 + 같은 엘리먼트의 나머지 리스너까지 중단
 */
export default function StopPropagationLab() {
  const { entries, push, clear } = useEventLog(24)

  // ── ① 백드롭 닫기 패턴 ────────────────────────────────────────────────────
  const [open, setOpen] = useState(true)
  const [useStop, setUseStop] = useState(true)

  // ── ② 같은 엘리먼트의 리스너 A / B / C ────────────────────────────────────
  const [mode, setMode] = useState('none') // none | stop | stopImmediate
  const parentRef = useRef(null)
  const multiBtnRef = useRef(null)

  const modeRef = useRef(mode)
  useEffect(() => {
    modeRef.current = mode
  }, [mode])

  useEffect(() => {
    const parent = parentRef.current
    const btn = multiBtnRef.current
    if (!parent || !btn) return

    const handlerA = (event) => {
      push({ tone: 'tgt', phase: 'A', label: 'button 리스너 A 실행' })
      if (modeRef.current === 'stop') {
        event.stopPropagation()
        push({ tone: 'stop', phase: 'STOP', label: 'A 에서 stopPropagation()' })
      }
      if (modeRef.current === 'stopImmediate') {
        event.stopImmediatePropagation()
        push({ tone: 'stop', phase: 'STOP!', label: 'A 에서 stopImmediatePropagation()' })
      }
    }
    const handlerB = () => push({ tone: 'tgt', phase: 'B', label: 'button 리스너 B 실행' })
    const handlerC = () => push({ tone: 'tgt', phase: 'C', label: 'button 리스너 C 실행' })
    const onParent = () =>
      push({ tone: 'bub', phase: 'BUBBLING', label: 'div.multi-parent 리스너 실행' })

    btn.addEventListener('click', handlerA)
    btn.addEventListener('click', handlerB)
    btn.addEventListener('click', handlerC)
    parent.addEventListener('click', onParent)

    return () => {
      btn.removeEventListener('click', handlerA)
      btn.removeEventListener('click', handlerB)
      btn.removeEventListener('click', handlerC)
      parent.removeEventListener('click', onParent)
    }
  }, [push])

  return (
    <section className="lab">
      <header className="lab-head">
        <h2>4. stopPropagation / stopImmediatePropagation</h2>
      </header>

      <div className="split">
        {/* ① */}
        <div className="panel">
          <h3>① 백드롭 클릭으로 닫기</h3>
          <p className="muted">
            바깥(백드롭)을 누르면 닫히고, 안쪽 내용을 누르면 닫히지 않아야 합니다. 이 흔한 UI 가
            바로 Bubbling 제어로 만들어집니다.
          </p>

          <label className="inline">
            <input
              type="checkbox"
              checked={useStop}
              onChange={(e) => setUseStop(e.target.checked)}
            />
            내용 영역에서 <code>stopPropagation()</code> 호출
          </label>

          <div className="dialog-demo">
            {open ? (
              <div
                className="backdrop"
                onClick={() => {
                  push({ tone: 'bub', phase: 'BUBBLING', label: '백드롭 클릭 → 모달 닫기' })
                  setOpen(false)
                }}
              >
                <div
                  className="sheet"
                  onClick={(event) => {
                    if (useStop) {
                      event.stopPropagation()
                      push({
                        tone: 'stop',
                        phase: 'STOP',
                        label: '내용 클릭 → stopPropagation()',
                        detail: '백드롭 리스너까지 올라가지 않는다',
                      })
                    } else {
                      push({
                        tone: 'tgt',
                        phase: 'AT_TARGET',
                        label: '내용 클릭 → 그대로 전파',
                        detail: '곧 백드롭 리스너가 실행되어 모달이 닫힌다',
                      })
                    }
                  }}
                >
                  <strong>설정</strong>
                  <p>이 영역을 눌러도 닫히면 안 됩니다.</p>
                  <input placeholder="여기도 눌러 보세요" />
                </div>
              </div>
            ) : (
              <div className="closed">
                모달이 닫혔습니다.
                <button type="button" onClick={() => setOpen(true)}>
                  다시 열기
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ② */}
        <div className="panel">
          <h3>② 같은 엘리먼트에 리스너가 여러 개일 때</h3>
          <pre className="snippet">{`button.addEventListener('click', handlerA)
button.addEventListener('click', handlerB)
button.addEventListener('click', handlerC)`}</pre>

          <div className="controls">
            <label>
              handlerA 에서
              <select value={mode} onChange={(e) => setMode(e.target.value)}>
                <option value="none">아무것도 하지 않음</option>
                <option value="stop">stopPropagation()</option>
                <option value="stopImmediate">stopImmediatePropagation()</option>
              </select>
            </label>
          </div>

          <div className="multi-parent" ref={parentRef}>
            <span className="ring-label">div.multi-parent</span>
            <button type="button" ref={multiBtnRef}>
              리스너 3개가 걸린 버튼
            </button>
          </div>

          <Note kind="info" title="차이">
            <ul>
              <li>
                <code>stopPropagation()</code> : 부모(<code>div.multi-parent</code>)로는 안 가지만,{' '}
                <b>같은 버튼의 B · C 는 그대로 실행</b>됩니다.
              </li>
              <li>
                <code>stopImmediatePropagation()</code> : 부모도 못 가고, <b>B · C 도 실행되지 않</b>
                습니다.
              </li>
            </ul>
          </Note>
        </div>
      </div>

      <LogPanel entries={entries} onClear={clear} title="실행 순서" />
    </section>
  )
}
