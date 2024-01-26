import React from "react";
import styles from "./Explore.module.css";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import PostsList from "../../components/PostsList/PostsList.jsx";

export default function Explore() {
    return (
        <div className={styles.exploreDiv}>
            <div>
                <SearchBar />
            </div>
            <div className={styles.postsListOuterDiv}>
                <h1 className={styles.searchTerm}>Search Term</h1>
                <PostsList />
            </div>
        </div>
    );
};