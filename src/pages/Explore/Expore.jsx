import React, { lazy } from "react";
import styles from "./Explore.module.css";

const Search = lazy(() => import("../../components/Search/Search.jsx"));
const Posts = lazy(() => import("../../components/Posts/Posts.jsx"));

export default function Explore() {
    return (
        <div className={styles.exploreDiv}>
            <div>
                <Search />
            </div>
            <div className={styles.postsListOuterDiv}>
                <Posts />
            </div>
        </div>
    );
};