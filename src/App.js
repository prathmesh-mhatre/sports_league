import React, { useEffect, useState, useContext } from "react";
import { useFetch } from "./cutomHooks/useFetch";

const url = "https://www.thesportsdb.com/api/v1/json/2/all_leagues.php";

const LeagueContext = React.createContext();

function App() {
  const { loading, leagues } = useFetch(url);
  const [favLeagues, setFavLeagues] = useState([]);
  const [toggleState, setToggleState] = useState(1);

  const addToFav = (leagueId) => {
    const league = leagues
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
      <div className="container">
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
            Favourites
          </button>
        </div>
        <section>
          <div className={toggleState === 1 ? "leagues " : "not-active"}>
            <Leagues leagues={leagues} />
          </div>
          <div className={toggleState === 2 ? "leagues " : "not-active"}>
            <Leagues leagues={favLeagues} />
          </div>
        </section>
      </div>
    </LeagueContext.Provider>
  );
}

//single League card component
const Leagues = (prop) => {
  const { addToFav } = useContext(LeagueContext);

  return prop.leagues.map((league) => {
    return (
      <article className="league">
        <h4>{league.strLeague}</h4>
        <button className="fav-btn" onClick={() => addToFav(league.idLeague)}>
          Favourite
        </button>
      </article>
    );
  });
};

export default App;
