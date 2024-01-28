import React from "react";
import styles from "./PostsList.module.css";
import Post from "../Post/Post";
import postData from "../../api/Reddit/best.json";


export default function PostsList() {
    return (
        <div className={styles.outerDiv}>
            {postData.data.children.map((post) => 
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