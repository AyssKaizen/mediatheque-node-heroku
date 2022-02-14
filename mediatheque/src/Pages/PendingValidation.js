import React from 'react'
import Logo from '../components/Logo';
import Nav from '../components/Nav';
import { useUser } from '../contexts/User';

const PendingValidation = () => {
    const {profile} = useUser()
    return (
        <>
            <Nav profile={profile}/>
            <div className="block" style={styles.block}>
                <p style={styles.infos} className="title is-5">Votre compte est en attente de validation </p>
                <p style={styles.infos} className="title is-5">Veuillez revenir ultérieurement ou contacter le support au 04 54 66 43 22 ou par mail: medTech@chapelle.com</p>
            </div>
        </>
    )
}
const styles = {
    infos: {
        textAlign: "center",
        color: "#75D9B6",
      },
    block: {
        marginTop: '15%',
        marginRight: '5%',
        marginLeft: '5%'
    }
}
export default PendingValidation;