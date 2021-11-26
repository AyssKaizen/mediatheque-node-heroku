import React from "react";
import firebloodred from '../assets/firebloodred.jpeg';

const Article = ({item}) => {
    const reserveArticle = () => {
        console.log(item.id);
        // apply context to add a rental
    }
  return (
    <div style={{marginTop: "10px",width:"150px", display: "flex", flexDirection: "column", alignItems:"center"}} className="block" id={item.id}>
      <img width="120px" src={firebloodred} alt={`article ${item.title}`} />
      <p style={{textAlign: "center"}}>{item.title}</p>{" "}
      <button
        onClick={reserveArticle}
        className="button is-small is-primary"
        style={{textAlign: "center"}}
      >
        Réserver
      </button>{" "}
    </div>
  );
};
export default Article;
