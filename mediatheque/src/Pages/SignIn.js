import React,{useState} from "react";
import Logo from "../components/Logo";
import { useForm } from "react-hook-form";
import HelperText from "../components/HelperText";
import {useNavigate} from "react-router-dom"

const SignIn = () => {
    const navigate = useNavigate();
    const [passIsValid, setPassIsValid] = useState()
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({mode: 'onChange'});
    const regexmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const regexPostCode = /^(?:[0-8]\d|9[0-8])\d{3}$/;

    const managePassword = data => {
        if(data.password === data.confirmPass){
            setPassIsValid(true)
            return true
        }
        else{
            setPassIsValid(false)
            return false
        }
    }

    const onSubmit = data => {
        console.log({data})
        if(isValid && managePassword(data))
            navigate("/uservalidation")
    }
    
  return (
    <>
      <Logo />
      <h1 style={styles.title} className="title">
        S’inscrire à la médiathèque
      </h1>
      <div style={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)} style={styles.form} className="box">
          <h2 style={styles.subtitle} className="subtitle">
          Veuillez renseigner les champs suivants:
          </h2>
          <div  style={styles.rowField} className="field is-horizontal">
            <div style={styles.field} className="field">
                <label style={{ color: "#1A6E93" }} className="label">
                Nom
                </label>
                <div className="control">
                <input
                    {...register("lastName",{required: true})}
                    style={styles.textColorInput}
                    className="input"
                    type="text"
                    placeholder="Sparrow"
                />
                </div>
                {errors.lastName && <HelperText/>}
            </div>

            <div style={styles.field}  className="field">
                <label style={{ color: "#1A6E93" }} className="label">
                Prénom
                </label>
                <div className="control">
                <input {...register("firstName",{required: true})} style={styles.textColorInput} className="input" type="text" placeholder="Jack"  />
                </div>
                {errors.firstName && <HelperText/>}
            </div>
          </div>
          <div  style={styles.rowField} className="field is-horizontal">
            <div style={styles.field}  className="field">
                <label style={{ color: "#1A6E93" }} className="label">
                Email
                </label>
                <div className="control">
                <input
                    {...register("email",{required: true, pattern: regexmail })}
                    style={styles.textColorInput}
                    className="input"
                    type="email"
                    placeholder="blackpearl@cap.free"
                />
                </div>
                {errors.email && <HelperText/>}
            </div>

            <div style={styles.field} className="field">
                <label style={{ color: "#1A6E93" }} className="label">
                    Date de naissance
                </label>
                <div className="control">
                <input {...register("birthday",{required: true})} style={styles.textColorInput} className="input" type="date"/>
                </div>
                {errors.birthday && <HelperText/>}
            </div>
          </div>


    <div style={{alignSelf:"center", width: "67%"}} className="field">
    <label style={{ color: "#1A6E93" }} className="label">
        Adresse
    </label>
      <div className="control">
          <input {...register("address",{required: true})} style={styles.textColorInput}  className="input" type="text" placeholder="121 quai de la berge"/>
      </div>
      {errors.address && <HelperText/>}
    </div>
          <div  style={styles.rowField} className="field is-horizontal">
            <div style={styles.field} className="field">
                <label style={{ color: "#1A6E93" }} className="label">
                    Ville
                </label>
                <div className="control">
                <input
                    {...register("city",{required: true})}
                    style={styles.textColorInput}
                    className="input"
                    type="text"
                    placeholder="Villeurbanne"
                />
                </div>
                {errors.city && <HelperText/>}
            </div>

            <div style={styles.field}  className="field">
                <label style={{ color: "#1A6E93" }} className="label">
                Code postal
                </label>
                <div className="control">
                <input {...register("postcode",{required: true, pattern: regexPostCode})} style={styles.textColorInput} className="input" type="text" placeholder="69100"  />
                </div>
                {errors.postcode && <HelperText/>}
            </div>
          </div>
          <div  style={styles.rowField} className="field is-horizontal">
            <div style={styles.field} className="field">
                <label style={{ color: "#1A6E93" }} className="label">
                Mot de passe
                </label>
                <div className="control">
                <input
                    {...register("password",{required: true})}
                    style={styles.textColorInput}
                    className="input"
                    type="password"
                    placeholder="******"
                />
                </div>
                {!passIsValid && <HelperText passText={true}/>}
            </div>

            <div style={styles.field}  className="field">
                <label style={{ color: "#1A6E93" }} className="label">
                Confirmation mot de passe
                </label>
                <div className="control">
                <input {...register("confirmPass",{required: true})} style={styles.textColorInput} className="input" type="password" placeholder="******"  />
                </div>
                {!passIsValid && <HelperText passText={true}/>}
            </div>
          </div>
          <button disabled={!isValid} style={styles.button} className="button">
            CONNEXION
          </button>
        </form>
      </div>
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
export default SignIn;
