import { useState, useEffect } from "react";
import axios from "axios";

function ArticleAPI() {
  const [articles, setArticles] = useState([]);
  const [callback, setCallback] = useState(false);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(0);

  useEffect(() => {
    const getArticles = async () => {
      const res = await axios.get( `/api/articles?limit=${ page * 9 }&${category}&${sort}&title[regex]=${search}`); 
      setArticles(res.data.articles);
      setResult(res.data.result);
    };
    getArticles();
  }, [callback, category, sort, search, page]);

  return {
    articles: [articles, setArticles],
    callback: [callback, setCallback],
    category: [category, setCategory],
    sort: [sort, setSort],
    search: [search, setSearch],
    page: [page, setPage],
    result: [result, setResult],
  };
}

export default ArticleAPI;
