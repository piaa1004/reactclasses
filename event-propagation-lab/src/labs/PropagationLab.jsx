import { useEffect, useRef, useState } from 'react'
import LogPanel from '../components/LogPanel.jsx'
import Note from '../components/Note.jsx'
import { describeNode, phaseName, phaseTone } from '../lib/eventUtils.js'

/**
 * 1) Capturing → Target → Bubbling 3단계 시각화
 *
 * window / document / body / div#app / div#box / button#btn 여섯 계층에
 * "진짜 DOM 리스너"를 붙이고, 실행 순서를 그대로 기록해서 재생한다.
 * React 합성 이벤트가 아니라 네이티브 이벤트라는 점이 중요하다.
 */

const NODES = [
  { id: 'window', label: 'window', virtual: true },
  { id: 'document', label: 'document', virtual: true },
  { id: 'body', label: 'body', virtual: true },
  { id: 'app', label: 'div#app', virtual: false },
  { id: 'box', label: 'div#box', virtual: false },
  { id: 'btn', label: 'button#btn', virtual: false },
]

const ALL_ON = Object.fromEntries(NODES.map((n) => [n.id, { capture: true, bubble: true }]))

const PLAY_INTERVAL = 420

export default function PropagationLab() {
  const appRef = useRef(null)
  const boxRef = useRef(null)
  const btnRef = useRef(null)

  const [enabled, setEnabled] = useState(ALL_ON)
  const [stopNode, setStopNode] = useState('none')
  const [stopPhase, setStopPhase] = useState('bubble')

  const [run, setRun] = useState([]) // 마지막 클릭 1회의 실행 순서
  const [runSeq, setRunSeq] = useState(0)
  const [cursor, setCursor] = useState(-1)

  // 리스너 안에서 최신 값을 읽기 위한 ref (리스너 재등록을 피한다)
  const stopRef = useRef({ node: 'none', phase: 'bubble' })
  useEffect(() => {
    stopRef.current = { node: stopNode, phase: stopPhase }
  }, [stopNode, stopPhase])

  const bufRef = useRef([])

  // ── (A) 러너: window 캡처 단계에 "가장 먼저" 등록되는 추적용 리스너 ──────────
  // DOM 경로상 window 의 캡처가 언제나 첫 번째이므로, 여기서 버퍼를 비우고
  // setTimeout(0) 으로 dispatch 가 모두 끝난 뒤 화면에 반영한다.
  useEffect(() => {
    const onStart = (event) => {
      if (!appRef.current?.contains(event.target)) return
      bufRef.current = []
      setTimeout(() => {
        setRun(bufRef.current.slice())
        setRunSeq((s) => s + 1)
      }, 0)
    }
    window.addEventListener('click', onStart, true)
    return () => window.removeEventListener('click', onStart, true)
  }, [])

  // ── (B) 6계층 × 2단계 리스너 등록 ─────────────────────────────────────────
  useEffect(() => {
    const targets = {
      window,
      document,
      body: document.body,
      app: appRef.current,
      box: boxRef.current,
      btn: btnRef.current,
    }

    const cleanups = []

    for (const node of NODES) {
      const el = targets[node.id]
      if (!el) continue

      for (const phase of ['capture', 'bubble']) {
        if (!enabled[node.id][phase]) continue
        const useCapture = phase === 'capture'

        const handler = (event) => {
          // 데모 영역 밖의 클릭(다른 탭 버튼 등)은 무시한다.
          if (!appRef.current?.contains(event.target)) return

          bufRef.current.push({
            id: `${runSeqKey()}-${node.id}-${phase}`,
            nodeId: node.id,
            registeredAs: phase,
            phase: phaseName(event.eventPhase),
            tone: phaseTone(event.eventPhase),
            label: `${node.label}  ·  ${phase} 리스너`,
            detail: `target=${describeNode(event.target)}  currentTarget=${describeNode(
              event.currentTarget,
            )}  eventPhase=${event.eventPhase}`,
          })

          const stop = stopRef.current
          if (stop.node === node.id && stop.phase === phase) {
            event.stopPropagation()
            bufRef.current.push({
              id: `${runSeqKey()}-${node.id}-${phase}-stop`,
              nodeId: node.id,
              phase: 'STOP',
              tone: 'stop',
              label: `${node.label} 에서 event.stopPropagation()`,
              detail: '이후 경로의 리스너는 실행되지 않는다',
            })
          }
        }

        el.addEventListener('click', handler, useCapture)
        cleanups.push(() => el.removeEventListener('click', handler, useCapture))
      }
    }

    return () => cleanups.forEach((fn) => fn())
  }, [enabled])

  // ── (C) 기록된 순서를 한 줄씩 재생 ────────────────────────────────────────
  useEffect(() => {
    if (run.length === 0) {
      setCursor(-1)
      return
    }
    let i = 0
    setCursor(0)
    const timer = setInterval(() => {
      i += 1
      if (i >= run.length) {
        clearInterval(timer)
        return
      }
      setCursor(i)
    }, PLAY_INTERVAL)
    return () => clearInterval(timer)
  }, [runSeq, run.length])

  const current = cursor >= 0 ? run[cursor] : null
  const ringClass = (id) =>
    [
      'ring',
      current?.nodeId === id ? 'is-active' : '',
      current?.nodeId === id ? `phase-${current.tone}` : '',
    ]
      .filter(Boolean)
      .join(' ')

  const toggle = (id, phase) =>
    setEnabled((prev) => ({
      ...prev,
      [id]: { ...prev[id], [phase]: !prev[id][phase] },
    }))

  return (
    <section className="lab">
      <header className="lab-head">
        <h2>1. Capturing → Target → Bubbling</h2>
        <p>
          여섯 계층에 <code>addEventListener</code> 를 직접 걸고, 클릭 한 번에 리스너가 실제로 어떤
          순서로 실행되는지 기록해서 재생합니다. 아래 체크박스로 리스너를 켜고 끄면 순서가 어떻게
          달라지는지 바로 확인할 수 있습니다.
        </p>
      </header>

      <div className="split">
        <div className="panel">
          <div className="stage">
            <div className={ringClass('window')}>
              <span className="ring-label">window</span>
              <div className={ringClass('document')}>
                <span className="ring-label">document</span>
                <div className={ringClass('body')}>
                  <span className="ring-label">body</span>
                  <div id="app" ref={appRef} className={ringClass('app')}>
                    <span className="ring-label">div#app</span>
                    <div id="box" ref={boxRef} className={ringClass('box')}>
                      <span className="ring-label">div#box</span>
                      <button
                        id="btn"
                        ref={btnRef}
                        type="button"
                        className={`target-btn ${current?.nodeId === 'btn' ? 'is-active' : ''}`}
                      >
                        클릭!
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <table className="matrix">
            <thead>
              <tr>
                <th>노드</th>
                <th>capture</th>
                <th>bubble</th>
              </tr>
            </thead>
            <tbody>
              {NODES.map((node) => (
                <tr key={node.id}>
                  <td>
                    <code>{node.label}</code>
                  </td>
                  {['capture', 'bubble'].map((phase) => (
                    <td key={phase}>
                      <input
                        type="checkbox"
                        checked={enabled[node.id][phase]}
                        onChange={() => toggle(node.id, phase)}
                        aria-label={`${node.label} ${phase}`}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="controls">
            <label>
              전파 중단 위치
              <select value={stopNode} onChange={(e) => setStopNode(e.target.value)}>
                <option value="none">중단 없음</option>
                {NODES.map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              중단 단계
              <select
                value={stopPhase}
                onChange={(e) => setStopPhase(e.target.value)}
                disabled={stopNode === 'none'}
              >
                <option value="capture">capture 리스너에서</option>
                <option value="bubble">bubble 리스너에서</option>
              </select>
            </label>
          </div>
        </div>

        <div className="panel">
          <LogPanel
            title="리스너 실행 순서 (마지막 클릭 1회)"
            entries={run}
            activeIndex={cursor}
            scrollable={false}
            onClear={() => setRun([])}
            emptyText="왼쪽 button#btn 을 클릭해 보세요."
          />

          <Note kind="info" title="여기서 꼭 확인할 것">
            <ul>
              <li>
                <code>button#btn</code> 을 클릭하면 <code>button</code> 에 등록한 리스너는 capture로
                등록했든 bubble로 등록했든 <b>eventPhase = 2 (AT_TARGET)</b> 로 실행됩니다. Target
                에서는 캡처/버블 구분이 없고 <b>등록한 순서</b>대로 실행됩니다.
              </li>
              <li>
                <code>div#box</code> 의 여백(버튼 바깥)을 클릭하면 <code>event.target</code> 이{' '}
                <code>div#box</code> 로 바뀌고, 그때는 <code>div#box</code> 가 Target 이 됩니다.
              </li>
              <li>
                어느 단계에서 실행되든 <code>event.target</code> 은 항상 처음 클릭된 엘리먼트,{' '}
                <code>event.currentTarget</code> 은 지금 실행 중인 리스너가 붙어 있는 엘리먼트입니다.
              </li>
            </ul>
          </Note>
        </div>
      </div>
    </section>
  )
}

// 로그 key 중복 방지용 (React key 전용, 의미 없음)
let keyCounter = 0
function runSeqKey() {
  keyCounter += 1
  return keyCounter
}
