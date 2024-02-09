import React, { useEffect } from "react";
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
    const rightDiv = document.getElementById('commentsDiv');
    const lineDiv = document.getElementsByClassName('lineClass');
    let divHeight = '0px';
    let lines = [];

    useEffect(() => {
        if (rightDiv && lineDiv) {
            divHeight = window.getComputedStyle(rightDiv).height;
            console.log(lineDiv);
            for (const e of lineDiv) {
                e.style.height = divHeight
            }

            //lineDiv.map((e) => {e.style.height = divHeight});
        };
    });

    for (let i = 0; i < 7; i++) {
        const margin = i * 1.2
        let line = (<div className={`${styles.lines} lineClass`} style={{ marginLeft: `${margin}em` }} key={i}></div>);
        lines.push(line);
    }

    
    function iterateComments(arr) {
        return arr.map((element) => {
            if (element === undefined || element === null) return;
            if (element.data.body === undefined) return;
    
            const pTag = (
                <div className={styles.commentDiv} key={element.data.id} style={{ marginLeft: `${element.data.depth * 1.2 + 0.5}em` }}>
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
            {/*<div className={`${styles.lines} lineClass`} style={{ height: divHeight }}></div>*/}
            
            <div id='commentsDiv'>
                {iterateComments(comments.comments)}
            </div>
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