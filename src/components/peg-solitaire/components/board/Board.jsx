import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { checkJumps } from '../../utils/functions';
import CellsItem from '../cellsItem/CellsItem';
import LettersRow from '../lettersRow/LettersRow';
import LogPanel from '../logPanel/LogPanel';
import NumbersColumn from '../NumbersColumn/NumbersColumn';
import './Board.css';

const Board = ({ cells, updateCells, updateLog, updateGameStarted, gameStarted, showLogSide, logRef, logsEndRef, movesLog }) => {

    const [pieceSelected, setPieceSelected] = useState(false);
    // const logRef = useRef(null);

    useEffect(() => {
        if (gameStarted) {
            const piecesLeft = cells.filter(el => el.isFree === false);
            if (piecesLeft.length === 1 && piecesLeft[0].id === 24) {
                updateLog('win')
                updateGameStarted(false);
            } else if (cells.every(el => checkJumps(cells, el.id).length === 0)) {
                updateLog('lose');
                updateGameStarted(false);
            }
        }
    }, [cells, updateLog, updateGameStarted, gameStarted])

    const handleClick = (id) => {
        if (!cells[id].isFree) {
            setPieceSelected(() => id);
        }
        if (pieceSelected === id) {
            setPieceSelected(() => false);
        }
        if (pieceSelected) {
            const possibleMoves = checkJumps(cells, pieceSelected);
            const currentMove = possibleMoves.filter(el => el.to === id)[0];
            if (currentMove) {
                const newState = cells.map(el => {
                    switch (el.id) {
                        case currentMove.from:
                            return { ...el, isFree: true };
                        case currentMove.to:
                            return { ...el, isFree: false };
                        case currentMove.toRemove:
                            return { ...el, isFree: true };
                        default:
                            return el;
                    }
                })
                updateCells(newState);
                updateLog(currentMove);
                setPieceSelected(() => false);
            }
        }
    };

    const splitArr = (arr, size) => {
        const res = [];
        for (let i = 0; i < arr.length; i += size) {
            const piece = arr.slice(i, i + size);
            res.push(piece);
        }
        return res;
    }

    return (
        <div className='board'>
            <NumbersColumn />
            <ul className='cells'>
                {splitArr(cells, 7).map((el, i) => {
                    return (
                        <div className='row' key={i}>
                            {el.map(item => {
                                if (item.invalidPosition) {
                                    return <li key={item.id} className='empty-block' />;
                                }
                                return (
                                    <CellsItem
                                        key={item.id + 100}
                                        handleClick={handleClick}
                                        cell={item}
                                        pieceSelected={pieceSelected}
                                    />
                                );
                            })}
                        </div>
                    )
                })}
            </ul>
            <LettersRow />
            {showLogSide &&
                <div className='log-side' ref={logRef}>
                    <LogPanel
                        logsEndRef={logsEndRef}
                        movesLog={movesLog}
                        style={{ display: 'block', margin: 0, maxHeight: '100%', border: 'none' }}
                    />
                </div>
            }
        </div>
    );
};

export default Board;


