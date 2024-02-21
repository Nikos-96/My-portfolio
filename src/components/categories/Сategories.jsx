import React from 'react';
import CategoriesItem from '../categories-item/СategoriesItem';
import './Сategories.css';

const Сategories = ({ updateCategory, activeCategory }) => {

    const data = ['Games', 'Hotel Project (New)', 'Test API Pages', 'Landings', 'Other features', 'Comments'];

    return (
        <ul className='categories'>
            {
                data.map((el, id) => {
                    return (
                        <li key={id}>
                            <CategoriesItem
                                title={el}
                                id={id}
                                commentsId={data.length - 1}
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