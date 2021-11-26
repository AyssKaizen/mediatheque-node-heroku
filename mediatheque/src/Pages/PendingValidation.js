import React from 'react'
import Logo from '../components/Logo';

const PendingValidation = () => {
    return (
        <>
            <Logo/>
            <div className="block" style={styles.block}>
                <p style={styles.infos} className="title is-5">Félicitations vôtre compte à été crée, celui-ci est en attente de validation par nos équipes.</p>
                <p style={styles.infos} className="title is-5">Veuillez revenir ultérieurement ou contacter le support au 04 54 66 43 22</p>
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