import React from "react";
import redditLogo from '../../assets/reddit-lockup-ondark.svg';
import scootsLogo from '../../assets/scoots-logo.png';
import styles from './Header.module.css';
import { useNavigate, useLocation } from "react-router-dom";
import { selectCategory, setActive } from "../Category/categorySlice.js";
import { clearText } from "../Search/searchSlice.js";
import { useDispatch, useSelector } from "react-redux";

export default function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const category = useSelector(selectCategory).activeCategory;

    function handleClick() {
        const alreadyHot = category === 'Hot' ? true : false;

        dispatch(setActive('Hot'));
        dispatch(clearText());

        if (alreadyHot && location.pathname === '/') {
            navigate(0);
        } else {
            navigate('/');
        };        
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