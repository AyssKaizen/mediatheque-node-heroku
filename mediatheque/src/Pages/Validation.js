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
                <tr key={item.id}>
                    <td>{item.lastname}</td>
                    <td>{item.firstname}</td>
                    <td>{item.email}</td>
                    <td>{item.birthday}</td>
                    <td>{item.address}</td>
                    <td>{item.city}</td>
                    <td>{item.postcode}</td>
                    <td style={{display: 'flex', justifyContent: 'space-around'}}>
                        <button onClick={() => validOrDeleteUser(item.id, 'validate')} className="button is-primary is-small "> valider </button>
                        <button onClick={() => validOrDeleteUser(item.id, 'delete')} className="button is-danger is-small" > supprimer </button>
                    </td>
                </tr>)
    
    const validOrDeleteUser = (id, state) => {
        if(state === 'delete')
            console.log('user deleted', id);
        if(state === 'validate')
            console.log('user validated', id)
    }
    return (
        <>
            { profile &&
                <>
                <Nav profile={profile} />
                <div style={{textAlign: "center", color: "#1A6E93"}} className="title is-3">Utilisateurs en attente</div>
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
                            {manageRow()}
                        </tbody>
                    </table>
                </div>
                </>
            }
        </>
    )
    
}
export default Validation