import React from "react";
import noImage from "../assets/noImage.png";
import { useMedias } from "../contexts/Medias";


const DetailsArticle = ({ item, showDetails }) => {
  const { types, genres } = useMedias();

  const displayGenre = () => {
    const  genre = genres.filter((it) => it.ge_id === item.me_genre).shift()
    return genre.ge_name
  }
  const displayType = () => {
    const  type = types.filter((it) => it.ty_id === item.me_type).shift()
    return type.ty_name
  }
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
        id={item.me_id}
      >
        <span style={{cursor: "pointer", color:"#75D9B6", fontWeight: "bold"}} onClick={callback}>{"< Retour"}</span>
        <h3 style={{textAlign: "center", color: "#FFF"}} className="title is-3">{item.me_title}</h3>
        <div style={{display: "flex", justifyContent:"space-around"}}>
            <div style={{color: "#FFF"}}>
                <p style={{color: "#FFF"}} className="title is-5"> date de parution: {item.me_release_date}</p>
                <p style={{color: "#FFF"}} className="title is-5">Auteur: {item.me_author}</p>
                <p style={{color: "#FFF"}} className="title is-5">Genre: {displayGenre()}</p>
                <p style={{color: "#FFF"}} className="title is-5">type: {displayType()}</p>
                <p style={{color: "#FFF"}} className="title is-5">description:</p>
                <p style={{color: "#FFF", fontSize: 12, paddingLeft: 15}} className="title is-5">{item.me_description}</p>
            </div>
            <button
                onClick={reserveArticle}
                className="button is-primary is-outlined"
                style={{ textAlign: "center", borderColor:"#75D9B6", alignSelf: "flex-end" }}
            >
                Réserver
            </button>
        <img width="30%" src={item.me_image.length > 0 ? item.me_image : noImage} alt={`article ${item.me_title}`} />
        </div>
      </div>
    </div>
  );
};
export default DetailsArticle;
