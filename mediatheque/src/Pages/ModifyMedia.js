import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../contexts/User";
import { useMedias } from "../contexts/Medias";
import { useForm } from "react-hook-form";
import HelperText from "../components/HelperText";
import UploadAndDisplayImage from "../components/UploadAndDisplayImage";
import envVar from "../envVar";

const ModifyMedia = () => {
    const { profile } = useUser();
    const { types, genres, getMediaByID, updateMediaByID } = useMedias();
    const navigate = useNavigate();
    const { item } = useParams();
    const [media, setMedia] = useState()
    const [urlImage, setUrlImage] = useState()
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({mode: 'onChange'});

    useEffect(() => {
        !profile && navigate("/");
        profile && !profile.us_admin && navigate("/");
    }, []); // eslint-disable-line

    const func = (url) => {
        setUrlImage(url);
    }

    useEffect(() => {
        getMedia();
    },[])

    const getMedia = async () => {
        const media = await getMediaByID(parseInt(item))
        setMedia(media);
        console.log(media)
    }

    const toggleModal = () => {
        document.getElementById("modalMediaAdded").classList.toggle("is-active")
    }

    const onCloseModal = () => {
        toggleModal()
        navigate("/")
    }

    const onSubmit = async (data,e) => {
        e.preventDefault()
        let {genre, type, ...rest} = data
        genre = parseInt(genre)
        type = parseInt(type)
        const payload = { genre, type, image: urlImage ? urlImage : media?.me_image, ...rest }
        try {
            const res = await updateMediaByID(item, payload)
            toggleModal()
        } catch (err) {
            console.error(err.message)
        }

        // return axios.post(`${envVar.apiUrl}/medias/add`, payload)
        //     .then(res => res.data)
        //     .catch(err => console.log(err)
    }

    return (
        <>
            {profile && media && (
                <>
                    <div id="modalMediaAdded" className="modal">
                        <div className="modal-background"></div>
                        <div style={{display: 'flex', justifyContent: 'center'}} className="modal-content">
                        <div style={{display: "flex", flexDirection:"column", width: "60%"}} className="box">
                            <p style={{textAlign: 'center'}}>Le média a été mis à jour avec succès</p>
                            <button style={{alignSelf: 'center', margin: "10px"}} className="button is-small is-primary" onClick={onCloseModal}>cool !</button>
                        </div>
                        </div>
                        <button onClick={onCloseModal} className="modal-close is-large" aria-label="close"></button>
                    </div>

                    <Nav profile={profile} isAdding={true} />
                    <div style={styles.container}>
                        <form
                            id="AddMediaForm"
                            style={styles.form}
                            className="box"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <h2 style={styles.subtitle} className="title">
                                Modification d'un media
                            </h2>
                            <div style={styles.rowField} className="field is-horizontal">
                                <div style={styles.field} className="field">
                                    <label style={{ color: "#1A6E93" }} className="label">
                                        Titre
                                    </label>
                                    <div className="control">
                                        <input
                                            {...register("title", { required: true })}
                                            style={styles.textColorInput}
                                            className="input"
                                            type="text"
                                            defaultValue={media.me_title}
                                        />
                                    </div>
                                    {errors.title && <HelperText />}
                                </div>

                                <div style={styles.field} className="field">
                                    <label style={{ color: "#1A6E93" }} className="label">
                                        Auteur
                                    </label>
                                    <div className="control">
                                        <input
                                            {...register("author", { required: true })}
                                            style={styles.textColorInput}
                                            className="input"
                                            type="text"
                                            defaultValue={media.me_author}
                                        />
                                    </div>
                                    {errors.author && <HelperText />}
                                </div>
                            </div>
                            <div style={styles.rowField} className="field is-horizontal">
                            <div style={styles.field} className="field">
                                    <label style={{ color: "#1A6E93" }} className="label">
                                        Date de parution
                                    </label>
                                    <div className="control">
                                        <input
                                            {...register("releaseDate", { required: true })}
                                            style={styles.textColorInput}
                                            className="input"
                                            type="date"
                                            defaultValue={media.me_release_date}
                                        />
                                    </div>
                                    {errors.releaseDate && <HelperText />}
                                </div>
                                <div style={styles.field} className="field">
                                    <label style={{ color: "#1A6E93" }} className="label">
                                        Image
                                    </label>
                                        <UploadAndDisplayImage setImage={func} image={media.me_image} />
                                </div>
                            </div>

                            <div
                                style={{ alignSelf: "center", width: "67%" }}
                                className="field"
                            >
                                <label style={{ color: "#1A6E93" }} className="label">
                                    Description
                                </label>
                                <div className="control">
                                    <textarea
                                    {...register("description", { required: true })}
                                        style={styles.textColorInput}
                                        className="textarea"
                                        defaultValue={media.me_description}
                                    />
                                </div>
                            </div>
                            <div style={styles.rowField} className="field is-horizontal">
                                <div style={styles.field} className="field">
                                    <label style={{ color: "#1A6E93" }} className="label">
                                        type de media
                                    </label>
                                    <div className="select is-normal control">
                                        <select {...register("type", { required: true })}  >
                                            {types.map(type => <option key={type.ty_id} value={type.ty_id} selected={type.ty_id === media.me_type ? true : false}>{type.ty_name}</option>) || []}
                                        </select>
                                    </div>
                                    {errors.type && <HelperText />}
                                </div>

                                <div style={styles.field} className="field">
                                    <label style={{ color: "#1A6E93" }} className="label">
                                        genre
                                    </label>
                                    <div className="select is-normal control">
                                        <select {...register("genre", { required: true })} >
                                        {genres.map(genre => <option key={genre.ge_id} value={genre.ge_id} selected={genre.ge_id === media.me_genre ? true : false}>{genre.ge_name}</option>) || []}
                                        </select>
                                    </div>
                                    {errors.genre && <HelperText />}
                                </div>
                            </div>
                            <button
                                disabled={!isValid}
                                style={styles.button}
                                className="button"
                            >
                                MODIFIER
                            </button>
                        </form>
                    </div>
                </>
            )}
        </>
    );
};

const styles = {
    title: {
        textAlign: "center",
        color: "#1A6E93",
    },
    form: {
        width: "70%",
        display: "flex",
        flexDirection: "column",
        alignSelf: "center"
    },
    container: {
        display: "flex",
        justifyContent: "center",
        marginBottom: "40px"
    },
    subtitle: {
        alignSelf: "center",
        color: "#1A6E93"
    },
    button: {
        alignSelf: "center",
        backgroundColor: "#75D9B6",
        color: "#FFF"
    },
    rowField: {
        alignSelf: "center",
        justifyContent: "space-around",
        width: "70%"
    },
    field: {
        minWidth: "45%",
    },
    textColorInput: {
        color: "#75D9B6",
        fontWeight: "bold"
    }
};
export default ModifyMedia;
