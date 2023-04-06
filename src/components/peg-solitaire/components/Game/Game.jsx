import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { createLog, initCells } from './../../utils/functions';
import Menu from './../menu/Menu';
import Board from '../board/Board';
import './Game.css';
import LogPanel from './../logPanel/LogPanel';
import Timer from './../timer/Timer';
import { useMemo } from 'react';

const Game = () => {

    const allCells = initCells();
    const logsEndRef = useRef();
    const [cells, setCells] = useState(allCells);
    const [gameResult, setGameResult] = useState('');
    const [movesLog, setMovesLog] = useState([]);
    const [moves, setMoves] = useState([]);
    const [gameStarted, setGameStarted] = useState(null);
    const [showLogSide, setShowLogSide] = useState(false);
    const logRef = useRef();

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        document.body.style.overscrollBehaviorX = 'none';
        return () => document.body.removeAttribute('style');
    }, [])

    const updateCells = (newState) => {
        setCells(() => newState);
        setMoves((prevState) => [...prevState, newState]);
    }

    const updateGameResult = (result) => {
        setGameResult(() => result);
    }

    const updateLog = (newMove) => {
        setMovesLog(prevState => {
            if (newMove.length === 0) {
                return [];
            }
            return typeof (newMove) === 'string'
                ? [...prevState, newMove]
                : [...prevState, createLog(cells, newMove)]
        });
    }

    const updateMoves = () => {
        if (moves.length > 1 && gameStarted) {
            setCells(() => {
                return moves[moves.length - 2];
            })
            setMoves(prevState => {
                const newMoves = prevState.slice(0, prevState.length - 1);
                return newMoves;
            })
            setMovesLog(prevState => prevState.slice(0, prevState.length - 1));
        }
    }

    const updateGameStarted = (value) => {
        setGameStarted(() => {
            return value;
        });
    }

    const onReset = () => {
        setCells(() => allCells);
        setMovesLog(() => []);
        setMoves(() => []);
        setGameStarted(() => null);
    }

    const scrollToLastLog = () => {
        if (logsEndRef.current) {
            logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }

    const toggleLog = () => {
        if (!showLogSide) {
            setShowLogSide(true)
        } else {
            logRef.current.style.animation = 'logSideClose 0.5s';
            setTimeout(() => {
                setShowLogSide(false)
            }, 500);
        }
    }

    useEffect(() => {
        if (movesLog.length > 0) {
            scrollToLastLog();
        }
    }, [movesLog])

    const infoText = useMemo(() => {
        return (
            <>
                <h2>Peg solitaire</h2>
                <br />
                Click on peg (orange square) to choose it. Then click on an empty cell jumping over another peg. The peg that has been jumped over will be removed. The goal is to remove all pegs except one in the middle.
                Read more here: <a href='https://en.wikipedia.org/wiki/Peg_solitaire' target='_blank' rel='noopener noreferrer'>Link</a>
            </>
        )
    }, [])

    return (
        <>
            <div className='game'>
                {showLogSide &&
                    <div className='modal-bg' onClick={() => toggleLog()} />
                }
                <Timer
                    gameStarted={gameStarted}
                    toggleLog={toggleLog}
                    allCells={allCells}
                    updateCells={updateCells}
                    updateLog={updateLog}
                    updateMoves={updateMoves}
                    onReset={onReset}
                    updateGameStarted={updateGameStarted}
                    moves={moves}
                    infoText={infoText}
                />
                <div className='game-conainer'>
                    <div className='menu-container'>
                        <Menu
                            allCells={allCells}
                            updateCells={updateCells}
                            updateLog={updateLog}
                            updateMoves={updateMoves}
                            onReset={onReset}
                            gameStarted={gameStarted}
                            updateGameStarted={updateGameStarted}
                            moves={moves}
                            infoText={infoText}
                        />
                    </div>
                    <Board
                        cells={cells}
                        gameResult={gameResult}
                        updateCells={updateCells}
                        updateLog={updateLog}
                        updateGameResult={updateGameResult}
                        updateGameStarted={updateGameStarted}
                        gameStarted={gameStarted}
                        showLogSide={showLogSide}
                        logRef={logRef}
                        logsEndRef={logsEndRef}
                        movesLog={movesLog}
                    />
                    <LogPanel
                        logsEndRef={logsEndRef}
                        movesLog={movesLog}
                    />
                </div>
            </div>
        </>
    );
};

export default Game;