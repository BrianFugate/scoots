import React from "react";
import styles from "./PostsList.module.css";
import Post from "../Post/Post";

export default function PostsList() {
    return (
        <div className={styles.outerDiv}>
            {/* Future logic to iterate data and display posts */}
            <Post />
        </div>
    );
};                                 