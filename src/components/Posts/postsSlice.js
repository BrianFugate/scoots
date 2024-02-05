import { createSlice } from "@reduxjs/toolkit";
import post from "../../api/Reddit/defaultPost.json"

const initialState = {
    apiData: {data: {children: [post]}}
};

const postsSlice = createSlice ({
    name: 'posts',
    initialState: initialState,
    reducers: {
        refreshApiData(state, action) {
            return {...state, apiData: {...action.payload}};
        }, 

        resetInitialPost() {
            return initialState;
        }
    }
});

export const selectPosts = state => state.posts;
export const { refreshApiData, resetInitialPost } = postsSlice.actions;
export default postsSlice.reducer;