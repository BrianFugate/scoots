import React, { useState } from "react";
import underline from "../../assets/underline.png";

const categories = ['Home', 'Popular', 'Gaming', 'Sports', 'Business'];

export default function CategoryBar() {
    const [activeCategory, setActiveCategory] = useState('Home');

    return (
        <div>
            {categories.map((category) => { return (
                <div key={category}>
                    <button onClick={() => setActiveCategory(category)} style={category === activeCategory ? {fontWeight: 'bold'} : {fontWeight: 'normal'}}>{category}</button>
                    <img src={underline} alt='underline' hidden={category !== activeCategory ? true : false}/>
                </div>
            )})}
        </div>
    );
};