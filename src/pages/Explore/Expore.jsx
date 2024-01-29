import React from "react";
import styles from "./Explore.module.css";
import Search from "../../components/Search/Search.jsx";
import Posts from "../../components/Posts/Posts.jsx";

export default function Explore() {
    return (
        <div className={styles.exploreDiv}>
            <div>
                <Search />
            </div>
            <div className={styles.postsListOuterDiv}>
                <h1 className={styles.searchTerm}>Search Term</h1>
                <Posts />
            </div>
        </div>
    );
};