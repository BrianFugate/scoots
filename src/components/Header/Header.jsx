import React from "react";
import redditLogo from '../../assets/reddit-lockup-ondark.svg';
import scootsLogo from '../../assets/scoots-logo.png';
import styles from './Header.module.css';

export default function Header() {
    return (
        <div className={styles.headerContainer}>
            <img src={redditLogo} alt='Reddit Logo' className={styles.redditLogo}/>
            <img src={scootsLogo} alt='scoots Logo' className={styles.scootsLogo}/>
        </div>
    );
}