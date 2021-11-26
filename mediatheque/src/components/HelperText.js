import React from 'react'

const HelperText = ({passText,login}) => {
    if(passText){
        return (
            <span style={styles.helper}>le mot de passe doit être identique</span>
        )
    }else if(login){
        return <div style={{textAlign: "center"}}><span style={styles.helper}>{login}</span></div>
    }
    else
     return (
        <span style={styles.helper}>le champs est invalide</span>
    )
}
const styles = {
    helper:{
        color: "red", 
        fontSize: "10px"
    }
}
export default HelperText;