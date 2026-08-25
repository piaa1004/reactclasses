import { useEffect, useState } from "react";
import Header from "./components/Header";
import { loadMessages } from "./i18n";

/*export default*/function App() {
  // 기본 언어는 한국어
  const [locale, setLocale] = useState("ko");

  // 기본 언어의 번역 리소스
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    loadMessages(locale).then(setMessages);
  }, [locale]);

  async function handleChangeLocale(locale) {
    setLocale(locale);
  }

  if (!messages) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Header
        locale={locale}
        onChangeLocale={handleChangeLocale}
      />

      <main>
        <h1>{messages.title}</h1>

        <h2>{messages.welcome}</h2>

        <p>{messages.description}</p>
      </main>
    </>
  );
}

export default App
