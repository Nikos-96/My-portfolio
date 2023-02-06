import React from 'react';
import { useState } from 'react';

const Search = ({ onInput, placeholder }) => {

    return (
        <>
            <input
                type='text'
                onInput={(e) => onInput(e)}
                placeholder='Search...'
            />
        </>
    );
};

export default Search;