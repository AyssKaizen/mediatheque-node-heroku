import React from "react";
import noImage from "../assets/noImage.png";
import { useMedias } from "../contexts/Medias";
import { useUser } from "../contexts/User";
import { useNavigate } from "react-router-dom";


const DetailsArticle = ({ item, showDetails }) => {
  // Hooks
  const { types, genres, deleteMediaByID } = useMedias();
  const navigate = useNavigate();
  const { profile } = useUser();

  // methods
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
  const toggleModal = () => {
    document.getElementById("modalMediaDeleted").classList.toggle("is-active")
  }

  const onCloseModal = () => {
    toggleModal()
    navigate("/")
  }
  const deleteMedia = async () => {
    await deleteMediaByID(item.me_id)
    onCloseModal()
  }
  const updateMedia = () => {
    navigate(`/update/${item.me_id}`)
  }

  return (
    <div style={{display: "flex", justifyContent: "center"}}>
      <div id="modalMediaDeleted" className="modal">
                        <div className="modal-background"></div>
                        <div style={{display: 'flex', justifyContent: 'center'}} className="modal-content">
                        <div style={{display: "flex", flexDirection:"column", width: "60%"}} className="box">
                            <p style={{textAlign: 'center'}}>Êtes vous sûr de vouloir supprimer {item.me_title}?</p>
                            <div className="is-flex is-justify-content-center	">
                              <button style={{alignSelf: 'center', margin: "10px"}} className="button is-small is-danger" onClick={deleteMedia}>oui</button>
                              <button style={{alignSelf: 'center', margin: "10px"}} className="button is-small is-primary" onClick={toggleModal}>non</button>
                            </div>
                        </div>
                        </div>
                        <button onClick={onCloseModal} className="modal-close is-large" aria-label="close"></button>
                    </div>
      <div
        style={{ width: "80%", backgroundColor: "#1A6E93"}}
        className="box"
        id={item.me_id}
      >
        <span style={{cursor: "pointer", color:"#75D9B6", fontWeight: "bold"}} onClick={callback}>{"< Retour"}</span>
        <h3 style={{textAlign: "center", color: "#FFF"}} className="title is-3">{item.me_title}</h3>
        <div style={{display: "flex", justifyContent:"space-around"}}>
            <div>
                <p style={{color: "#FFF"}} className="title is-5"> date de parution: {item.me_release_date}</p>
                <p style={{color: "#FFF"}} className="title is-5">Auteur: {item.me_author}</p>
                <p style={{color: "#FFF"}} className="title is-5">Genre: {displayGenre()}</p>
                <p style={{color: "#FFF"}} className="title is-5">type: {displayType()}</p>
                <p style={{color: "#FFF"}} className="title is-5">description:</p>
                <p style={{color: "#FFF", fontSize: 12, paddingLeft: 15}} className="title is-5">{item.me_description}</p>
            </div>
        <img width="30%" src={item.me_image.length > 0 ? item.me_image : noImage} alt={`article ${item.me_title}`} />
        </div>

        <div style={{display: 'flex', justifyContent: 'center'}}>
            {profile.us_admin ?
            <>
            <button onClick={toggleModal}
              className="button is-danger is-outlined"
              style={{ marginRight: 5 }}>
                Supprimer
            </button>
            <button onClick={updateMedia}
            className="button is-primary is-outlined"
            style={{ textAlign: "center", alignSelf: "flex-end" }}>
              Modifier
            </button>
            </>
            : <button
                onClick={reserveArticle}
                className="button is-primary is-outlined"
                style={{ textAlign: "center", borderColor:"#75D9B6" }}
            >
                Réserver
            </button>
            }
            </div>
      </div>
    </div>
  );
};
export default DetailsArticle;
