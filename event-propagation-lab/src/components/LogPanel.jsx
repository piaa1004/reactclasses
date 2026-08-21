import { useEffect, useRef } from 'react'

/**
 * 리스너 실행 순서를 보여 주는 공용 로그 패널.
 * activeIndex 를 주면 해당 줄만 강조하고, 보이도록 스크롤한다(재생 애니메이션용).
 */
export default function LogPanel({
  title = '실행 순서',
  entries,
  onClear,
  activeIndex = -1,
  scrollable = true,
  emptyText = '아직 이벤트가 없습니다. 위에서 클릭해 보세요.',
}) {
  const activeRef = useRef(null)

  useEffect(() => {
    if (activeIndex < 0) return
    activeRef.current?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex])

  return (
    <div className="log">
      <div className="log-head">
        <h4>{title}</h4>
        <button type="button" className="ghost" onClick={onClear}>
          로그 지우기
        </button>
      </div>

      {entries.length === 0 ? (
        <p className="empty">{emptyText}</p>
      ) : (
        <ol className={scrollable ? 'log-list' : 'log-list is-full'}>
          {entries.map((entry, index) => (
            <li
              key={entry.id}
              ref={index === activeIndex ? activeRef : null}
              className={[
                'log-row',
                entry.tone ? `tone-${entry.tone}` : '',
                index === activeIndex ? 'is-active' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <span className="step">{index + 1}</span>
              {entry.phase && <span className={`badge ${entry.tone}`}>{entry.phase}</span>}
              <span className="where">{entry.label}</span>
              {entry.detail && <span className="detail">{entry.detail}</span>}
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
