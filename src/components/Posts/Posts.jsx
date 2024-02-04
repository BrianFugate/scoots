import React, { useEffect } from "react";
import styles from "./Posts.module.css";
import Post from "../Post/Post";
import { selectPosts } from "./postsSlice.js";
import { useSelector, useDispatch } from "react-redux";
import { selectCategory } from "../Category/categorySlice.js";
import { refreshApiData } from "./postsSlice.js";
import { Reddit } from "../../api/Reddit/Reddit.js";


export default function Posts() {
    const dispatch = useDispatch();
    const postData = useSelector(selectPosts);
    const activeCategory = useSelector(selectCategory).activeCategory;

    useEffect(() => {
        async function apiCall() {
            if (activeCategory !== 'Random') {
                const posts = await Reddit.getPosts(`/${activeCategory.toLowerCase()}`)
                dispatch(refreshApiData(posts));
            };
        };
        apiCall();
    }, [activeCategory]);

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