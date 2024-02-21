import React from 'react';
import { Link } from 'react-router-dom';
import './СategoriesItem.css';

const СategoriesItem = ({ title, id, commentsId, updateCategory, activeCategory }) => {

    return (
        id !== commentsId
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

export default СategoriesItem;