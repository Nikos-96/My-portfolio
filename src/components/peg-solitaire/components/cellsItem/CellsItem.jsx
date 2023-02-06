import React from 'react';
import './CellsItem.css';

const CellsItem = ({ handleClick, pieceSelected, cell }) => {
    const { id, isFree } = cell;

    return (
        <li
            className={pieceSelected === id ? 'board-cell selected' : 'board-cell'}
            onClick={() => handleClick(id)}
        >
            {!isFree && <div className='piece'></div>}
        </li>
    );
};

export default CellsItem;