import React, { useEffect, useState, useContext } from "react";
import { useFetch } from "./cutomHooks/useFetch";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const url = "https://www.thesportsdb.com/api/v1/json/2/all_leagues.php";

const LeagueContext = React.createContext();

function Home() {
  const { loading, data } = useFetch(url);
  const [favLeagues, setFavLeagues] = useState([]);
  const [toggleState, setToggleState] = useState(1);

  const addToFav = (leagueId) => {
    const league = data.leagues
      .filter((league) => league.idLeague === leagueId)
      .pop();
    const newFaveLeagues = [...favLeagues, league];
    setFavLeagues(newFaveLeagues);
    localStorage.setItem("myFavess", JSON.stringify(newFaveLeagues));
  };

  const getLocal = () => {
    if (localStorage.getItem("myFavess") !== null) {
      const data = JSON.parse(localStorage.getItem("myFavess"));
      setFavLeagues(data);
    }
  };
  useEffect(() => {
    getLocal();
  }, []);
  return (
    <LeagueContext.Provider value={{ addToFav, favLeagues }}>
      <nav>
        <div className="bloc-tabs">
          <button
            className={toggleState === 1 ? "tab active-tab" : "tab"}
            onClick={() => setToggleState(1)}
          >
            Leagues
          </button>
          <button
            className={toggleState === 2 ? "tab active-tab" : "tab"}
            onClick={() => setToggleState(2)}
          >
            My Favourites
          </button>
          <div
            className={toggleState === 1 ? "white-barLeft" : "white-barRight"}
          ></div>
        </div>
        <section>
          <div className={toggleState === 1 ? "leagues " : "not-active"}>
            {loading ? "Loading... " : <Leagues leagues={data.leagues} />}
          </div>
          <div className={toggleState === 2 ? "leagues " : "not-active"}>
            <Leagues leagues={favLeagues} />
          </div>
        </section>
      </nav>
    </LeagueContext.Provider>
  );
}

//single League card component
const Leagues = (prop) => {
  const { addToFav } = useContext(LeagueContext);

  return prop.leagues.map((league) => {
    return (
      <section key={league.idLeague} className="league">
        <Link to={`/leagueDetails/${league.idLeague}`} className="league-name">
          {league.strLeague}
        </Link>
        <button className="fav-icon" onClick={() => addToFav(league.idLeague)}>
          Favourite
        </button>
      </section>
    );
  });
};

export default Home;
