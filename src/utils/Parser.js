const Parser = {
    flatten(arr) {
        return arr.flatMap((element) => {
            let moreComments = [];
            
            // If current element has a child comment call flatten recursively
            if (element?.data?.replies?.data?.children !== undefined) {
                moreComments = this.flatten(element.data.replies.data.children);
            }
    
            // Return recursive data and next comment if it exists
            return [element, ...moreComments];
        });
    }
}

export { Parser };