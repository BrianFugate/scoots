import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchText: ''
};

const searchSlice = createSlice({
    name: 'search',
    initialState: initialState,
    reducers: {
        changeText(state, action) {
            return {...state, searchText: action.payload};
        },
        clearText(state) {
            return {...state, searchText: ''};
        }
    }
});

export const selectSearch = state => state.search;
export const { changeText, clearText } = searchSlice.actions;
export default searchSlice.reducer;