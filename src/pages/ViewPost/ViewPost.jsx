import React from "react";
import styles from "./ViewPost.module.css";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import Post from "../../components/Post/Post.jsx";

export default function ViewPost() {
    return (
        <>
            <div className={styles.viewPostDiv}>
                <div className={styles.leftDiv}>
                    <SearchBar />
                    <h1 className={styles.searchTerm}>Search Term</h1>
                    <Post />
                </div>
                <div className={styles.rightDiv}>
                    <p>Comments</p>
                    <p>More comments</p>
                    <p>Even more comments</p>
                </div>
            </div>            
        </>
    );
};