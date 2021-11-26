import React from 'react';
import logo from '../assets/logo.png'

const Logo = () => {
    return (
        <div style={Styles.logo}>
            <figure className="image is-128x128">
                <img alt="logo chapelle curreaux" src={logo}/>
            </figure>
        </div>
    )
}
const Styles = {
    logo: {
        margin: 10
    }
}
export default Logo