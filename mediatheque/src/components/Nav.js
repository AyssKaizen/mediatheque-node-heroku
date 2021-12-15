import React, { useEffect, useState } from "react";
import userImage from '../assets/user.png'
import Logo from "./Logo";
import { Link, useNavigate } from "react-router-dom";

const Nav = ({profile}) => {
    const navigate = useNavigate();  
  const [burgerIsActive, setBurgerIsActive] = useState(false);

  useEffect(()=> {
    console.log(profile);
  },[profile])

  const toggleBurger = () => {
    const burger = document.getElementById("burger");
    const menu = document.getElementById("navbarBasic");
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
  return (
    <nav style={{backgroundColor: '#FCF9F2'}} class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <Logo/>

        <p
          onClick={toggleBurger}
          id="burger"
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasic"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </p>
      </div>

      <div id="navbarBasic" class="navbar-menu">
        {profile.us_admin &&
            <div class="navbar-start">
            <div class="navbar-item">
                <button class="button is-primary">+ Ajouter un livre</button>
            </div>
            </div>
        }
        <div class="navbar-end">
        <Link to="/catalog" class="navbar-item">Catalogue</Link>
          <Link to="/myloan" class="navbar-item">Emprunts</Link>
          {profile.us_admin && <Link to="/myloan" class="navbar-item">Validation</Link>}
          <div class="navbar-item">
            <div class="buttons">
            <div style={styles.userImage}>
              <img src={userImage} alt="icon user"/>
              <span style={{fontSize: "12px"}}>{profile.us_firstname}</span>
            </div>
              <button onClick={()=> navigate("/")} class="button is-primary is-small">log out</button>
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
