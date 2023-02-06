import React from 'react';
import './SearchPanel.css';

const SearchPanel = ({ updateSearch }) => {

    const onUpdateSearch = (e) => {
        updateSearch(e.target.value)
    }

    return (
        <input
            className='form-control search-input'
            type='text'
            placeholder='Search...'
            onChange={onUpdateSearch}
        />
    );
};

export default SearchPanel;