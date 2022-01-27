import React,{useState, useEffect} from 'react'
import Logo from '../components/Logo';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import HelperText from '../components/HelperText';
import { useUser } from '../contexts/User';
import envVar from '../envVar';

const Login = () => {
    const navigate = useNavigate();
    const {checkConnexion, logIn} = useUser()
    const [error,setError] = useState("")
    const [connected, setConnected] = useState(false)
    const { register, handleSubmit, formState: { isValid } } = useForm({mode: 'onChange'});

    useEffect(() => {
        !connected && checkConnected()
        connected && navigate('catalog')
        console.log('user connected:', connected);
    },[connected])

    const checkConnected = async () => {
        try {
            const user = await checkConnexion()
            user ? setConnected(true) : setConnected(false)       
        } catch (error) {
            console.error(error.message); 
        }
    }

    const onSubmit = async (data,e) => {
        const {login, password} = data
        e.preventDefault()
        try {
            const res = await logIn(login, password)
            typeof res == 'string' ? setError(res) : setConnected(true)
        } catch (error) {
            console.error(error)
        }

    }
    return (
        <>
            <Logo/>
            <h1 style={styles.title} className="title"> Bienvenue à la médiathèque de la Chapelle-Curreaux </h1>
            <div style={styles.container}>
                <form onSubmit={handleSubmit(onSubmit)} style={styles.form} className="box">
                <h2 style={styles.subtitle} className="subtitle">Se connecter</h2>
                    <div className="field">
                        <label style={{color: "#1A6E93"}} className="label">Identifiant</label>
                        <div className="control">
                            <input {...register("login",{required: true})} className="input" type="email" placeholder="Votre email"/>
                        </div>
                    </div>

                    <div className="field">
                        <label style={{color: "#1A6E93"}} className="label">Mot de passe</label>
                        <div className="control">
                            <input {...register("password",{required: true})} className="input" type="password" placeholder="********"/>
                        </div>
                    </div>
                    <button disabled={!isValid} style={styles.button} className="button"> CONNEXION </button>
                    {error !== "" && <HelperText login={error}/>}
                </form>
            </div>
            <p style={styles.subtitle2} className="subtitle is-6">Pas encore de compte ? <Link to="Signin">S'inscrire</Link></p>
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