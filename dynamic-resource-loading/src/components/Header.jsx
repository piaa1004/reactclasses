export default function Header({ locale, onChangeLocale }) {
  return (
    <header>
      <h2>My App</h2>

      <div className="language">
        <span>🌐</span>

        <select
          value={locale}
          onChange={(e) => onChangeLocale(e.target.value)}
        >
          <option value="ko">한국어</option>
          <option value="en">English</option>
        </select>
      </div>
    </header>
  );
}