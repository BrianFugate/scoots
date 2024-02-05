import React from "react";
import styles from "./Category.module.css";
import underline from "../../assets/underline.png";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCategory, setActive } from "./categorySlice.js";


export default function CategoryBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const categories = useSelector(selectCategory).categories;
    const activeCategory = useSelector(selectCategory).activeCategory;
    const selected = {fontWeight: 'bold', letterSpacing: 'normal', backgroundImage: `url(${underline})`};
    const unselected = {fontWeight: 'normal', letterSpacing: '0.05em', backgroundImage: 'none'};

    function handleClick(category) {
        dispatch(setActive(category));
        navigate('/');
    };

    return (
        <div className={styles.outerDiv}>
            {categories.map((category) => { return (
                <button key={category}
                    onClick={() => handleClick(category)} 
                    style={category === activeCategory ? {...selected} : {...unselected}}
                    className={styles.button}>
                        {category}
                </button>                
            )})}
        </div>
    );
};