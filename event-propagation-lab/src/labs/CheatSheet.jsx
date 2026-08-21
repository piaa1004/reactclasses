import Note from '../components/Note.jsx'

/** 6) 정리 — 표와 한 줄 요약 */
export default function CheatSheet() {
  return (
    <section className="lab">
      <header className="lab-head">
        <h2>6. 정리</h2>
      </header>

      <div className="split">
        <div className="panel">
          <h3>세 단계의 역할</h3>
          <table className="sheet">
            <thead>
              <tr>
                <th>단계</th>
                <th>eventPhase</th>
                <th>목적</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span className="badge cap">CAPTURING</span>
                </td>
                <td>1</td>
                <td>부모가 Target 보다 먼저 이벤트를 관찰할 기회</td>
              </tr>
              <tr>
                <td>
                  <span className="badge tgt">AT_TARGET</span>
                </td>
                <td>2</td>
                <td>실제 이벤트가 발생한 엘리먼트에서 처리</td>
              </tr>
              <tr>
                <td>
                  <span className="badge bub">BUBBLING</span>
                </td>
                <td>3</td>
                <td>Target 에서 발생한 이벤트를 부모들이 처리할 기회</td>
              </tr>
            </tbody>
          </table>

          <h3>target vs currentTarget</h3>
          <table className="sheet">
            <tbody>
              <tr>
                <td>
                  <code>event.target</code>
                </td>
                <td>이벤트가 처음 발생한 엘리먼트. 전파 내내 바뀌지 않는다.</td>
              </tr>
              <tr>
                <td>
                  <code>event.currentTarget</code>
                </td>
                <td>지금 실행 중인 리스너가 등록된 엘리먼트. 단계마다 바뀐다.</td>
              </tr>
            </tbody>
          </table>

          <h3>전파 중단</h3>
          <table className="sheet">
            <tbody>
              <tr>
                <td>
                  <code>stopPropagation()</code>
                </td>
                <td>이후 경로의 리스너 중단. 같은 엘리먼트의 다른 리스너는 실행됨.</td>
              </tr>
              <tr>
                <td>
                  <code>stopImmediatePropagation()</code>
                </td>
                <td>이후 경로 + 같은 엘리먼트의 나머지 리스너까지 중단.</td>
              </tr>
              <tr>
                <td>
                  <code>preventDefault()</code>
                </td>
                <td>전파와 무관. 브라우저 기본 동작(링크 이동, 폼 전송)만 취소.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="panel">
          <h3>왜 이런 구조인가</h3>
          <pre className="flow">{`DOM 은 목록이 아니라 Tree 다
        │
        ▼
   이벤트 발생
        │
        ▼
   Capturing  (부모 → Target)
        │
        ▼
     Target
        │
        ▼
   Bubbling   (Target → 부모)
        │
        ▼
부모에서도 자식 이벤트 처리 가능
        │
        ▼
   Event Delegation
        │
        ▼
  효율적인 UI 이벤트 관리`}</pre>

          <Note kind="good" title="한 줄 요약">
            Capturing → Target → Bubbling 은 DOM 의 부모-자식 Tree 구조에서 하나의 이벤트를 여러
            엘리먼트가 체계적으로 관찰하고 처리할 수 있도록 만든 브라우저의 이벤트 전파 모델입니다.
          </Note>

          <Note kind="info" title="자주 틀리는 지점">
            <ul>
              <li>Target 엘리먼트에 등록한 리스너는 capture/bubble 구분 없이 등록 순서로 실행된다.</li>
              <li>
                <code>focus</code>, <code>blur</code> 는 버블링하지 않는다. 위임하려면{' '}
                <code>focusin</code>, <code>focusout</code> 을 쓰거나 capture 로 등록한다.
              </li>
              <li>
                <code>removeEventListener</code> 는 등록할 때와 <b>같은 capture 플래그</b>여야 해제된다.
              </li>
              <li>
                React 의 <code>onClick</code> 은 그 노드가 아니라 루트 컨테이너에 붙어 있다.
                네이티브 리스너와 섞어 쓰면 순서가 직관과 다르다.
              </li>
            </ul>
          </Note>
        </div>
      </div>
    </section>
  )
}
