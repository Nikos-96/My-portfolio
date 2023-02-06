import React from 'react';
import './PostAddForm.css';
import { useState } from 'react';

const PostAddForm = ({ onAdd }) => {

    const [text, setText] = useState('');

    const onSubmit = (event) => {
        event.preventDefault();
        onAdd(text);
        setText('');
    }

    const onValueChange = (e) => {
        setText(e.target.value);
    }

    return (
        <form
            className='bottom-panel'
            onSubmit={onSubmit}>
            <input
                type='text'
                placeholder='Add a new post'
                className='form-control new-post-label'
                onChange={onValueChange}
                value={text}
            />
            <button
                type='submit'
                className='btn btn-outline-secondary'
            >Add</button>
        </form>
    );
};

export default PostAddForm;