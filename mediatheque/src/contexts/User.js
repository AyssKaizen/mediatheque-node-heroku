import React, {createContext, useContext, useState, useEffect} from 'react';
import envVar from '../envVar';
const UserContext = createContext({});
export default UserContext;
export const useUser = () => useContext(UserContext);

export const UserContextProvider = ({children}) => {
    const [profile, setProfile] = useState()
    const [rentals, setRentals] = useState([])
    const [noActiveUsers, setNoActiveUSers ] = useState([])

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
    
    const getRentals =  () => {
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

    const getNoActiveUsers = async () => {
        try {
            const response = await fetch(`${envVar.apiUrl}/users/inactive`,{
                method: "GET",
                credentials: 'include',
                headers: {"Content-Type": "application/json"},
            });
            const users = await response.json()
            users && setNoActiveUSers(users)
        } catch (error) {
            console.error(error.message)
        }
    }

    const activateUser = async id => {
        try {
            const response = await fetch(`${envVar.apiUrl}/users/activate/${id}`,{
                method: "PUT",
                credentials: 'include',
                headers: {"Content-Type": "application/json"},
            });
            const res = await response.json()
            if(response.status === 200){
                await getNoActiveUsers()
            }
            return res
        } catch (error) {
            console.error(error.message)
        }
    }

    const deleteUser = async id => {
        try {
            const response = await fetch(`${envVar.apiUrl}/users/remove/${id}`,{
                method: "DELETE",
                credentials: 'include',
                headers: {"Content-Type": "application/json"},
            });
            const res = await response.json()
            if(response.status === 200){
                await getNoActiveUsers()
            }
            return res
        } catch (error) {
            console.error(error.message)
        }
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
        noActiveUsers,
        activateUser,
        getNoActiveUsers,
        deleteUser
    }}>
        {children}
    </UserContext.Provider>)
}