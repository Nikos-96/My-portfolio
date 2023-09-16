import React from 'react';
import './ProjectListItem.css';
import { Link } from 'react-router-dom';

const ProjectListItem = ({ title, img, path }) => {

    return (
        <Link to={path} target={path.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
            <div className='card'>
                <div className='title'>{title}</div>
                <img src={img} alt="project" />
            </div>
        </Link>
    );
};

export default ProjectListItem;