import React, { useEffect } from "react";
import styles from "./Posts.module.css";
import Post from "../Post/Post";
import { selectPosts } from "./postsSlice.js";
import { useSelector, useDispatch } from "react-redux";
import { selectCategory } from "../Category/categorySlice.js";
import { selectSearch, clearText } from "../Search/searchSlice.js";
import { refreshApiData, resetInitialPost } from "./postsSlice.js";
import { Reddit } from "../../api/Reddit/Reddit.js";


export default function Posts() {
    const dispatch = useDispatch();
    const postData = useSelector(selectPosts);
    const activeCategory = useSelector(selectCategory).activeCategory;
    const searchText = useSelector(selectSearch).searchText;
    const submitToggle = useSelector(selectSearch).submitToggle;

    useEffect(() => {
        async function apiCall() {
            dispatch(resetInitialPost());

            let endpoint = activeCategory.toLowerCase();
            let args = '';

            if (activeCategory === 'Arguable') endpoint = 'controversial';

            if (activeCategory === 'search') {
                args = `&q=${searchText}`;             
            } else {
                dispatch(clearText());
            };

            const posts = await Reddit.getPosts(endpoint, args);
            dispatch(refreshApiData(posts));
        };
        apiCall();
    }, [activeCategory, submitToggle]);

    return (
        <div className={styles.outerDiv}>
            {postData.apiData.data.children.map((post) =>
                <Post key={post.data.id}
                    author={post.data.author}
                    sub={post.data.subreddit_name_prefixed}
                    title={post.data.title}
                    preview={Object.hasOwn(post.data, 'preview') ? post.data.preview.images[0].source.url : null}
                    text={Object.hasOwn(post.data, 'selftext') ? post.data.selftext : null}
                    id={post.data.id} />)}
        </div>
    );
};                                 