import React from 'react';
import './LettersRow.css';

const LettersRow = () => {
    return (
        <div className='letters-container'>
            <div className='letters'>
                <div className='letters_cell'>A</div>
                <div className='letters_cell'>B</div>
                <div className='letters_cell'>C</div>
                <div className='letters_cell'>D</div>
                <div className='letters_cell'>E</div>
                <div className='letters_cell'>F</div>
                <div className='letters_cell'>G</div>
            </div>
        </div>
    );
};

export default LettersRow;