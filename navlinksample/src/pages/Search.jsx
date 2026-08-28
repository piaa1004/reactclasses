import {
  useSearchParams
} from "react-router-dom";

function Search() {
  const [
    searchParams,
    setSearchParams
  ] = useSearchParams(); // URL의 쿼리 파라미터 값을 제공할 수 있는 훅

  const keyword =
    searchParams.get("keyword") ?? "";

  const page =
    searchParams.get("page") ?? "1";

  const handleReactSearch = () => {
    setSearchParams({
      keyword: "react",
      page: "1"
    });
  };

  const handleRouterSearch = () => {
    setSearchParams({
      keyword: "router",
      page: "1"
    });
  };

  const nextPage = () => {
    setSearchParams({
      keyword,
      page: String(Number(page) + 1)
    });
  };

  return (
    <div>
      <h1>Search</h1>

      <p>
        keyword: {keyword}
      </p>

      <p>
        page: {page}
      </p>

      <button onClick={handleReactSearch}>
        React 검색
      </button>

      <button onClick={handleRouterSearch}>
        Router 검색
      </button>

      <button onClick={nextPage}>
        다음 페이지
      </button>
    </div>
  );
}

export default Search;