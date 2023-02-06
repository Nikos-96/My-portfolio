import React from 'react';
import './PostListItem.css';
import { BsTrash } from 'react-icons/bs'
import { BsSuitHeartFill } from 'react-icons/bs'
import { AiFillStar } from 'react-icons/ai'

const PostListItem = ({ label, important, like, onDelete, onToggleImportant, onToggleLiked }) => {

    let classNames = 'app-list-item';
    if (important) {
        classNames += ' important';
    }
    if (like) {
        classNames += ' like';
    }

    return (
        <div className={classNames}>
            <span
                className='app-list-item-label'
                onClick={onToggleLiked}
            >
                {label}
            </span>
            <div className='item-buttons'>
                <button
                    type='button'
                    className='btn-star btn-sm'
                    onClick={onToggleImportant}
                >
                    <AiFillStar />
                </button>
                <button
                    type='button'
                    className='btn-trash btn-sm'
                    onClick={onDelete}
                >
                    <BsTrash />
                </button>
                <div className='fa-heart'>
                    <BsSuitHeartFill />
                </div>
            </div>
        </div>
    );
};

export default PostListItem;