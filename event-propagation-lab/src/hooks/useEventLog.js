import { useCallback, useRef, useState } from 'react'

/**
 * 이벤트 리스너가 실행된 순서를 그대로 쌓아 두는 로그 훅.
 *
 * 리스너들은 하나의 dispatch 안에서 "동기적으로" 순서대로 실행되므로,
 * push 가 호출된 순서 = 실제 리스너 실행 순서가 된다.
 */
export function useEventLog(limit = 60) {
  const seq = useRef(0)
  const [entries, setEntries] = useState([])

  const push = useCallback(
    (entry) => {
      seq.current += 1
      const row = { id: seq.current, ...entry }
      setEntries((prev) => {
        const next = [...prev, row]
        return next.length > limit ? next.slice(next.length - limit) : next
      })
    },
    [limit],
  )

  const clear = useCallback(() => setEntries([]), [])

  return { entries, push, clear }
}
