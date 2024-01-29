import React from "react";
import styles from "./CommentsList.module.css";
import { Util } from "../../utilities/Util.js";
import { useSelector } from "react-redux";
import { selectViewPost } from "../../pages/ViewPost/viewPostSlice.js";


// Recursive function to iterate through comment data and put them
// in the correct hierarchy for display
function iterateComments(arr, id) {
    return arr.flatMap((element) => {
        let moreComments = [];
        const aTag = (
            <div className={styles.commentDiv} key={element.data.id}>
                <a
                    href={'https://redd.it/' + id}
                    target='_blank'
                    className={styles.comment}
                    style={{ marginLeft: `${element.data.depth}em` }}
                >Read 'deep' comments on Reddit
                </a>
            </div>
        );
        const pTag = (
            <div className={styles.commentDiv} key={element.data.id}>
                <p className={styles.comment} style={{ marginLeft: `${element.data.depth}em` }}>{element.data.body}</p>
            </div>
        )

        // If current element has a child comment call iterateComments recursively
        if (element?.data?.replies?.data?.children !== undefined) {
            moreComments = iterateComments(element.data.replies.data.children, id);
        }

        // Return link to Reddit if element is not a comment
        if (element.data.body === undefined) {
            return [aTag, ...moreComments];
        } else {
            return [pTag, ...moreComments];
        }
    });
};

// Function to remove repeated links back to Reddit from comments
function parseComments(arr, id) {
    const fatArr = iterateComments(arr, id);
    const parsedFatArr = JSON.parse(Util.stringify(fatArr));
    const slimArr = [];

    for (let i = 0; i < fatArr.length; i++) {          
        if (i === 0 || parsedFatArr[i].props.children.type === 'p' || parsedFatArr[i - 1].props.children.type !== 'a') {
            slimArr.push(fatArr[i]);
        };
    };

    return slimArr;
};

export default function CommentsList() {
    const comments = useSelector(selectViewPost).currApiData;
    const id = comments[0].data.children[0].data.id;

    return (
        <>
            {parseComments(comments[1].data.children, id)}
            {/*<div className={styles.line1}></div>*/}
        </>
    );
};