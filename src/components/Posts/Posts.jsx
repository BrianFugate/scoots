import React, { useEffect } from "react";
import styles from "./Posts.module.css";
import Post from "../Post/Post";
import { selectPosts } from "./postsSlice.js";
import { useSelector, useDispatch } from "react-redux";
import { selectCategory } from "../Category/categorySlice.js";
import { selectSearch, clearText } from "../Search/searchSlice.js";
import { refreshPosts, setAfter, resetInitialPost, addPosts } from "./postsSlice.js";
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

            const endpoint = getEndpoint();
            let args = '';

            if (endpoint === 'search') {
                args = `&q=${searchText}`;             
            } else {
                dispatch(clearText());
            };

            const posts = await Reddit.getPosts(endpoint, args);
            dispatch(refreshPosts(posts.data.children));
            dispatch(setAfter(posts.data.after))
        };
        apiCall();
    }, [activeCategory, submitToggle]);

    // Helper function to get endpoint
    function getEndpoint() {
        let endpoint = activeCategory.toLowerCase();
        if (activeCategory === 'Arguable') endpoint = 'controversial';

        return endpoint;
    };

    // Load more posts click handler
    async function loadMore(afterName) {
        if (afterName !== '') {
            const endpoint = getEndpoint();
            let args = '';

            if (endpoint === 'search') {
                args = `&q=${searchText}&after=${afterName}`;             
            } else {
                args = `&after=${afterName}`;
            };
            const response = await Reddit.getPosts(endpoint, args);
            dispatch(addPosts(response.data.children));
            dispatch(setAfter(response.data.after));
        }
    };

    return (
        <div className={styles.outerDiv}>
            {postData.posts.map((post) =>
                <Post key={post.data.id}
                    author={post.data.author}
                    sub={post.data.subreddit_name_prefixed}
                    title={post.data.title}
                    video={post.data.is_video ? post.data.media.reddit_video.hls_url : null}
                    videoLandscape={post.data.is_video 
                        ? post.data.media.reddit_video.height > post.data.media.reddit_video.width
                            ? false : true
                        : false}
                    preview={Object.hasOwn(post.data, 'preview') ? post.data.preview.images[0].source.url : null}
                    text={Object.hasOwn(post.data, 'selftext') ? post.data.selftext : null}
                    id={post.data.id}
                    redditMedia={post.data.is_reddit_media_domain}
                    url={post.data.url}/>)}
                <button onClick={() => loadMore(postData.after)}>Load more posts</button>
        </div>
    );
};                                 