import React from "react";
import firebloodred from "../assets/firebloodred.jpeg";

const DetailsArticle = ({ item, showDetails }) => {
  const reserveArticle = () => {
    console.log(item);
    // apply context to add a rental
  };
  const callback = () => {
    showDetails(false)
  }
  return (
    <div style={{display: "flex", justifyContent: "center"}}>
      <div
        style={{ width: "80%", backgroundColor: "#1A6E93"}}
        className="box"
        id={item.id}
      >
        <span style={{cursor: "pointer", color:"#75D9B6", fontWeight: "bold"}} onClick={callback}>{"< Retour"}</span>
        <h3 style={{textAlign: "center", color: "#FFF"}} className="title is-3">{item.title}</h3>
        <div style={{display: "flex", justifyContent:"space-around"}}>
            <div style={{color: "#FFF"}}>
                <p style={{color: "#FFF"}} className="title is-5"> date de parution: {item.release_date}</p>
                <p style={{color: "#FFF"}} className="title is-5">Auteur: {item.author}</p>
                <p style={{color: "#FFF"}} className="title is-5">Genre: {item.genre}</p>
            </div>
            <button
                onClick={reserveArticle}
                className="button is-primary is-outlined"
                style={{ textAlign: "center", borderColor:"#75D9B6", alignSelf: "flex-end" }}
            >
                Réserver
            </button>
        <img width="30%" src={firebloodred} alt={`article ${item.title}`} />
        </div>
      </div>
    </div>
  );
};
export default DetailsArticle;
