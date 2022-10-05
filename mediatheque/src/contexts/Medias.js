import React, {createContext, useContext, useState, useEffect} from 'react';
import envVar from '../envVar';
const MediasContext = createContext({});
export default MediasContext;
export const useMedias = () => useContext(MediasContext);

export const MediasContextProvider = ({children}) => {
    const [medias, setMedias] = useState([])
    const [types,setTypes] = useState([])
    const [genres,setGenres] = useState([])

    const getMedias = async () => {
        try {
            const response = await fetch(`${envVar.apiUrl}/medias`,{
                method: "GET",
                credentials: 'include',
                headers: {"Content-Type": "application/json"},
            });
            const medias = await response.json()
            medias && setMedias(medias)
        } catch (error) {
            console.error(error.message)
        }
    } 
    const getTypes = async () => {
        try {
            const response = await fetch(`${envVar.apiUrl}/medias/types`,{
                method: "GET",
                credentials: 'include',
                headers: {"Content-Type": "application/json"},
            });
            const types = await response.json()
            types && setTypes(types)
        } catch (error) {
            console.error(error.message)
        }
    }
    const getGenres = async () => {
        try {
            const response = await fetch(`${envVar.apiUrl}/medias/genres`,{
                method: "GET",
                credentials: 'include',
                headers: {"Content-Type": "application/json"},
            });
            const genres = await response.json()
            genres && setGenres(genres)
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(()=>{
        getMedias()
        getTypes()
        getGenres()
    },[])


    return (<MediasContext.Provider value={{ medias, types, genres }}>
        {children}
    </MediasContext.Provider>)
}