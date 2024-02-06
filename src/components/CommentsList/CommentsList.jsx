import React from "react";
import styles from "./CommentsList.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { selectViewPost, setHasMore } from "../../pages/ViewPost/viewPostSlice.js";
import { Reddit } from "../../api/Reddit/Reddit.js";
import { addComments, trimMoreComments } from "../../pages/ViewPost/viewPostSlice.js";


export default function CommentsList() {
    const comments = useSelector(selectViewPost);
    const dispatch = useDispatch()
    const { id } = useParams();

    function iterateComments(arr) {
        return arr.map((element) => {
            if (element === undefined || element === null) return;
            if (element.data.body === undefined) return;
    
            const pTag = (
                <div className={styles.commentDiv} key={element.data.id} style={{ marginLeft: `${element.data.depth * 1.2}em` }}>
                    <p className={styles.user}>u/{element.data.author}</p>
                    <p className={styles.comment}>{element.data.body}</p>
                </div>
            )
    
            return pTag;
        });
    };
    
    async function loadMore(arr) {
        let length = 100;
        
        if (arr.length < 100) {
            length = arr.length;
            dispatch(setHasMore(false));
        }
  
        const fetchArr = arr.slice(0, length - 1).toString();
        const response = await Reddit.getMoreComments(comments.post.data.name, fetchArr);
        dispatch(addComments(response.json.data.things));
        dispatch(trimMoreComments(length));
    
    };

    return (
        <>
            {iterateComments(comments.comments)}
            <div>
                {comments.hasMore ? <button onClick={() => loadMore(comments.moreComments)}>Load more comments</button> : <></>}
                <a
                    href={'https://redd.it/' + id}
                    target='_blank'
                    className={styles.comment}
                >Read deep nested comments on Reddit
                </a>
            </div>
        </>
    );
};