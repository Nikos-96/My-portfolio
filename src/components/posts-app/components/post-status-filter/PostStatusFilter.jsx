import React from 'react';
import './PostStatusFilter.css';

const PostStatusFilter = ({ filter, setFilter }) => {

    const buttons = [
        { name: 'all', label: 'All' },
        { name: 'like', label: 'Liked' },
    ]

    const btns = buttons.map(btn => {
        const active = btn.name === filter;
        const activeClass = active ? 'active' : '';
        return (
            <button
                key={btn.name}
                type='button'
                className={`btn ${activeClass}`}
                onClick={() => setFilter(btn.name)}
            >{btn.label}
            </button>
        )
    })

    return (
        <div>
            {btns}
        </div>
    );
};

export default PostStatusFilter;