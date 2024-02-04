import React, {useState} from "react";
import styles from "./Search.module.css";
import Category from "../Category/Category.jsx";
import { useDispatch, useSelector } from "react-redux";
import { changeText, clearText, selectSearch } from "./searchSlice.js";


function SearchBar() {
    const searchText = useSelector(selectSearch).searchText;
    const dispatch = useDispatch();

    return (
        <div className={styles.outerDiv}>
            <form className={styles.form}>
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