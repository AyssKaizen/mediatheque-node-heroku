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
    const getMediaByID = async (id) => {
        try {
            const response = await fetch(`${envVar.apiUrl}/medias/${id}`,{
                method: "GET",
                credentials: 'include',
                headers: {"Content-Type": "application/json"},
            });
            const media = await response.json()
            return media
        } catch (error) {
            console.error(error.message)
        }
    }
    const updateMediaByID = async (id, payload) => {
        try {
            const response = await fetch(`${envVar.apiUrl}/medias/${id}`,{
                method: "PUT",
                credentials: 'include',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(payload)
            });
            if(response.status === 200){
                await getMedias();
                return response.status
            }
        } catch (error) {
            console.error(error.message)
        }
    }
    const deleteMediaByID = async id => {
        try {
            const response = await fetch(`${envVar.apiUrl}/medias/${id}`,{
                method: "DELETE",
                credentials: 'include',
                headers: {"Content-Type": "application/json"},
            });
            const res = await response.json()
            if(response.status === 200){
                await getMedias();
            }
            return res
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(()=>{
        getMedias()
        getTypes()
        getGenres()
    },[])


    return (<MediasContext.Provider value={{ medias, types, genres, deleteMediaByID, getMediaByID, updateMediaByID }}>
        {children}
    </MediasContext.Provider>)
}