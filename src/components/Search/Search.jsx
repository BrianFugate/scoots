import React from "react";
import styles from "./Search.module.css";
import Category from "../Category/Category.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeText, selectSearch, toggleSubmit } from "./searchSlice.js";
import { setActive } from "../Category/categorySlice.js";


function SearchBar() {
    const searchText = useSelector(selectSearch).searchText;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        dispatch(setActive('search'));
        dispatch(toggleSubmit());
        navigate('/');
    };

    return (
        <div className={styles.outerDiv}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input type='text' 
                    name='search' 
                    placeholder='Search' 
                    value={searchText} 
                    className={styles.searchBox}
                    onChange={(event) => dispatch(changeText(event.target.value))} />
            </form>
            <Category /> 
        </div>
    );
};

export default SearchBar;