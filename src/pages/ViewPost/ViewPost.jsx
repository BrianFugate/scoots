import React, { useEffect } from "react";
import styles from "./ViewPost.module.css";
import SearchBar from "../../components/Search/Search.jsx";
import Post from "../../components/Post/Post.jsx";
import CommentsList from "../../components/CommentsList/CommentsList.jsx";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectViewPost, setPost, setComments, setMoreComments, setHasMore, resetInitial } from "./viewPostSlice.js";
import { Reddit } from "../../api/Reddit/Reddit.js";


export default function ViewPost() {
    const currPost = useSelector(selectViewPost);
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        async function apiCall() {
            dispatch(resetInitial());
            const redditData = await Reddit.getComments(id);
            dispatch(setPost(redditData[0].data.children[0]));
            dispatch(setComments(redditData[1].data.children));
            if (redditData[1]?.data?.children[redditData[1].data.children.length - 1]?.data?.children !== undefined) {
                dispatch(setMoreComments(redditData[1].data.children[redditData[1].data.children.length - 1].data.children))
                dispatch(setHasMore(true));
            }
            
        };
        apiCall();
    }, [id]);

    const post = currPost.post;

    return (
        <>
            <div className={styles.viewPostDiv}>
                <div className={styles.leftDiv}>
                    <SearchBar />
                    <Post key={post.data.id}
                        author={post.data.author}
                        sub={post.data.subreddit_name_prefixed}
                        title={post.data.title}
                        video={post.data.is_video ? post.data.media.reddit_video.hls_url : null}
                        videoLandscape={post.data.is_video 
                            ? post.data.media.reddit_video.height > post.data.media.reddit_video.width
                                ? false : true
                            : false}
                        preview={Object.hasOwn(post.data, 'preview') 
                        ? Object.hasOwn(post.data.preview.images[0], 'resolutions') 
                            ? post.data.preview.images[0].resolutions.length >= 4
                                ? post.data.preview.images[0].resolutions[3].url
                                : post.data.preview.images[0].source.url
                            : post.data.preview.images[0].source.url 
                        : null}
                        text={Object.hasOwn(post.data, 'selftext') ? post.data.selftext : null}
                        id={post.data.id}
                        redditMedia={post.data.is_reddit_media_domain}
                        url={post.data.url} />
                </div>
                <div className={styles.rightDiv} id='rightDiv'>
                    <CommentsList />
                </div>
            </div>            
        </>
    );
};