import React, { useEffect, useState } from 'react';
import { findNextState } from '../../utils/functions';
import styles from './ConMenu.module.css';
import { BsQuestionCircle } from 'react-icons/bs'

const ConMenu = ({ cells, updateState, initialData, toggleModal }) => {

    const [autoPlay, setAutoPlay] = useState(false);
    const [rangeValue, setRangeValue] = useState(5);

    useEffect(() => {
        let intervalId;
        if (autoPlay) {
            intervalId = setTimeout(() => {
                const newState = findNextState(cells);
                updateState(newState);
            }, 800 * ((1 + (10 - rangeValue)) / 10));
        } else {
            clearTimeout(intervalId);
        }
        return () => clearTimeout(intervalId);
    }, [cells, autoPlay, updateState, rangeValue])

    const onNextState = () => {
        const newState = findNextState(cells);
        updateState(newState);
    }

    const onStart = () => {
        if (!autoPlay) {
            onNextState();
        }
        setAutoPlay(prevState => !prevState);
    }

    const onReset = () => {
        setAutoPlay(false);
        const emptyState = cells.map((el) => el.map(() => ({ active: false })));
        updateState(emptyState);
    }

    const onRandom = () => {
        const randomState = cells.map(el => el.map(() => {
            return { active: Math.random() < 0.25 }
        }))
        updateState(randomState);
    }

    return (
        <div className={styles.menu}>
            <div className={styles.info}>
                <BsQuestionCircle size={30} onClick={() => toggleModal()} />
            </div>
            <button onClick={onStart} style={{ backgroundColor: autoPlay ? '#726767' : '' }}>
                {autoPlay ? 'Stop' : 'Start'}
            </button>
            <button onClick={onNextState}>
                Next
            </button>
            <button onClick={onReset}>
                Reset
            </button>
            {/* <button onClick={onRandom}>
                Random
            </button> */}
            <div className={styles.inputContainer}>
                <h3>Speed:</h3>
                <div className={styles.rangeContainer}>
                    <input type='range' min={1} max={10} defaultValue={5} onChange={(e) => setRangeValue(e.target.value)} />
                    {rangeValue}
                </div>
            </div>
            <div className='box' />
        </div>
    );
};

export default ConMenu;