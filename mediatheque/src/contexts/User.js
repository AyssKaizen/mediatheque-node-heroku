import React, {createContext, useContext, useState, useEffect} from 'react';

const UserContext = createContext({});
export default UserContext;
export const useUser = () => useContext(UserContext);

export const UserContextProvider = ({children}) => {
    const [profile, setProfile] = useState({})
    const [rentals, setRentals] = useState([])

    const getProfile = () => {
        setProfile ({
                lastname: "Jaeger",
                firstname: "Eren",
                birthday:"10/10/1990",
                email:"moi@mail.com",
                password:"123456",
                role:"user",
                isActive:true,
            })
    }
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

    useEffect(()=>{
        getProfile();
        getRentals();
    },[])


    return (<UserContext.Provider value={{ profile, rentals }}>
        {children}
    </UserContext.Provider>)
}