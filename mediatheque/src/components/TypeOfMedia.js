import React, { useState, useEffect } from "react";
import Article from "./Article";
import { useMedias } from "../contexts/Medias";
import DetailsArticle from "./DetailsArticle";

const TypeOfMedia = () => {
  const { medias, typemedias } = useMedias();
  const [currentData, setCurrrentData] = useState([]);
  const [currentType, setCurrentType] = useState();
  const [currentGenre, setCurrentGenre] = useState();
  const [textInput, setTextInput] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [itemClicked,setItemClicked] = useState()
  const [dataFromServ, setDataFromServ] = React.useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setDataFromServ(data.message));
  }, []);

  useEffect(() => {
    setCurrrentData(filterType());
    console.log({ currentType });
  }, [currentType]);

  useEffect(() => {
    setCurrrentData(filterGenre());
    console.log({ currentGenre });
  }, [currentGenre]);

  const manageDatas = () => {
    return currentData.map((item) => <div onClick={()=> {setShowDetails(true); setItemClicked(item)}}><Article item={item} /></div>);
  };
  const search = () => {
    setCurrrentData(
      medias.filter((item) =>
        item.title.toLowerCase().includes(textInput.toLowerCase())
      )
    );
  };
  const unique = (list) => {
    let unique = [];
    list.forEach((item) => {
      if (unique.filter((it) => it.genre === item.genre).length == 0) {
        unique.push(item);
      }
    });
    return unique;
  };
  const manageGenre = () => {
    const unik = unique(currentData);
    return unik.map((item) => (
      <div
        id={`type${item.id}`}
        key={`type${item.id}`}
        onMouseEnter={() => {
          document.getElementById(`type${item.id}`).style.backgroundColor =
            "white";
          document.getElementById(`type${item.id}`).style.color = "black";
        }}
        onMouseLeave={() => {
          document
            .getElementById(`type${item.id}`)
            .style.removeProperty("background-color");
          document.getElementById(`type${item.id}`).style.color = "white";
        }}
        onClick={() => {setCurrentGenre(item.genre); setCurrentType()}}
      >
        {item.genre}
      </div>
    ));
  };
  const filterGenre = () => {
    return medias.filter((item) => item.genre === currentGenre);
  };

  const filterType = () => {
    return medias.filter((item) => item.type_media === currentType);
  };
  const manageTypes = (medias) => {
    return medias.map((item) => (
      <p id={item} onClick={() => setCurrentType(item)} style={styles.type}>
        {item}
      </p>
    ));
  };
  return (
    !showDetails ? <div className="block">
      <div
        className="block"
        style={styles.typeMedias}
      >
        {manageTypes(typemedias)}
        <div style={{ padding: "5px" }} className="field">
          <label style={{ margin: 0 }} className="label is-small">
            Rechercher
          </label>
          <div style={{ display: "flex" }}>
            <input
              onChange={(e) => setTextInput(e.target.value)}
              className="input is-small "
              type="text"
            />
            <button onClick={search} className="button is-small is-primary">
              ok
            </button>
          </div>
        </div>
      </div>
      <div
        style={{
          width: "92%",
          height: "100%",
          marginLeft: "4%",
          display: "flex",
        }}
      >
        <div style={styles.articlesSection}>
          {manageDatas()}
          <p>{!dataFromServ ? "..loading": dataFromServ}</p>
        </div>
        <div
          style={{ width: "19%", backgroundColor: "#1A6E93", padding: "5px" }}
        >
          <p style={{ color: "white", fontWeight: "bold" }}>Genre</p>
          <div style={{ color: "white", width: "100%", cursor: "pointer" }}>
            {manageGenre()}
          </div>
        </div>
      </div>
    </div> 
    : 
    <DetailsArticle item={itemClicked} showDetails={setShowDetails}/>
  );
};
const styles = {
  isActive: {
    textDecorationLine: "underline",
  },
  type: {
    marginTop: "18px",
    cursor: "pointer",
  },
  typeMedias:{
    borderStyle: "solid",
    borderWidth: "1px",
    display: "flex",
    justifyContent: "space-around",
    marginLeft: "4%",
    marginRight: "4%",
    flexFlow: "wrap"
  },
  articlesSection:{
    display: "flex", 
    width: "75%", 
    backgroundColor: "white", 
    flexFlow:"wrap"
  }
};
export default TypeOfMedia;
