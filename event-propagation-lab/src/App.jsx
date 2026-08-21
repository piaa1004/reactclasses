import { useState } from 'react'
import PropagationLab from './labs/PropagationLab.jsx'
import DelegationLab from './labs/DelegationLab.jsx'
import CaptureGuardLab from './labs/CaptureGuardLab.jsx'
import StopPropagationLab from './labs/StopPropagationLab.jsx'
import ReactEventLab from './labs/ReactEventLab.jsx'
import CheatSheet from './labs/CheatSheet.jsx'

const TABS = [
  { id: 'propagation', title: '1. 3단계 전파', Component: PropagationLab },
  { id: 'delegation', title: '2. 이벤트 위임', Component: DelegationLab },
  { id: 'capture', title: '3. Capturing 활용', Component: CaptureGuardLab },
  { id: 'stop', title: '4. 전파 중단', Component: StopPropagationLab },
  { id: 'react', title: '5. React 합성 이벤트', Component: ReactEventLab },
  { id: 'sheet', title: '6. 정리', Component: CheatSheet },
]

export default function App() {
  const [tab, setTab] = useState(TABS[0].id)
  const Active = TABS.find((t) => t.id === tab).Component

  return (
    <div className="app-shell">
      <header className="app-head">
        <h1>Event Propagation Lab</h1>
        <p>
          브라우저는 왜 <code>Capturing → Target → Bubbling</code> 이라는 3단계를 거칠까? 실제로
          동작하는 예제로 확인합니다.
        </p>
      </header>

      <nav className="tabs">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            className={t.id === tab ? 'tab is-on' : 'tab'}
            onClick={() => setTab(t.id)}
          >
            {t.title}
          </button>
        ))}
      </nav>

      <main>
        <Active />
      </main>

      <footer className="app-foot">
        Vite + React 19 · 모든 예제는 실제 DOM 이벤트로 동작합니다. 개발자 도구 콘솔이 아니라 화면의
        로그 패널에서 실행 순서를 확인하세요.
      </footer>
    </div>
  )
}
