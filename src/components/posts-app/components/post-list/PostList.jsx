import React from 'react';
import './PostList.css';
import PostListItem from './../post-list-item/PostListItem';
import Spinner from '../../../peg-solitaire/components/spinner/Spinner';

const PostList = ({ onPostRemove, onToggleImportant, onToggleLiked, visiblePosts, loading }) => {

    const elements = visiblePosts.map(item => {
        return (
            <li key={item.id} className='list-group-item'>
                <PostListItem
                    like={item.like}
                    label={item.label}
                    important={item.important}
                    onDelete={() => onPostRemove(item)}
                    onToggleImportant={() => onToggleImportant(item.id)}
                    onToggleLiked={() => onToggleLiked(item.id)}
                />
            </li>
        )
    })

    if (loading) {
        return <Spinner />
    }

    return (
        <ul className='app-list'>
            {elements.length
                ? elements
                :
                <div style={{ textAlign: 'center' }}>
                    <h2>No posts found!</h2>
                </div>
            }
        </ul>
    );
};

export default PostList;