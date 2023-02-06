import React, { useState } from 'react';
import Categories from '../categories/Сategories';
import Comments from '../comments/Comments';
import ProjectList from '../project-list/ProjectList';

const Projects = () => {

    const [activeCategory, setActiveCategory] = useState(+sessionStorage.getItem('activeCategory') || 0);

    const updateCategory = (id) => {
        if (id !== 4) {
            sessionStorage.setItem('activeCategory', id);
            setActiveCategory(id);
        }
    }

    return (
        <>
            <Categories
                activeCategory={activeCategory}
                updateCategory={updateCategory}
            />
            <ProjectList
                activeCategory={activeCategory}
                key={activeCategory}
            />
            {/* {activeCategory === 4
                ? <Comments />
                : <ProjectList
                    activeCategory={activeCategory}
                    key={activeCategory}
                />
            } */}
        </>
    );
};

export default Projects;