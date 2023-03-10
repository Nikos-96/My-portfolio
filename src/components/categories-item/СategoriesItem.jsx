import React from 'react';
import { Link } from 'react-router-dom';
import './–°ategoriesItem.css';

const –°ategoriesItem = ({ title, id, updateCategory, activeCategory }) => {
    return (
        id !== 4
            ?
            <button
                className={activeCategory === id ? 'category-btn c-btn__active' : 'category-btn'}
                onClick={() => updateCategory(id)}
            >{title}</button>
            :
            <Link to='/comments'>
                <button className='category-btn'>{title}</button>
            </Link>
    );
};

export default –°ategoriesItem;