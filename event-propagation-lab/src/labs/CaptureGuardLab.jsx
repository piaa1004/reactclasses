import { useEffect, useRef, useState } from 'react'
import LogPanel from '../components/LogPanel.jsx'
import Note from '../components/Note.jsx'
import { useEventLog } from '../hooks/useEventLog.js'
import { phaseName, phaseTone } from '../lib/eventUtils.js'

/**
 * 3) Capturing 이 필요한 순간 — "자식보다 먼저" 가로채기
 *
 * 결제 링크가 있는 모달. 약관에 동의하지 않았다면 링크의 자기 핸들러가
 * 실행되기 전에 부모가 먼저 막아야 한다.
 *   - capture 로 등록하면: 링크 핸들러가 아예 실행되지 않는다 (성공)
 *   - bubble 로 등록하면: 링크 핸들러가 이미 실행된 뒤라 늦었다 (실패)
 */
export default function CaptureGuardLab() {
  const { entries, push, clear } = useEventLog(24)

  const [guardPhase, setGuardPhase] = useState('capture') // capture | bubble | off
  const [agreed, setAgreed] = useState(false)
  const [charged, setCharged] = useState(false)

  const modalRef = useRef(null)
  const linkRef = useRef(null)

  const stateRef = useRef({ agreed })
  useEffect(() => {
    stateRef.current = { agreed }
  }, [agreed])

  // 부모(모달)의 가드 리스너
  useEffect(() => {
    const modal = modalRef.current
    if (!modal || guardPhase === 'off') return

    const useCapture = guardPhase === 'capture'
    const handler = (event) => {
      if (!linkRef.current?.contains(event.target)) return

      const blocked = !stateRef.current.agreed
      push({
        tone: phaseTone(event.eventPhase),
        phase: phaseName(event.eventPhase),
        label: `div#modal 가드 리스너 (${guardPhase})`,
        detail: blocked ? '약관 미동의 → preventDefault + stopPropagation' : '동의 확인됨 → 통과',
      })

      if (blocked) {
        event.preventDefault()
        event.stopPropagation()
      }
    }

    modal.addEventListener('click', handler, useCapture)
    return () => modal.removeEventListener('click', handler, useCapture)
  }, [guardPhase, push])

  // 링크 자신의 핸들러 = "결제 진행"
  useEffect(() => {
    const link = linkRef.current
    if (!link) return

    const handler = (event) => {
      event.preventDefault() // 데모이므로 실제 이동은 막는다
      push({
        tone: 'tgt',
        phase: phaseName(event.eventPhase),
        label: 'a#link 자신의 핸들러',
        detail: '💳 결제 API 호출!',
      })
      setCharged(true)
    }

    link.addEventListener('click', handler)
    return () => link.removeEventListener('click', handler)
  }, [push])

  const reset = () => {
    clear()
    setCharged(false)
  }

  const lateGuard = guardPhase === 'bubble' && !agreed

  return (
    <section className="lab">
      <header className="lab-head">
        <h2>3. Capturing 이 필요한 순간</h2>
        <p>
          부모가 <b>자식보다 먼저</b> 이벤트를 봐야 하는 요구사항이 있을 때 Capturing 이 답입니다.
          가드를 <code>capture</code> 와 <code>bubble</code> 로 바꿔 가며 결제 링크를 눌러 보세요.
        </p>
      </header>

      <div className="controls">
        <label>
          가드 등록 단계
          <select value={guardPhase} onChange={(e) => setGuardPhase(e.target.value)}>
            <option value="capture">{'{ capture: true } — Target 도달 전'}</option>
            <option value="bubble">기본(bubble) — Target 처리 후</option>
            <option value="off">가드 없음</option>
          </select>
        </label>
        <label className="inline">
          <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
          결제 약관에 동의합니다
        </label>
        <button type="button" className="ghost" onClick={reset}>
          초기화
        </button>
      </div>

      <div className="split">
        <div className="panel">
          <div id="modal" ref={modalRef} className="modal">
            <span className="ring-label">div#modal (가드 부착 지점)</span>
            <div className="content">
              <span className="ring-label">div.content</span>
              <p>주문 금액 : 129,000원</p>
              <a id="link" ref={linkRef} href="/payment" className="pay-link">
                결제 페이지로 이동
              </a>
            </div>
          </div>

          <pre className="snippet">{`modal.addEventListener(
  'click',
  (event) => {
    if (!agreed) {
      event.preventDefault()
      event.stopPropagation()   // 자식 핸들러까지 도달하지 못한다
    }
  },
  { capture: ${guardPhase === 'capture'} },
)`}</pre>

          <div className={`status ${charged ? 'bad' : 'ok'}`}>
            {charged ? '💳 결제가 실행되었습니다' : '결제 미실행'}
          </div>
        </div>

        <div className="panel">
          <LogPanel entries={entries} onClear={clear} title="실행 순서" />

          {guardPhase === 'capture' && (
            <Note kind="good" title="capture 가드 — 제때 막았다">
              이벤트가 Target(<code>a#link</code>)에 <b>도달하기 전에</b> 부모가 먼저 리스너를
              실행합니다. 여기서 <code>stopPropagation()</code> 을 호출하면 링크 자신의 핸들러는
              아예 실행되지 않습니다.
            </Note>
          )}
          {lateGuard && (
            <Note kind="warn" title="bubble 가드 — 이미 늦었다">
              Bubbling 은 Target 처리가 <b>끝난 뒤</b> 부모에게 옵니다. 로그를 보면 결제 API 가 이미
              호출된 다음 가드가 실행됩니다. 이런 요구사항에는 Capturing 을 써야 합니다.
            </Note>
          )}
          {guardPhase === 'off' && (
            <Note kind="info" title="가드 없음">
              링크 자신의 핸들러만 실행됩니다. 동의 여부와 무관하게 결제가 진행됩니다.
            </Note>
          )}
        </div>
      </div>
    </section>
  )
}
