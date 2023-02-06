import React from 'react';
import CategoriesItem from '../categories-item/СategoriesItem';
import './Сategories.css';

const Сategories = ({ updateCategory, activeCategory }) => {

    const data = ['Games', 'Fake DB pages', 'Landings', 'Other features', 'Comments'];

    return (
        <ul className='categories'>
            {
                data.map((el, id) => {
                    return (
                        <li key={id}>
                            <CategoriesItem
                                title={el}
                                id={id}
                                updateCategory={updateCategory}
                                activeCategory={activeCategory}
                            />
                        </li>
                    )
                })
            }
        </ul>
    );
};

export default Сategories;