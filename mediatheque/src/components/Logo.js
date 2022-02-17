import React from 'react';
import logo from '../assets/logo.png'
import { Link } from "react-router-dom";

const Logo = () => {
    return (
        <Link to="/">
            <div style={Styles.logo}>
                <figure className="image is-128x128">
                    <img alt="logo chapelle curreaux" src={logo}/>
                </figure>
            </div>
        </Link>
    )
}
const Styles = {
    logo: {
        margin: 10
    }
}
export default Logo