import React from 'react'
import PendingValidation from './PendingValidation';
import Nav from '../components/Nav.js';
import TypeOfMedia from '../components/TypeOfMedia';
import { useUser } from '../contexts/User';

const Catalog = () => {
    const {profile} = useUser()
    const userIsActive = profile.us_active

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