import React from "react";
import styles from "./ViewPost.module.css";
import SearchBar from "../../components/Search/Search.jsx";
import Post from "../../components/Post/Post.jsx";
import { useParams } from "react-router-dom";
import CommentsList from "../../components/CommentsList/CommentsList.jsx";
import { useSelector } from "react-redux";
import { selectViewPost } from "./viewPostSlice.js";


export default function ViewPost() {
    const { id } = useParams();
    const currApi = useSelector(selectViewPost);
    const post = currApi.currApiData[0].data.children[0];

    return (
        <>
            <div className={styles.viewPostDiv}>
                <div className={styles.leftDiv}>
                    <SearchBar />
                    <h1 className={styles.searchTerm}>Search Term</h1>
                    <Post key={post.data.id}
                        author={post.data.author}
                        sub={post.data.subreddit}
                        title={post.data.title}
                        preview={Object.hasOwn(post.data, 'preview') ? post.data.preview.images[0].source.url : null}
                        text={Object.hasOwn(post.data, 'selftext') ? post.data.selftext : null}
                        id={post.data.id} />
                </div>
                <div className={styles.rightDiv}>
                    <CommentsList />
                </div>
            </div>            
        </>
    );
};