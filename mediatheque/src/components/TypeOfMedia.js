import React, { useState, useEffect } from "react";
import Article from "./Article";
import { useMedias } from "../contexts/Medias";
import DetailsArticle from "./DetailsArticle";

const TypeOfMedia = () => {
  const { medias, types, genres } = useMedias();
  const [currentData, setCurrrentData] = useState();
  const [currentType, setCurrentType] = useState();
  const [currentGenre, setCurrentGenre] = useState();
  const [textInput, setTextInput] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [itemClicked,setItemClicked] = useState()

  console.log('currentData',currentData)

  useEffect(() => {
    setCurrrentData(filterType());
  }, [currentType]); // eslint-disable-line

  useEffect(() => {
    textInput === '' && setCurrrentData(medias)
  },[textInput])

  useEffect(() => {
    setCurrrentData(filterGenre());
  }, [currentGenre]); // eslint-disable-line

  const manageDatas = () => {
    const data = currentType === undefined & currentGenre === undefined ? medias : currentData
    console.log('data???',data);
    return data.map(item => 
    <div
      key={item.me_id} 
      onClick={()=> {setShowDetails(true); setItemClicked(item)}}>
        <Article item={item} />
    </div>);
  };
  const search = () => {
    setCurrrentData(
      medias.filter((item) =>
        item.me_title.toLowerCase().includes(textInput.toLowerCase())
      )
    );
    setCurrentType();
  };
  /*
    const unique = (list) => {
      let unique = [];
      list.forEach((item) => {
        if (unique.filter((it) => it.genre === item.genre).length === 0) {
          unique.push(item);
        }
      });
      return unique;
    };
  */
  const manageGenre = () => {
    return genres.map((item) => (
      <div
        id={`type${item.ge_id}`}
        key={`type${item.ge_id}`}
        onMouseEnter={() => {
          document.getElementById(`type${item.ge_id}`).style.backgroundColor =
            "white";
          document.getElementById(`type${item.ge_id}`).style.color = "black";
        }}
        onMouseLeave={() => {
          document
            .getElementById(`type${item.ge_id}`)
            .style.removeProperty("background-color");
          document.getElementById(`type${item.ge_id}`).style.color = "white";
        }}
        onClick={() => {setCurrentGenre(item.ge_id); setCurrentType()}}
      >
        {item.ge_name}
      </div>
    ));
  };
  const filterGenre = () => {
    return medias.filter((item) => item.me_genre === currentGenre);
  };

  const filterType = () => {
    return medias.filter((item) => item.me_type === currentType);
  };
  const manageTypes = () => {
    return types.map((item) => (
      <p key={item.ty_id} id={item.ty_id} onClick={() => setCurrentType(item.ty_id)} style={styles.type(currentType, item.ty_id)}>
        {item.ty_name}
      </p>
    ));
  };
  return (
    !showDetails ? <div className="block">
      <div
        className="block"
        style={styles.typeMedias}
      >
        {manageTypes()}
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
          {currentData && manageDatas()}
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
  type: (currentItem, item) => ({
    marginTop: "18px",
    cursor: "pointer",
    color: currentItem === item ? 'red' : 'black',
    textDecoration: currentItem === item ? 'underline' : 'none'
   }),
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
