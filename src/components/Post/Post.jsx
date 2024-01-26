import React from "react";
import styles from "./Post.module.css";
import fakePost from "../../assets/fake-post.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faShareFromSquare } from '@fortawesome/free-regular-svg-icons';
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Post() {
    return (
        <div className={styles.outerDiv}>
            <div className={styles.headingDiv}>
                <div className={styles.infoDiv}>
                    <div className={styles.userDiv}>
                        <FontAwesomeIcon className={styles.avatar} icon={faUserSecret} />
                        <p className={styles.title}>Username</p>
                    </div>
                    <Link to='/ViewPost' className={styles.title}>Post Title: This is where the title of the post will be</Link>
                </div>
                <div className={styles.iconDiv}>
                    <FontAwesomeIcon className={styles.icon} icon={faComments} />
                    <FontAwesomeIcon className={styles.icon} icon={faShareFromSquare} />
                </div>
            </div>
            <img className={styles.fakePost} src={fakePost} alt='Fake post image' />
        </div>
    );
};