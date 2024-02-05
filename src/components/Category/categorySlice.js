import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories: ['Hot', 'New', 'Rising', 'Top', 'Arguable'],
    activeCategory: 'Hot'
};

const categorySlice = createSlice ({
    name: 'category',
    initialState: initialState,
    reducers: {
        setActive(state, action) {
            return {...state, activeCategory: action.payload};
        }
    }
});

export const selectCategory = state => state.category;
export const { setActive } = categorySlice.actions;
export default categorySlice.reducer;