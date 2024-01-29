import React from "react";
import styles from "./Posts.module.css";
import Post from "../Post/Post";
import { selectPosts } from "./postsSlice.js";
import { useSelector } from "react-redux";


export default function PostsList() {
    const postData = useSelector(selectPosts);

    return (
        <div className={styles.outerDiv}>
            {postData.apiData.data.children.map((post) => 
                <Post key={post.data.id}
                    author={post.data.author}
                    sub={post.data.subreddit}
                    title={post.data.title}
                    preview={Object.hasOwn(post.data, 'preview') ? post.data.preview.images[0].source.url : null}
                    text={Object.hasOwn(post.data, 'selftext') ? post.data.selftext : null}
                    id={post.data.id} />)}
        </div>
    );
};                                 