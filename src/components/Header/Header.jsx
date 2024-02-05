import React from "react";
import redditLogo from '../../assets/reddit-lockup-ondark.svg';
import scootsLogo from '../../assets/scoots-logo.png';
import styles from './Header.module.css';
import { useNavigate } from "react-router-dom";
import { setActive } from "../Category/categorySlice.js";
import { clearText } from "../Search/searchSlice.js";
import { useDispatch } from "react-redux";

export default function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleClick() {
        dispatch(setActive('Hot'));
        dispatch(clearText());
        navigate('/');
    }

    return (
        <div className={styles.headerContainer}>
            <img src={redditLogo} alt='Reddit Logo' className={styles.redditLogo}/>
            <div className={styles.scootsLink}>
                <img onClick={handleClick} src={scootsLogo} alt='scoots Logo'/>
            </div>
        </div>
    );
}