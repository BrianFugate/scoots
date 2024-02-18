import { createSlice } from "@reduxjs/toolkit";
import post from "../../api/Reddit/defaultPost.json"

const initialState = {
    posts: [post],
    after: ''
};

const postsSlice = createSlice ({
    name: 'posts',
    initialState: initialState,
    reducers: {
        refreshPosts(state, action) {
            return {...state, posts: [...action.payload]};
        },

        setAfter(state, action) {
            return {...state, after: action.payload};
        },

        resetInitialPost() {
            return initialState;
        },

        addPosts(state, action) {
            return {...state, posts: [...state.posts, ...action.payload]};
        }
    }
});

export const selectPosts = state => state.posts;
export const { refreshPosts, setAfter, resetInitialPost, addPosts } = postsSlice.actions;
export default postsSlice.reducer;