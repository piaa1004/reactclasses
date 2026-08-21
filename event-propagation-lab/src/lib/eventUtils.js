/**
 * 이벤트 전파 단계(eventPhase)의 숫자 값 ↔ 이름 매핑.
 *
 *   1 = Event.CAPTURING_PHASE
 *   2 = Event.AT_TARGET
 *   3 = Event.BUBBLING_PHASE
 */
export const PHASE_NAME = {
  1: 'CAPTURING',
  2: 'AT_TARGET',
  3: 'BUBBLING',
}

/** eventPhase 숫자를 사람이 읽는 이름으로. */
export function phaseName(eventPhase) {
  return PHASE_NAME[eventPhase] ?? 'NONE'
}

/** 로그 뱃지 색상용 클래스 이름. */
export function phaseTone(eventPhase) {
  if (eventPhase === 1) return 'cap'
  if (eventPhase === 2) return 'tgt'
  if (eventPhase === 3) return 'bub'
  return ''
}

/**
 * DOM 노드를 `tag#id.class` 형태의 짧은 셀렉터 문자열로 표현한다.
 * window / document 처럼 엘리먼트가 아닌 EventTarget 도 처리한다.
 */
export function describeNode(node) {
  if (node === window) return 'window'
  if (node === document) return 'document'
  if (!node || !node.tagName) return String(node)

  const tag = node.tagName.toLowerCase()
  const id = node.id ? `#${node.id}` : ''
  const cls = node.classList?.length ? `.${node.classList[0]}` : ''
  return `${tag}${id}${cls}`
}
