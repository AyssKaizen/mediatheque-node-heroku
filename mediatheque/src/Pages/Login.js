import React,{useState} from 'react'
import Logo from '../components/Logo';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import HelperText from '../components/HelperText';
import { useUser } from '../contexts/User';

const Login = () => {
    const navigate = useNavigate();
    const {profile, setProfile} = useUser()
    const [error,setError] = useState("")
    const { register, handleSubmit, formState: { isValid } } = useForm({mode: 'onChange'});

    const onSubmit = async (data,e) => {
        const {login, password} = data
        e.preventDefault()
        console.log({data})
        try {
            const res = await fetch("http://localhost:3001/auth",{
              method: "POST",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify({email: login, password: password})
            });
            
            const response = await res.json()
            if(res.status === 200){
                await setProfile(response)
                console.log("RESPONSE ===>",response)
                console.log(profile);
                navigate('catalog')
            } else setError(response)
        } catch (error) {
            console.error(error)
        }

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