import React from "react";
import { useParams, Link } from "react-router-dom";
import { useFetch } from "./cutomHooks/useFetch";
import { dataJson } from "./Data/dataJson";

function Details() {
  const { id } = useParams();
  const url = `https://www.thesportsdb.com/api/v1/json/2/search_all_seasons.php?id=${id}`;
  const { loading, data } = useFetch(url);

  return (
    <>
      <div>
        <Link to="/" className="back">
          Back
        </Link>
        <header className="container">
          <img
            src="https://i.pinimg.com/564x/b1/2a/3c/b12a3cbd920cf83294f941a1c48edbe1.jpg"
            alt="IPL Trophy"
          />
          <section className="details">
            <h2>Details</h2>
            <div className="information">
              <p>{dataJson[0].strDetails}</p>
            </div>
          </section>
        </header>
        <h2 className="container">Past Events</h2>
        <section className="past-events">
          {dataJson[1].map((event) => (
            <Event
              eventDate={event.eventDate}
              eventStr={event.eventStr}
              imgUrl={event.imgUrl}
            />
          ))}
        </section>
        <h2 className="container">All Season Timeline</h2>
        <section className="all-season-timeline all-seasons">
          {loading ? "Loading..." : <Seasons irr={data} />}
        </section>
      </div>
    </>
  );
}

const Event = ({ eventDate, eventStr, imgUrl }) => {
  return (
    <>
      <div className="event-card">
        <img src={imgUrl} alt="" className="event-img" />
        <div className="event-info">
          <h3>{eventDate}</h3>
          <h2>{eventStr}</h2>
        </div>
      </div>
    </>
  );
};

const Seasons = (props) => {
  const arr = props.irr.seasons;
  return (
    <>
      {arr.map((season) => (
        <div className="season-card">
          <h4>{season.strSeason}</h4>
        </div>
      ))}
    </>
  );
};

export default Details;
