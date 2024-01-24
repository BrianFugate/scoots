import React from "react";
import "./Explore.css";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import PostsList from "../../components/PostsList/PostsList.jsx";

export default function Explore() {
    return (
        <div className='exploreDiv'>
            <div className='searchBar' >
                <SearchBar />
            </div>
            <div className='postsListOuterDiv'>
                <h1 className='searchTerm'>Search Term</h1>
                <PostsList />
            </div>
        </div>
    );cd 
};