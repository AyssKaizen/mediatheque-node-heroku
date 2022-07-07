import React,{useEffect,useState} from "react"
import { useNavigate } from "react-router-dom"
import Nav from "../components/Nav"
import { useUser } from "../contexts/User"


const Validation = () => {
    const { profile, noActiveUsers, activateUser, getNoActiveUsers, deleteUser } = useUser()
    const navigate = useNavigate()
    const [modalText, setModalText] = useState('')

    useEffect(()=> {
        !profile && navigate('/')
    },[]) // eslint-disable-line

    useEffect(() => {
        getNoActiveUsers()
    },[]) // eslint-disable-line

    const toggleModal = () => {
        document.getElementById("modalUserActived").classList.toggle("is-active")
    }
    const onCloseModal = () => {
        toggleModal()
    }

    const manageRow = () => noActiveUsers.map(
            item => 
                <tr key={item.us_id}>
                    <td>{item.us_lastname}</td>
                    <td>{item.us_firstname}</td>
                    <td>{item.us_email}</td>
                    <td>{new Date(item.us_birthday).toLocaleDateString('fr')}</td>
                    <td>{item.us_address}</td>
                    <td>{item.us_city}</td>
                    <td>{item.us_postcode}</td>
                    <td style={{display: 'flex', justifyContent: 'space-around'}}>
                        <button onClick={() => validOrDeleteUser(item.us_id, 'validate')} className="button is-primary is-small">Valider</button>
                        <button onClick={() => validOrDeleteUser(item.us_id, 'delete')} className="button is-danger is-small" >Supprimer</button>
                    </td>
                </tr>)
    
    const validOrDeleteUser = async (id, state) => {
        if(state === 'delete'){
            const res = await deleteUser(id)
            setModalText(res)
            toggleModal()
        }
        if(state === 'validate'){
            const res = await activateUser(id)
            setModalText(res)
            toggleModal()
        }

    }
    return (
        <>
            { profile &&
                <>
                <Nav profile={profile} />
                <div id="modalUserActived" className="modal">
                    <div className="modal-background"></div>
                    <div style={{display: 'flex', justifyContent: 'center'}} className="modal-content">
                    <div style={{display: "flex", flexDirection:"column", width: "60%"}} className="box">
                        <p style={{textAlign: 'center'}}>{modalText}</p>
                        <button style={{alignSelf: 'center', margin: "10px"}} className="button is-small is-primary" onClick={onCloseModal}>cool !</button>
                    </div>
                    </div>
                    <button onClick={onCloseModal} className="modal-close is-large" aria-label="close"></button>
                </div>
                <div style={{textAlign: "center", color: "#1A6E93"}} className="title is-3">Utilisateurs en attente de validation</div>
                {noActiveUsers.length > 0 ? <div style={{ marginLeft: "10%",width:" 85%",display: "flex", justifyContent: "center"}}>
                    <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Prenom</th>
                                <th>email</th>
                                <th>Date de naissance</th>
                                <th>Adresse</th>
                                <th>Ville</th>
                                <th>Code postal</th>
                                <th>Validation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {manageRow()}
                        </tbody>
                    </table>
                </div> 
                : 
                <div>
                    <p style={{
                        textAlign: 'center', 
                        color: "#1A6E93", 
                        marginTop: '10%' }}
                    >
                        AUCUN UTILISATEUR EN ATTENTE
                    </p>
                </div>}
                </>
            }
        </>
    )
    
}
export default Validation