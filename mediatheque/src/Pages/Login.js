import React,{useState} from 'react'
import Logo from '../components/Logo';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import HelperText from '../components/HelperText';

const Login = () => {
    const user = {login: "moi@mail.com", pass: "123456"}
    const navigate = useNavigate();
    const [error,setError] = useState("")
    const { register, handleSubmit, formState: { isValid } } = useForm({mode: 'onChange'});
    const onSubmit = data => {
        console.log({data})
        if(data.login  === user.login && user.pass === data.password){
            navigate("catalog")
        } else setError("mot de passe ou mail incorrect")
    }
    return (
        <>
            <Logo/>
            <h1 style={styles.title} class="title"> Bienvenue à la médiathèque de la Chapelle-Curreaux </h1>
            <div style={styles.container}>
                <form onSubmit={handleSubmit(onSubmit)} style={styles.form} className="box">
                <h2 style={styles.subtitle} className="subtitle">Se connecter</h2>
                    <div className="field">
                        <label style={{color: "#1A6E93"}} className="label">Identifiant</label>
                        <div className="control">
                            <input {...register("login",{required: true})} className="input" type="email" placeholder="Votre email"/>
                        </div>
                    </div>

                    <div class="field">
                        <label style={{color: "#1A6E93"}} class="label">Mot de passe</label>
                        <div class="control">
                            <input {...register("password",{required: true})} class="input" type="password" placeholder="********"/>
                        </div>
                    </div>
                    <button disabled={!isValid} style={styles.button} class="button"> CONNEXION </button>
                    {error !== "" && <HelperText login={error}/>}
                </form>
            </div>
            <p style={styles.subtitle2} class="subtitle is-6">Pas encore de compte ? <Link to="Signin">S'inscrire</Link></p>
        </>
    )
}
const styles = {
    title:{
        textAlign: 'center',
        color: "#1A6E93"
    },
    form: {
        marginTop: "5%",
        width: "40%",
        display: "flex",
        flexDirection: "column",
        alignSelf: "center"
    },
    container: {
        display: "flex",
        justifyContent: "center"
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
    subtitle2: {
        textAlign: "center",
        color: "#1A6E93",
        marginTop: "15px"
    }
}
export default Login;