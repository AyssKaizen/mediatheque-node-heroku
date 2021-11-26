import React, {createContext, useContext, useState, useEffect} from 'react';

const MediasContext = createContext({});
export default MediasContext;
export const useMedias = () => useContext(MediasContext);

export const MediasContextProvider = ({children}) => {
    const [medias, setMedias] = useState([])
    const [typemedias,setTypemedias] = useState([])

    const getMedias = () => {
        setMedias (
            [
                {
                    id:1,
                    title: "Alice au pays des merveilles", 
                    release_date: "01/03/1970", 
                    image:"/public/img/check.png",
                    author:"jean jsepa", 
                    type_media: "Album",
                    genre: "conte"
                },
                {
                    id:2,
                    title: "Fire and blood", 
                    release_date: "01/03/2019", 
                    image:"../../public/img/fire&bloodred.jpeg",
                    author:"George R.R Martin", 
                    type_media: "Roman",
                    genre: "fantastique"
                },
                {
                    id:3,
                    title: "Avengers", 
                    release_date: "01/03/1980", 
                    image:"../../public/img/fire&bloodred.jpeg",
                    author:"martin jsepa", 
                    type_media: "Comic",
                    genre: "marvel"
                },
                {
                    id:4,
                    title: "La tortue", 
                    release_date: "01/03/1990", 
                    image:"../../public/img/fire&bloodred.jpeg",
                    author:"jean dock", 
                    type_media: "Documentaire",
                    genre: "animalier"
                },
                {
                    id:5,
                    title: "Fire and blood 2", 
                    release_date: "01/03/2019", 
                    image:"../../public/img/fire&bloodred.jpeg",
                    author:"George R.R Martin", 
                    type_media: "Roman",
                    genre: "fantastique"
                },
                {
                    id:6,
                    title: "starsky", 
                    release_date: "01/03/2019", 
                    image:"../../public/img/fire&bloodred.jpeg",
                    author:"many man", 
                    type_media: "Roman",
                    genre: "policer"
                },
                {
                    id:7,
                    title: "moldu triste", 
                    release_date: "01/03/2019", 
                    image:"../../public/img/fire&bloodred.jpeg",
                    author:"harry pot", 
                    type_media: "Roman",
                    genre: "drame"
                },
                {
                    id:8,
                    title: "le malade imaginaire", 
                    release_date: "01/03/2019", 
                    image:"../../public/img/fire&bloodred.jpeg",
                    author:"Molière", 
                    type_media: "Roman",
                    genre: "théatre"
                },
                {
                    id:9,
                    title: "le faucon déniché", 
                    release_date: "01/03/2019", 
                    image:"../../public/img/fire&bloodred.jpeg",
                    author:"Molière", 
                    type_media: "Roman",
                    genre: "aventure"
                },
                {
                    id:10,
                    title: "Game of thrones", 
                    release_date: "01/03/2019", 
                    image:"../../public/img/fire&bloodred.jpeg",
                    author:"george R.R Martin", 
                    type_media: "Roman",
                    genre: "fantastique"
                },{
                    id:11,
                    title: "Magneto legacy", 
                    release_date: "01/03/2019", 
                    image:"../../public/img/fire&bloodred.jpeg",
                    author:"un type", 
                    type_media: "Comic",
                    genre: "x-men"
                },
            ]
            

            )
    }
    const getTypeMedias = () => {
        setTypemedias(
             ["Roman", "Album", "Comic", "Documentaire"]
        )
    }

    useEffect(()=>{
        getMedias()
        getTypeMedias()
    },[])


    return (<MediasContext.Provider value={{ medias, typemedias }}>
        {children}
    </MediasContext.Provider>)
}