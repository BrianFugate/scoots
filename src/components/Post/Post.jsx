import React from "react";
import styles from "./Post.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faShareFromSquare } from '@fortawesome/free-regular-svg-icons';
import { Link } from "react-router-dom";

export default function Post(props) {
    return (
        <div className={styles.outerDiv}>
            <div className={styles.headingDiv}>
                <div className={styles.infoDiv}>
                    <div className={styles.userDiv}>
                        <p className={styles.title}>u/{props.author}</p>
                        <p className={styles.title}>r/{props.sub}</p>
                    </div>
                    <Link to={`/ViewPost/${props.id}`} className={styles.title}>{props.title}</Link>
                </div>
                <div className={styles.iconDiv}>
                    <FontAwesomeIcon className={styles.icon} icon={faComments} />
                    <FontAwesomeIcon className={styles.icon} icon={faShareFromSquare} />
                </div>
            </div>
            <img style={props.preview === null ? {display: 'none'} : {display: 'block'}} className={styles.fakePost} src={props.preview} alt='Post image missing' />
            <p style={props.text === null ? {display: 'none'} : {display: 'block'}}>{props.text}</p>
        </div>
    );
};