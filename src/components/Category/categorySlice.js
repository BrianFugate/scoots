import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories: ['Best', 'Hot', 'New', 'Random', 'Rising', 'Top'],
    activeCategory: 'Best'
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