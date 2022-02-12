import React, { useState } from "react";
import userImage from '../assets/user.png'
import Logo from "./Logo";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/User";

const Nav = ({profile}) => {
  const navigate = useNavigate()
  const { logOut } = useUser() 
  const [burgerIsActive, setBurgerIsActive] = useState(false)

  const toggleBurger = () => {
    const burger = document.getElementById("burger")
    const menu = document.getElementById("navbarBasic")
    if (!burgerIsActive) {
      burger.classList.add("is-active");
      menu.classList.add("is-active");
      setBurgerIsActive(true);
    } else {
      burger.classList.remove("is-active");
      menu.classList.remove("is-active");
      setBurgerIsActive(false);
    }
  };

  const logout = async () => {
     const response = await logOut()
     if(response.status === 200){
      document.cookie = "sid=; expires=Thu, 18 Dec 2013 12:00:00 UTC"
      navigate('/')
    }
  }

  return (
    <nav style={{backgroundColor: '#FCF9F2'}} className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Logo/>

        <p
          onClick={toggleBurger}
          id="burger"
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasic"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </p>
      </div>

      <div id="navbarBasic" className="navbar-menu">
        {profile.us_admin &&
            <div className="navbar-start">
            <div className="navbar-item">
                <button className="button is-primary">+ Ajouter un livre</button>
            </div>
            </div>
        }
        <div className="navbar-end">
        <Link to="/catalog" className="navbar-item">Catalogue</Link>
          <Link to="/myloan" className="navbar-item">Emprunts</Link>
          {profile.us_admin && <Link to="/myloan" className="navbar-item">Validation</Link>}
          <div className="navbar-item">
            <div className="buttons">
            <div style={styles.userImage}>
              <img src={userImage} alt="icon user"/>
              <span style={{fontSize: "12px"}}>{profile.us_firstname}</span>
            </div>
              <button onClick={logout} className="button is-primary is-small">log out</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
const styles ={
    userImage:{
        display: "flex",
        flexDirection: "column",
        position: 'absolute',
        top: "10px",
        right: "30px"
    }
}
export default Nav;
