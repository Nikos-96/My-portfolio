import React, { useMemo, useState } from 'react';
import ConMenu from './components/con-menu/ConMenu';
import Field from './components/field/Field';
import { createCells } from './utils/functions';
import './ConwayGame.css';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useResizeDetector } from 'react-resize-detector';

const ConwayGame = () => {
    const initialData = useMemo(() => createCells(0, 0), []);
    const { width, height, ref } = useResizeDetector();
    const [cells, setCells] = useState(initialData);
    const [showDescModal, setShowDescModal] = useState(false);
    const modalRef = useRef();


    const updateCells = (r, c) => {
        const newState = [...cells];
        const item = newState[r][c];
        newState[r][c] = {
            ...item,
            active: !item.active
        }
        setCells(newState);
    }

    const updateState = (nextState) => {
        setCells(nextState);
    }

    const toggleModal = () => {
        if (!showDescModal) {
            setShowDescModal(true)
        } else {
            modalRef.current.style.animation = 'closeDescModal 0.3s';
            setTimeout(() => {
                setShowDescModal(false)
            }, 250);
        }
    }

    useEffect(() => {
        if (width && height) {
            const rows = Math.floor(height / 25);
            const columns = width < 1000 ? Math.floor(width / 20) : 50;
            const cells = createCells(rows, columns)
            setCells(cells);
        }
    }, [width, height])

    const descText = useMemo(() => {
        return (
            <>
                <h2>Conway's Game of Life</h2>
                <br />
                Each cell follows 4 rules:<br />
                1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.<br />
                2. Any live cell with two or three live neighbours lives on to the next generation.<br />
                3. Any live cell with more than three live neighbours dies, as if by overpopulation.<br />
                4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.<br />
                <br />
                Click on cell to make it live/dead.
                Read more here: {<a href='https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life' target='_blank' rel='noreferrer'>Link</a>}
            </>
        )
    }, [])

    return (
        <div className='conway-game' ref={ref}>
            {showDescModal &&
                <div className='bg' onClick={() => toggleModal()} />
            }
            {/* {showDescModal &&
                <div className='desc-modal' ref={modalRef}>
                    {descText}
                </div>
            } */}
            <div className='desc-container'>
                <div className='desc'>
                    {descText}
                </div>
            </div>
            <div className='container'>
                {showDescModal &&
                    <div className='desc-modal' ref={modalRef}>
                        {descText}
                    </div>
                }
                <Field
                    cells={cells}
                    updateCells={updateCells}
                />
                <ConMenu
                    toggleModal={toggleModal}
                    cells={cells}
                    updateState={updateState}
                    initialData={initialData}
                />
            </div>
            <div className='box' />
        </div>
    );
};

export default ConwayGame;