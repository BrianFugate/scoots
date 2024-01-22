import React, {useState} from "react";
import styles from "./SearchBar.module.css";
import CategoryBar from "../CategoryBar/CategoryBar";


function SearchBar() {
    const [searchText, setSearchText] = useState('');

    return (
        <div className={styles.outerDiv}>
            <form className={styles.form}>
                <input type='text' 
                    name='search' 
                    placeholder='Search' 
                    value={searchText} 
                    className={styles.searchBox}
                    onChange={(event) => setSearchText(event.target.value)} />
            </form>
            <CategoryBar /> 
        </div>
    );
};

export default SearchBar;