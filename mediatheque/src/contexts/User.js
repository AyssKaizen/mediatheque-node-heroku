import React, {createContext, useContext, useState, useEffect} from 'react';
import envVar from '../envVar';
const UserContext = createContext({});
export default UserContext;
export const useUser = () => useContext(UserContext);

export const UserContextProvider = ({children}) => {
    const [profile, setProfile] = useState()
    const [rentals, setRentals] = useState([])
    const [noActiveUsers, setNoActiveUSers ] = useState()

    const checkConnexion = async  () => {
        try {
            const response = await fetch(`${envVar.apiUrl}/users/auth`,{
                method: "GET",
                credentials: 'include',
                headers: {"Content-Type": "application/json"},
            });
            const user = await response.json()
            user && setProfile(user)
            return user
            
        } catch (error) {
            console.error(error.message)
        }
    }

    const logIn = async (login, password) => {
        try {
            const res = await fetch(`${envVar.apiUrl}/users/login`,{
                method: "POST",
                credentials: 'include',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email: login, password: password})
            });
            const user = await res.json()
            if(res.status === 200) setProfile(user)
            return user
            
        } catch (error) {
            console.error(error.message)
        }
    }

    const logOut = async () => {
        try {
            const res = await fetch(`${envVar.apiUrl}/users/logout`,{
              method: "POST",
              credentials: 'include',
              headers: {"Content-Type": "application/json"},
            });
            return res
          } catch (error) {
            console.error(error.message);
          }
    }

    const getProfile = () => (profile) 
    
    const getRentals = () => {
        setRentals (
            [
                {
                    id: 1,
                    title: "Pirates des caraibes",
                    author:"MArtin jec pa",
                    date:"10/01/2020",
                    type:"Roman",
                },
                {
                    id: 2,
                    title: "Pirates des caraibes 2",
                    author:"MArtin jec pa",
                    date:"20/01/2020",
                    type:"Roman",
                }
            ]
            

            )
    }

    const getNoActiveUsers = () => {
        setNoActiveUSers (
            [
                {
                    id: 1,
                    lastname: "Sparrow",
                    firstname:"Jack",
                    email:"jacky@mail.com",
                    birthday:"10/12/2000",
                    address: '2 rue de la',
                    city: "Lyon",
                    postcode: '69000'
                },
                {
                    id: 2,
                    lastname: "jap",
                    firstname:"Jack",
                    email:"jap@mail.com",
                    birthday:"10/12/2003",
                    address: '2 rue de la rue',
                    city: "Panam",
                    postcode: '93000'
                },
                {
                    id: 3,
                    lastname: "Gey",
                    firstname:"Peter",
                    email:"guey@mail.com",
                    birthday:"10/12/2000",
                    address: '2 rue de la street',
                    city: "Paris",
                    postcode: '75000'
                },
                {
                    id: 4,
                    lastname: "hellos",
                    firstname:"tavu",
                    email:"hellos@mail.com",
                    birthday:"10/12/2000",
                    address: '2 chemin dy',
                    city: "Bordeaux",
                    postcode: '04000'
                },
            ]
            

            )
    }


    useEffect(()=>{
        getProfile();
        getRentals();
        getNoActiveUsers();
    },[]) // eslint-disable-line


    return (<UserContext.Provider value={{ 
        profile, 
        rentals, 
        setProfile, 
        checkConnexion, 
        logIn, 
        logOut, 
        noActiveUsers
    }}>
        {children}
    </UserContext.Provider>)
}