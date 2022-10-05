import React from "react";
import noImage from "../assets/noImage.png";

const Article = ({ item }) => {
  const reserveArticle = () => {
    console.log(item.me_id);
    // apply context to add a rental
  };
  const displayContent = () => {
    document.getElementById(`infos${item.me_id}`).style.backgroundColor =
      "rgba(0, 0, 0, 0.7)";
    document.getElementById(`infos${item.me_id}`).style.display = "flex";
    document.getElementById(`infos${item.me_id}`).style.flexDirection =
      "column";
    document.getElementById(`infos${item.me_id}`).style.justifyContent =
      "space-around";
    document.getElementById(`infos${item.me_id}`).style.alignItems = "center";
  };
  const hideContent = () => {
    document.getElementById(`infos${item.me_id}`).style.display = "none";
  };
  return (
    <>
      <div
        id={`article${item.me_id}`}
        style={Styles.container(
          item.me_image.length > 0 ? item.me_image : noImage
        )}
        onMouseEnter={displayContent}
        onMouseLeave={hideContent}
      >
        <div
          id={`infos${item.me_id}`}
          style={{ height: "100%", width: "100%", display: "none", padding: 5 }}
        >
          <p
            id={`title${item.me_id}`}
            style={{ textAlign: "center", color: "white", fontWeight: "bold" }}
          >
            {item.me_title}
          </p>
          <button
        onClick={reserveArticle}
        className="button is-small is-primary"
        style={{ textAlign: "center", marginLeft: "25%", marginRight: "25%" }}
      >
        Réserver
      </button>
        </div>
      </div>
      <p
        id={`title${item.me_id}`}
        style={{ textAlign: "center", fontWeight: "semi-bold" }}
      >
        {item.me_title}
      </p>
    </>
  );
};
const Styles = {
  container: (image) => ({
    marginTop: "10px",
    width: "150px",
    height: "200px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundImage: `url(${image})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  }),
};
export default Article;
