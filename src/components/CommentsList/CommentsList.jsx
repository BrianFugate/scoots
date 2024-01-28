import React from "react";
import styles from "./CommentsList.module.css";
import comments from "../../api/Reddit/comments.json";

// Recursive function to iterate through comment data and put them
// in the corrent hierarchy for display
function iterateComments(arr) {
    return arr.map((element) => {
        let moreComments;

        if (Object.hasOwn(element.data, 'replies')) {
            if (Object.hasOwn(element.data.replies, 'data')) {
                if (Object.hasOwn(element.data.replies.data, 'children')) {
                    moreComments = iterateComments(element.data.replies.data.children);            
                }
            }                
        }

        return [(
            <div className={styles.commentDiv} key={element.data.id}>
                <p className={styles.comment} style={{marginLeft: `${element.data.depth}em`}}>{element.data.body}</p>
            </div>
        ), moreComments];
    });
};

export default function CommentsList() {
    return (
        <>
            {iterateComments(comments[1].data.children)}
            {/*<div className={styles.line1}></div>*/}
        </>
    );
};