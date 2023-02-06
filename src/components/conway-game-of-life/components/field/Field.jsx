import React from 'react';
import ConCellItem from '../con-cell-item/ConCellItem';
import styles from './Field.module.css';

const Field = ({ cells, updateCells }) => {

    return (
        <div className={styles.field}>
            {cells.map((el, rId) => (
                <div className={styles.row} key={rId}>
                    {el.map((item, cId) => (
                        <ConCellItem
                            key={rId + cId}
                            updateCells={updateCells}
                            r={rId}
                            c={cId}
                            active={item.active}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Field;
