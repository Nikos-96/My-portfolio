import React from 'react';
import './PostItem.css';

const PostItem = ({ name, time, text }) => {

    const convertServerDateToLocal = (dateInput) => {
        const offset = 5.0;
        const serverDate = new Date(dateInput);
        const utc = serverDate.getTime() - (serverDate.getTimezoneOffset() * 60000);
        const clientDate = new Date(utc + (3600000 * offset));

        return clientDate.toLocaleString();
    }

    const localTime = convertServerDateToLocal(time)

    return (
        <li className='post-item'>
            <div className='post-item__top'>
                <span className='post-item__name'>
                    {name}
                </span>
                <span className='post-item__time'>
                    {localTime}
                </span>
            </div>
            <div className='post-item__text'>
                {text}
            </div>
        </li>
    );
};

export default PostItem;