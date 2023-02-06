import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import './Comments.css';
import PostInput from './postInput/PostInput';
import PostItem from './postItem/PostItem';
import { getComments } from './utils/commentService';

const Comments = () => {

    const [comments, setComments] = useState([]);
    const postContainerRef = useRef();

    const loadNewComments = () => {
        getComments().then(data => setComments(data)).catch(err => console.log(err));
    }

    useEffect(() => {
        loadNewComments();
    }, [])

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => document.body.removeAttribute('style');
    }, [])

    useEffect(() => {
        postContainerRef.current.scrollTo({ top: postContainerRef.current.scrollHeight, behavior: 'smooth' });
    }, [comments])

    return (
        <div className='comments'>
            <ul className='postsContainer' ref={postContainerRef}>
                {comments.map(comment => (
                    <PostItem
                        key={comment.id}
                        text={comment.text}
                        name={comment.name}
                        time={comment.time}
                    />
                ))}
            </ul>
            <PostInput
                loadNewComments={loadNewComments}
            />
        </div>
    );
};

export default Comments;