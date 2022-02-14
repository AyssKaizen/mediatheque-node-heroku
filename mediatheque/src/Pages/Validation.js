import React,{useEffect} from "react"
import { useNavigate } from "react-router-dom"
import Nav from "../components/Nav"
import { useUser } from "../contexts/User"


const Validation = () => {
    const { profile, noActiveUsers } = useUser()
    const navigate = useNavigate()

    useEffect(()=> {
        !profile && navigate('/')
    },[]) // eslint-disable-line


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
                        <button onClick={() => validOrDeleteUser(item.us_id, 'validate')} className="button is-primary is-small "> valider </button>
                        <button onClick={() => validOrDeleteUser(item.us_id, 'delete')} className="button is-danger is-small" > supprimer </button>
                    </td>
                </tr>)
    
    const validOrDeleteUser = (id, state) => {
        if(state === 'delete')
            console.log('user deleted', id);
            //deleteUser(id)
        if(state === 'validate')
            console.log('user validated', id)
            //valideUSer(id)
    }
    return (
        <>
            { profile &&
                <>
                <Nav profile={profile} />
                <div style={{textAlign: "center", color: "#1A6E93"}} className="title is-3">Utilisateurs en attente de validation</div>
                <div style={{ marginLeft: "10%",width:" 85%",display: "flex", justifyContent: "center"}}>
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
                            {noActiveUsers.length > 0 && manageRow()}
                        </tbody>
                    </table>
                </div>
                </>
            }
        </>
    )
    
}
export default Validation