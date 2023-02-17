import React, { useEffect, useState } from 'react';
import { useGoogleAnalytics } from 'react-ga4-gtag';
import Categories from '../categories/Сategories';
import Comments from '../comments/Comments';
import ProjectList from '../project-list/ProjectList';

const Projects = () => {

    const gtag = useGoogleAnalytics();

    useEffect(() => {
        if (gtag !== null) {
            gtag('event', 'screen_view', {
                'app_name': 'My Portfolio',
                'screen_name': 'Home'
            });
        }
    }, [gtag]);

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