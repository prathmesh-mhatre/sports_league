import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [leagues, setLeagues] = useState([]);

  const getLeagues = async () => {
    const response = await fetch(url);
    const leagues = await response.json();
    setLeagues(leagues.leagues);
    setLoading(false);
  };

  useEffect(() => {
    getLeagues();
  }, [url]);

  return { loading, leagues };
};
