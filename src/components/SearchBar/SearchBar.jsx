import React, {useState} from "react";

import CategoryBar from "../CategoryBar/CategoryBar";


function SearchBar() {
    const [searchText, setSearchText] = useState('');

    return (
        <div>
            <form>
                <input type='text' name='search' placeholder='Search' value={searchText} onChange={(event) => setSearchText(event.target.value)} />
            </form>
            <div>
               <CategoryBar /> 
            </div>
        </div>
    );
};

export default SearchBar;