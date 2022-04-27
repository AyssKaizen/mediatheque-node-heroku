import React, { useEffect } from "react";
import Nav from "../components/Nav";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/User";
import { useForm } from "react-hook-form";
import HelperText from "../components/HelperText";

const AddMedia = () => {
    const { profile } = useUser();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({mode: 'onChange'});
    

    useEffect(() => {
        !profile && navigate("/");
    }, []); // eslint-disable-line

    return (
        <>
            {profile && (
                <>
                    <Nav profile={profile} isAdding={true} />
                    <div style={styles.container}>
                        <form
                            id="signInForm"
                            style={styles.form}
                            className="box"
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
                                            {...register("birthday", { required: true })}
                                            style={styles.textColorInput}
                                            className="input"
                                            type="date"
                                        />
                                    </div>
                                    {errors.birthday && <HelperText />}
                                </div>
                                <div style={styles.field} className="field">
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
                                        {...register("description", { required: false })}
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
                                            <option value={1}>Livre </option>
                                            <option value={2}>Album</option>
                                            <option value={3}>Documentaire</option>
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
                                            <option value={1}>drame</option>
                                            <option value={2}>policier</option>
                                            <option value={3}>aventure</option>
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
