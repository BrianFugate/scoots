import { createSlice } from "@reduxjs/toolkit";
import post from "../../api/Reddit/defaultPost.json";

const initialState = {
    post: post,
    comments: [],
    moreComments: [], 
    hasMore: false
}

const viewPostSlice = createSlice({
    name: 'viewPost',
    initialState: initialState,
    reducers: {
        setPost(state, action) {
            return {...state, post: action.payload};
        },

        setComments(state, action) {
            return {...state, comments: [...action.payload]};
        },

        addComments(state, action) {
            return {...state, comments: [...state.comments, ...action.payload]};
        },

        setMoreComments(state, action) {
            return {...state, moreComments: [...action.payload]};
        },

        trimMoreComments(state, action) {
            const trimmed = state.moreComments.toSpliced(0, action.payload);

            return {...state, moreComments: [...trimmed]};
        },

        setHasMore(state, action) {
            return {...state, hasMore: action.payload};
        }
    }
});

export const selectViewPost = state => state.viewPost;
export const { setPost, setComments, addComments, setMoreComments, trimMoreComments, setHasMore } = viewPostSlice.actions;
export default viewPostSlice.reducer;