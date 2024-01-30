import React from "react";
import styles from "./CommentsList.module.css";
import { useSelector } from "react-redux";
import { selectViewPost } from "../../pages/ViewPost/viewPostSlice.js";


// Recursive function to iterate through comment data and put them
// in the correct hierarchy for display
function iterateComments(arr, id) {
    return arr.flatMap((element) => {
        let moreComments = [];
        const pTag = (
            <div className={styles.commentDiv} key={element.data.id}>
                <p className={styles.comment} style={{ marginLeft: `${element.data.depth}em` }}>{element.data.body}</p>
            </div>
        )

        // If current element has a child comment call iterateComments recursively
        if (element?.data?.replies?.data?.children !== undefined) {
            moreComments = iterateComments(element.data.replies.data.children, id);
        }

        // Return recursive data and next comment if it exists
        if (element.data.body === undefined) {
            return [...moreComments];
        } else {
            return [pTag, ...moreComments];
        }
    });
};

export default function CommentsList() {
    const comments = useSelector(selectViewPost).currApiData;
    const id = comments[0].data.children[0].data.id;

    return (
        <>
            {iterateComments(comments[1].data.children, id)}
            <div>
                <a>Load more comments</a>
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