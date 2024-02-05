import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchText: '',
    submitToggle: true
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
        },

        toggleSubmit(state) {
            if (state.submitToggle) return {...state, submitToggle: false}
            else return {...state, submitToggle: true};
        }
    }
});

export const selectSearch = state => state.search;
export const { changeText, clearText, toggleSubmit } = searchSlice.actions;
export default searchSlice.reducer;