import { useEffect, useRef, useState } from 'react'
import LogPanel from '../components/LogPanel.jsx'
import Note from '../components/Note.jsx'
import { useEventLog } from '../hooks/useEventLog.js'
import { describeNode } from '../lib/eventUtils.js'

/**
 * 2) Bubbling 의 실제 활용 — Event Delegation
 *
 * 왼쪽: li 마다 리스너를 하나씩 등록하는 방식
 * 오른쪽: 부모 ul 에 리스너 하나만 등록하는 위임 방식
 *
 * "항목 추가" 를 눌러 보면 두 방식의 차이가 분명해진다.
 */

const INITIAL = [
  { id: 'java', label: 'Java' },
  { id: 'js', label: 'JavaScript' },
  { id: 'react', label: 'React' },
]
const POOL = ['Spring Boot', 'Node.js', 'Vue', 'Svelte', 'Kotlin', 'TypeScript']

export default function DelegationLab() {
  const { entries, push, clear } = useEventLog(20)

  const [items, setItems] = useState(INITIAL)
  const [rebind, setRebind] = useState(false)
  const [directCount, setDirectCount] = useState(0)

  const directRef = useRef(null)
  const delegatedRef = useRef(null)

  // ── (A) 개별 등록 방식 ────────────────────────────────────────────────────
  // rebind 가 꺼져 있으면 "마운트 시점의 li 들"에만 리스너가 걸린다.
  // 나중에 추가된 li 는 아무 반응이 없다 — 이것이 개별 등록 방식의 고질적 문제다.
  const bindKey = rebind ? items.map((item) => item.id).join('|') : 'mount-only'

  useEffect(() => {
    const list = directRef.current
    if (!list) return

    const lis = [...list.querySelectorAll('li')]
    const cleanups = lis.map((li) => {
      const handler = () => {
        push({
          tone: 'bub',
          phase: '개별',
          label: `li 자신의 리스너 실행`,
          detail: `선택: ${li.textContent}`,
        })
      }
      li.addEventListener('click', handler)
      return () => li.removeEventListener('click', handler)
    })

    setDirectCount(lis.length)
    return () => cleanups.forEach((fn) => fn())
    // 의존성이 bindKey 라는 점이 이 데모의 핵심이다.
    // rebind 가 꺼져 있으면 bindKey 가 고정값이라 목록이 늘어나도 이 effect 는 다시 돌지 않는다.
  }, [bindKey, push])

  // ── (B) 위임 방식 ─────────────────────────────────────────────────────────
  // 부모에 리스너 딱 하나. 자식이 몇 개가 되든, 나중에 몇 개가 추가되든 그대로 동작한다.
  useEffect(() => {
    const list = delegatedRef.current
    if (!list) return

    const handler = (event) => {
      const li = event.target.closest('li')
      if (!li || !list.contains(li)) return

      push({
        tone: 'tgt',
        phase: '위임',
        label: `ul#menu 리스너 1개가 처리`,
        detail: `event.target=${describeNode(event.target)} · currentTarget=${describeNode(
          event.currentTarget,
        )} · 선택: ${li.textContent}`,
      })
    }

    list.addEventListener('click', handler)
    return () => list.removeEventListener('click', handler)
  }, [push])

  const addItem = () => {
    setItems((prev) => {
      const n = prev.length - INITIAL.length
      return [...prev, { id: `added-${n}`, label: POOL[n % POOL.length] }]
    })
  }

  const reset = () => {
    setItems(INITIAL)
    clear()
  }

  return (
    <section className="lab">
      <header className="lab-head">
        <h2>2. Bubbling 활용 — Event Delegation</h2>
        <p>
          같은 목록을 두 가지 방식으로 만들었습니다. <b>항목 추가</b>를 누른 뒤 새로 생긴 항목을
          각각 클릭해 보세요.
        </p>
      </header>

      <div className="controls">
        <button type="button" onClick={addItem}>
          항목 추가
        </button>
        <button type="button" className="ghost" onClick={reset}>
          초기화
        </button>
        <label className="inline">
          <input type="checkbox" checked={rebind} onChange={(e) => setRebind(e.target.checked)} />
          개별 등록 방식에서 항목이 바뀔 때마다 리스너 전부 재등록
        </label>
      </div>

      <div className="split">
        <div className="panel">
          <h3>
            ① 개별 등록 <span className="pill warn">리스너 {directCount}개</span>
          </h3>
          <pre className="snippet">{`items.forEach((li) => {
  li.addEventListener('click', handler)
})`}</pre>
          <ul className="menu" ref={directRef}>
            {items.map((item, i) => (
              <li key={item.id} className={!rebind && i >= INITIAL.length ? 'is-dead' : ''}>
                {item.label}
              </li>
            ))}
          </ul>
          {!rebind && items.length > INITIAL.length && (
            <Note kind="warn" title="회색 항목은 클릭해도 무반응">
              마운트 이후에 추가된 <code>li</code> 에는 리스너가 없습니다. 반응하게 하려면 목록이
              바뀔 때마다 리스너를 전부 해제하고 다시 등록해야 합니다.
            </Note>
          )}
        </div>

        <div className="panel">
          <h3>
            ② 이벤트 위임 <span className="pill good">리스너 1개</span>
          </h3>
          <pre className="snippet">{`menu.addEventListener('click', (event) => {
  const li = event.target.closest('li')
  if (!li) return
  console.log('선택:', li.textContent)
})`}</pre>
          <ul className="menu" id="menu" ref={delegatedRef}>
            {items.map((item) => (
              <li key={item.id}>{item.label}</li>
            ))}
          </ul>
          <Note kind="good" title="항목이 100개가 되어도 리스너는 1개">
            자식에서 시작된 클릭이 <b>Bubbling</b> 으로 부모까지 올라오고, 부모는{' '}
            <code>event.target</code> 으로 어떤 자식이 클릭됐는지 알아냅니다. 나중에 추가된 자식도
            같은 경로를 타므로 추가 작업이 필요 없습니다.
          </Note>
        </div>
      </div>

      <LogPanel entries={entries} onClear={clear} title="클릭 결과" />
    </section>
  )
}
