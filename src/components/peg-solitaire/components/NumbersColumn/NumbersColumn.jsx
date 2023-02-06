import React from 'react';
import './NumbersColumn.css';

const NumbersColumn = () => {
    return (
        <div className='numbers-container'>
            <div className='numbers'>
                <div className='numbers__cell'>7</div>
                <div className='numbers__cell'>6</div>
                <div className='numbers__cell'>5</div>
                <div className='numbers__cell'>4</div>
                <div className='numbers__cell'>3</div>
                <div className='numbers__cell'>2</div>
                <div className='numbers__cell'>1</div>
            </div>
        </div>
    );
};

export default NumbersColumn;