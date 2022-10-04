import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/User";
import { useMedias } from "../contexts/Medias";
import { useForm } from "react-hook-form";
import HelperText from "../components/HelperText";
import UploadAndDisplayImage from "../components/UploadAndDisplayImage";
import envVar from "../envVar";

const AddMedia = () => {
    const { profile } = useUser();
    const { types, genres } = useMedias();
    const navigate = useNavigate();
    const [urlImage, setUrlImage] = useState('')
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({mode: 'onChange'});


    useEffect(() => {
        !profile && navigate("/");
    }, []); // eslint-disable-line

    const func = (url) => {
        setUrlImage(url);
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
        const payload = { genre, type, image: urlImage, ...rest }
        console.log(payload)

        try {
            const res = await fetch(`${envVar.apiUrl}/medias/add`,{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(payload)
            });
            document.getElementById("AddMediaForm").reset()
            toggleModal()
            console.log(res);

            
        } catch (err) {
            console.error(err.message)
        }

        // return axios.post(`${envVar.apiUrl}/medias/add`, payload)
        //     .then(res => res.data)
        //     .catch(err => console.log(err))
    }

    return (
        <>
            {profile && (
                <>
                    <div id="modalMediaAdded" className="modal">
                        <div className="modal-background"></div>
                        <div style={{display: 'flex', justifyContent: 'center'}} className="modal-content">
                        <div style={{display: "flex", flexDirection:"column", width: "60%"}} className="box">
                            <p style={{textAlign: 'center'}}>Le média a été ajouté avec succès</p>
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
                                Ajout d'un media
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
                                            placeholder="Antigone"
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
                                            placeholder="George RR. Martin"
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
                                        />
                                    </div>
                                    {errors.releaseDate && <HelperText />}
                                </div>
                                <div style={styles.field} className="field">
                                    <label style={{ color: "#1A6E93" }} className="label">
                                        Image
                                    </label>
                                        <UploadAndDisplayImage setImage={func}/>
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
                                            {types.map(type => <option key={type.ty_id} value={type.ty_id}>{type.ty_name}</option>) || []}
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
                                        {genres.map(genre => <option key={genre.ge_id} value={genre.ge_id}>{genre.ge_name}</option>) || []}
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
                                AJOUTER
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
export default AddMedia;
