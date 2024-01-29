import { createSlice } from "@reduxjs/toolkit";
import comments from "../../api/Reddit/comments.json"

const initialState = {
    prevApiData: {},
    currApiData: comments,
    nextApiData: {}
}

const viewPostSlice = createSlice({
    name: 'viewPost',
    initialState: initialState,
    reducers: {
        setPrevApiData(state, action) {
            return {prevApiData: action.payload};
        },

        setCurrApiData(state, action) {
            return {currApiData: action.payload};
        },

        setNextApiData(state, action) {
            return {nextApiData: action.payload};
        }
    }
});

export const selectViewPost = state => state.viewPost;
export const { setPrevApiData, setCurrApiData, setNextApiData } = viewPostSlice.actions;
export default viewPostSlice.reducer;