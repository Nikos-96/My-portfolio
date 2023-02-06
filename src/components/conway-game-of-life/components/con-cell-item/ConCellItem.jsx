import React from 'react';
import styles from './ConCellItem.module.css';

const ConCellItem = ({ updateCells, r, c, active }) => {
    return (
        <div
            className={active ? `${styles.active} ${styles.cell}` : `${styles.cell}`}
            onClick={() => updateCells(r, c)}
        />
    );
};

export default ConCellItem;