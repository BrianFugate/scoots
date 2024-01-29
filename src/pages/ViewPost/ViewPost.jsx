import React, { useEffect } from "react";
import styles from "./ViewPost.module.css";
import SearchBar from "../../components/Search/Search.jsx";
import Post from "../../components/Post/Post.jsx";
import { useParams } from "react-router-dom";
import CommentsList from "../../components/CommentsList/CommentsList.jsx";
import { useSelector, useDispatch } from "react-redux";
import { selectViewPost, setCurrApiData } from "./viewPostSlice.js";
import Reddit from "../../api/Reddit/Reddit.js";


export default function ViewPost() {
    const currApi = useSelector(selectViewPost);
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        async function apiCall() {
            const redditData = await Reddit.getComments(id);
            console.log(redditData);
            dispatch(setCurrApiData(redditData));
        };
        apiCall();
    }, [id]);

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