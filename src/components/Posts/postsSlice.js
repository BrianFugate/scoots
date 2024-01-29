import { createSlice } from "@reduxjs/toolkit";
import Reddit from "../../api/Reddit/Reddit.js";

const initialState = {
    apiData: await Reddit.getPosts('/best')
};

const postsSlice = createSlice ({
    name: 'posts',
    initialState: initialState,
    reducers: {
        refreshApiData(state, action) {
            return {apiData: action.payload};
        }
    }
});

export const selectPosts = state => state.posts;
export const { refreshApiData } = postsSlice.actions;
export default postsSlice.reducer;