import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { postComment } from '../utils/commentService';
import './PostInput.css';

const PostInput = ({ loadNewComments }) => {

    const messageInput = useRef(null);
    const nameInput = useRef(null);

    useEffect(() => {
        nameInput.current.value = localStorage.getItem('name') || null;
    }, [])

    const sendMesage = () => {
        const text = messageInput.current.value;
        const name = nameInput.current.value.trim();
        if (name === '' || text === '' || text.trim() === '') {
            if (name === '') {
                nameInput.current.style.outline = '2px solid red';
            }
            if (text === '' || text.trim() === '') {
                messageInput.current.style.outline = '3px solid red';
            }
            setTimeout(() => {
                nameInput.current.removeAttribute('style');
                messageInput.current.removeAttribute('style');
            }, 300);
        } else {
            postComment(name, text)
                .then(() => loadNewComments())
                .catch(err => console.log(err));
            localStorage.setItem('name', name);
            messageInput.current.value = '';
        }


    }

    return (
        <div className='input-container'>
            <div className='post-input'>
                <textarea placeholder='Message...' ref={messageInput} />
            </div>
            <div className='send-container'>
                <input type='text' placeholder='Name...' ref={nameInput} />
                <button onClick={sendMesage}>Send</button>
            </div>
        </div>
    );
};

export default PostInput;