/** 설명 박스. kind: info | warn | good */
export default function Note({ kind = 'info', title, children }) {
  return (
    <div className={`note note-${kind}`}>
      {title && <strong>{title}</strong>}
      <div>{children}</div>
    </div>
  )
}
