import { configureStore } from "@reduxjs/toolkit";

import searchReducer from "./components/Search/searchSlice.js";
import categoryReducer from "./components/Category/categorySlice.js";
import postsReducer from "./components/Posts/postsSlice.js";
import viewPostReducer from "./pages/ViewPost/viewPostSlice.js";

export default configureStore({
    reducer: {
        search: searchReducer,
        category: categoryReducer,
        posts: postsReducer,
        viewPost: viewPostReducer
    }
});
