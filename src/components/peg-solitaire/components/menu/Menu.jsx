import React, { useState } from 'react';
import { useMemo } from 'react';
import { useEffect } from 'react';
import { TbArrowBackUp } from 'react-icons/tb';
import FindSolution from '../findSolution/FindSolution';
import styles from './Menu.module.css';
import { VscDebugRestart, VscDebugStart } from 'react-icons/vsc'
import { useCallback } from 'react';

const Menu = ({ allCells, updateCells, updateLog, updateMoves, onReset, gameStarted, updateGameStarted, moves, minimized, infoText }) => {

    const [disabled, setDisabled] = useState(false);
    const [moveBackDisabled, setMoveBackDisabled] = useState(true);

    const onStart = useCallback(() => {
        if (!disabled) {
            const newState = allCells.map((el) => {
                return el.id === 24 ? { ...el, isFree: true } : el;
            });
            updateCells(newState);
            updateLog('Game started!');
            // setDisabled(() => true);
            setDisabled(true);
            updateGameStarted(true);
        }
    }, [allCells, updateCells, updateGameStarted, updateLog, disabled])

    const handleReset = useCallback(() => {
        onReset();
        setDisabled(() => false);
    }, [onReset])

    const onMoveBack = useCallback(() => {
        updateMoves();
    }, [updateMoves])

    useEffect(() => {
        setMoveBackDisabled(() => {
            return !(moves.length > 1)
        })
    }, [moves])

    const element = useMemo(() => {
        if (minimized) {
            return (
                <>
                    <VscDebugStart
                        className={disabled ? 'disabled' : ''}
                        onClick={() => onStart()}
                    // disabled={disabled}
                    />
                    <TbArrowBackUp
                        // disabled={moveBackDisabled}
                        className={moveBackDisabled ? 'disabled' : ''}
                        onClick={() => onMoveBack()}
                    />
                    <VscDebugRestart
                        onClick={() => handleReset()}
                    />
                </>
            )
        } else {
            return (
                <>
                    <button
                        disabled={disabled}
                        onClick={() => onStart()}
                    >
                        Start game</button>
                    <button
                        disabled={moveBackDisabled}
                        onClick={() => updateMoves()}
                    >
                        <TbArrowBackUp size={27} />Move back</button>
                    <button
                        onClick={() => handleReset()}
                    >
                        Reset</button>
                    {/* <FindSolution
                allCells={allCells}
            /> */}
                    <div className={styles.desc}>
                        {infoText}
                    </div>
                </>
            )
        }
    }, [minimized, handleReset, disabled, infoText, moveBackDisabled, updateMoves, onStart, onMoveBack])

    return (
        <div className={styles.menu}>
            {element}
        </div>
    );
};

export default Menu;