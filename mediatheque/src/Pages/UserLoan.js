import React,{useEffect} from "react"
import { useNavigate } from "react-router-dom"
import Nav from "../components/Nav"
import { useUser } from "../contexts/User"


const UserLoan = () => {
    const { rentals, profile } = useUser()
    const navigate = useNavigate()

    useEffect(()=> {
        !profile && navigate('/')
        console.log({rentals}); 
    },[]) // eslint-disable-line
    const manageRow = () => {
        return rentals.map(item => <tr><td>{item.title}</td><td>{item.author}</td><td>{item.date}</td><td>{item.type}</td></tr>)
    }
    return (
        <>
            { profile &&
                <>
                <Nav profile={profile} />
                <div style={{textAlign: "center", color: "#1A6E93"}} className="title is-3">Vos emprunts</div>
                <div style={{ marginLeft: "10%",width:" 85%",display: "flex", justifyContent: "center"}}>
                    <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                        <thead>
                            <tr>
                                <th>Titre</th>
                                <th>Auteur</th>
                                <th>Date de location</th>
                                <th>Type de media</th>
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
export default UserLoan