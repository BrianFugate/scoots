import React from "react";
import styles from "./Post.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faShareFromSquare } from '@fortawesome/free-regular-svg-icons';
import { Link } from "react-router-dom";
// GIF by Ekaterine Kantaria from https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=animation&utm_content=9342
import defaultImg from "../../assets/loader-9342_512.gif";

export default function Post(props) {


    return (
        <div className={styles.outerDiv}>
            <div className={styles.headingDiv}>
                <div className={styles.infoDiv}>
                    <div className={styles.userDiv}>
                        <div className={styles.user}>u/{props.author}</div>
                        <div className={styles.user}>{props.sub}</div>
                    </div>
                    <Link to={`/ViewPost/${props.id}`} className={styles.title}>{props.title}</Link>
                </div>
                <div className={styles.iconDiv}>
                    <Link to={`/ViewPost/${props.id}`} className={styles.title}>
                        <FontAwesomeIcon className={styles.icon} icon={faComments} />
                    </Link>                    
                    <FontAwesomeIcon className={styles.icon} icon={faShareFromSquare} />
                </div>
            </div>
            <img style={props.preview === null 
                        ? {display: 'none'} 
                        : {display: 'block'}} 
                className={styles.postImg} 
                src={props.preview === 'default'
                        ? defaultImg
                        : props.preview} 
                alt='Post image missing' />
            <p style={props.text === null ? {display: 'none'} : {display: 'block'}}>{props.text}</p>
        </div>
    );
};