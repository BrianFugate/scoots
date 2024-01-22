import React, { useState } from "react";
import styles from "./CategoryBar.module.css";
import underline from "../../assets/underline.png";

const categories = ['Home', 'Popular', 'Gaming', 'Sports', 'Business'];
const selected = {fontWeight: 'bold', letterSpacing: 'normal', backgroundImage: `url(${underline})`};
const unselected = {fontWeight: 'normal', letterSpacing: '0.05em', backgroundImage: 'none'};

export default function CategoryBar() {
    const [activeCategory, setActiveCategory] = useState('Home');

    return (
        <div className={styles.outerDiv}>
            {categories.map((category) => { return (
                <button key={category}
                    onClick={() => setActiveCategory(category)} 
                    style={category === activeCategory ? {...selected} : {...unselected}}
                    className={styles.button}>
                        {category}
                </button>                
            )})}
        </div>
    );
};