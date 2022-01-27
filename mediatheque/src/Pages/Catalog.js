import React,{useEffect} from 'react'
import PendingValidation from './PendingValidation';
import Nav from '../components/Nav.js';
import TypeOfMedia from '../components/TypeOfMedia';
import { useUser } from '../contexts/User';
import { useNavigate } from 'react-router-dom';

const Catalog = () => {
    const navigate = useNavigate()
    const {profile} = useUser()
    const userIsActive = profile?.us_active

    useEffect(()=> {
        !profile && navigate('/')
    },[])

    return (
        !userIsActive ?
        <PendingValidation/>
        : 
        (
        <>
            <Nav profile={profile}/>
            <TypeOfMedia/>
        </>
        )
    )
}
export default Catalog;