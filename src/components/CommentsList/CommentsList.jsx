import React from "react";
import styles from "./CommentsList.module.css";
import smallComments from "../../api/Reddit/smallComments.json";


// temporary function for debugging, will be removed
function stringify(obj) {
    let cache = [];
    let str = JSON.stringify(obj, function(key, value) {
      if (typeof value === "object" && value !== null) {
        if (cache.indexOf(value) !== -1) {
          // Circular reference found, discard key
          return;
        }
        // Store value in our collection
        cache.push(value);
      }
      return value;
    });
    cache = null; // reset the cache
    return str;
}

// Recursive function to iterate through comment data and put them
// in the correct hierarchy for display
function iterateComments(arr) {
    return arr.flatMap((element) => {
        let moreComments = [];
        const aTag = (
            <div className={styles.commentDiv} key={element.data.id}>
                <a
                    href={'https://redd.it/' + '1abr3ky'}
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
            moreComments = iterateComments(element.data.replies.data.children);
        }

        // Return link to Reddit if element is not a comment
        if (element.data.body === undefined) {
            return [aTag, ...moreComments];
        } else {
            return [pTag, ...moreComments];
        }
    });
};

export default function CommentsList() {
    return (
        <>
            {iterateComments(smallComments[1].data.children)}
            {/*<div className={styles.line1}></div>*/}
        </>
    );
};