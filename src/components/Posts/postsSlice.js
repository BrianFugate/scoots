import { createSlice } from "@reduxjs/toolkit";
import postData from "../../api/Reddit/best.json";

const initialState = {
    apiData: postData
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