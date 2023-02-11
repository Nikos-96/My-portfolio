import React, { useCallback } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useMemo } from 'react';
import './Game2048.css';
import { addNumber, getDirection, getNewCells, isLost } from './utils/Game2048';
import { useResizeDetector } from 'react-resize-detector';
import { HiOutlineInformationCircle } from 'react-icons/hi'
import { AiFillTrophy } from 'react-icons/ai'
import { produce } from 'immer';
import { useSwipeable } from 'react-swipeable';
import { getData, postData } from './utils/Game2048Service';
import G2048Leaderboard from './G2048Leaderboard';

const Game2048 = () => {

    const initialCells = useMemo(() => {
        const columns = [...Array(4).keys()];
        const rows = [...Array(4).keys()];
        const cells = columns.map(() => {
            return rows.map(() => {
                return { number: '' }
            });
        })
        return cells;
    }, [])

    const colors = useMemo(() => {
        return {
            2: '#ffffff',
            4: '#dfc7a9',
            8: '#cba373',
            16: '#c78e48',
            32: '#ec7d0b',
            64: '#b85508',
            128: '#f98787',
            256: '#f25454',
            512: '#e71f1f',
            1024: '#7b0505',
            2048: '#ffe600',
        }
    }, []);

    const fontSize = useMemo(() => {
        return {
            1: 0.7,
            2: 0.7,
            3: 0.5,
            4: 0.4,
            5: 0.3,
            6: 0.25,
        }
    }, []);

    const [leaderboardData, setLeaderboardData] = useState([]);
    const [cells, setCells] = useState(initialCells);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(localStorage.getItem('bestScore') || 0);
    const [cellsOffset, setCellsOffset] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [showInfoModal, setShowInfoModal] = useState(false);
    const { width, ref } = useResizeDetector();
    const [userName, setUserName] = useState(localStorage.getItem('userName') || null);
    let myTimer = useRef(null);
    let nextCellsState = useRef(null);
    const inputRef = useRef(null);

    const loadNewData = () => {
        getData()
            .then(data => setLeaderboardData(data.sort((a, b) => b.score - a.score)))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        loadNewData();
    }, [])

    useEffect(() => {
        const lost = isLost(cells);
        if (lost) {
            setGameOver(true);
        }
    }, [cells])

    const moveCells = useCallback((newState) => {
        setCells(newState.cells);
        setScore(newState.score);
        localStorage.setItem('gameState', JSON.stringify({
            cells: newState.cells,
            score: newState.score
        }));
        if (newState.score >= bestScore) {
            setBestScore(newState.score);
            localStorage.setItem('bestScore', newState.score);
        }

    }, [bestScore])

    const onAnimationStart = useCallback((dir) => {
        const direction = dir;
        const validDirections = ['up', 'right', 'left', 'down'];
        if (validDirections.includes(direction)) {
            clearTimeout(myTimer.current);
            myTimer.current = null;
            setCellsOffset(null);
            if (nextCellsState.current) {
                moveCells(nextCellsState.current);
                const newState = getNewCells(direction, nextCellsState.current.cells, nextCellsState.current.score);
                if (newState === null) {
                    setGameOver(true);
                    return;
                }
                setTimeout(() => {
                    setCellsOffset({
                        arr: nextCellsState.current.cellsToMove,
                        direction: direction === 'up' || direction === 'down' ? 'Y' : 'X',
                        symbol: direction === 'down' || direction === 'right' ? '' : '-'
                    });
                }, 10);
                nextCellsState.current = newState;
                myTimer.current = setTimeout(() => {
                    moveCells(newState);
                    nextCellsState.current = null;
                    setCellsOffset(null);
                }, 90);
            } else {
                const newState = getNewCells(direction, cells, score);
                nextCellsState.current = newState;
                if (newState === null) {
                    setGameOver(true);
                    return;
                }
                setCellsOffset({
                    arr: newState.cellsToMove,
                    direction: direction === 'up' || direction === 'down' ? 'Y' : 'X',
                    symbol: direction === 'down' || direction === 'right' ? '' : '-'
                });
                myTimer.current = setTimeout(() => {
                    moveCells(newState);
                    nextCellsState.current = null;
                    setCellsOffset(null);
                }, 100);
            }


        }
    }, [cells, score, moveCells])

    const onGameStart = useCallback((e) => {
        localStorage.removeItem('gameState');
        if (e && e.type === 'click') {
            e.target.blur();
        }
        nextCellsState.current = null;
        setCells((prevState) => {
            let newState = prevState.map(el => el.map(() => ({ number: '' })));
            newState = addNumber(addNumber(newState));
            return newState;
        })
        setGameOver(false);
        setScore(0);
        // for test
        // const newState = produce(initialCells, cellsCopy => {
        //     cellsCopy[0][0].number = 2;
        //     cellsCopy[0][1].number = 16;
        //     cellsCopy[0][2].number = 64;
        //     cellsCopy[0][3].number = 128;
        //     cellsCopy[1][0].number = 256;
        //     cellsCopy[1][1].number = 512;
        //     cellsCopy[1][2].number = 1024;
        //     cellsCopy[1][3].number = 2048;
        //     cellsCopy[2][0].number = 99999;
        //     cellsCopy[2][1].number = 999999;
        // })
        // setCells(newState)
    }, [])

    const onKeyPressed = useCallback(e => {
        const direction = getDirection(e.code || e.dir);
        const validDirections = ['up', 'right', 'left', 'down'];
        if (validDirections.includes(direction) && document.activeElement !== inputRef.current) {
            onAnimationStart(direction)
        } else if ((e.code === 'Enter' || e.code === 'Space') && gameOver) {
            onGameStart(e);
        }
    }, [onAnimationStart, gameOver, onGameStart])

    useEffect(() => {
        window.addEventListener('keydown', onKeyPressed)
        return () => window.removeEventListener('keydown', onKeyPressed);
    }, [cells, onAnimationStart, onKeyPressed])

    useEffect(() => {
        const loadedGameState = JSON.parse(localStorage.getItem('gameState'));
        if (loadedGameState && loadedGameState.score > 0) {
            loadedGameState.cells.forEach(el => el.forEach(item => item.new = false));
            setCells(loadedGameState.cells);
            setScore(loadedGameState.score);
        } else {
            onGameStart();
        }
    }, [onGameStart])

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        document.body.style.overscrollBehaviorX = 'none';
        return () => document.body.removeAttribute('style');
    }, [])

    useEffect(() => {
        const updateHight = () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
            console.log('update hight')
        }
        window.addEventListener('resize', updateHight);
        return () => window.removeEventListener('resize', updateHight);
    }, [])

    const createAnimationStyle = useCallback((r, c, isNew) => {
        if (cellsOffset) {
            return {
                transform: `translate${cellsOffset.direction}(${cellsOffset.symbol}${cellsOffset.arr[r][c] * 100}px)`,
                transition: 'all 100ms ease-in-out'
            }
        } else {
            return { animationName: isNew ? 'newCellAdded' : '' }
        }
    }, [cellsOffset]);

    const infoModal = useRef(null);

    const toggleInfoModal = (modalContent) => {
        if (showInfoModal) {
            infoModal.current.style.animation = 'closeInfoModal 0.3s';
            setTimeout(() => {
                setShowInfoModal(false);
            }, 250);
        } else {
            setShowInfoModal(modalContent);
        }
    }

    const handlers = useSwipeable({
        onSwiped: (e) => onKeyPressed(e),
        preventScrollOnSwipe: true,
    });

    const handleNameSubmit = (e) => {
        e.preventDefault();
        const name = inputRef.current.value.trim();
        if (name !== '') {
            setUserName(name);
            localStorage.setItem('userName', name);
            inputRef.current.value = '';
        }
    }

    const changeName = () => {
        localStorage.removeItem('userName');
        setUserName(null);
    }

    useEffect(() => {
        if (bestScore > 0 && userName) {
            postData(userName, bestScore)
                .then(() => loadNewData())
                .catch(err => console.log(err))
        }
    }, [userName, bestScore])

    const elements = useMemo(() => {
        return cells.map((r, rI) => (
            <div className='row' key={rI}>
                {r.map((c, cI) => (
                    <div className='cell' key={cI}>
                        {c.number &&
                            <div
                                className='active-cell'
                                style={{
                                    ...createAnimationStyle(rI, cI, c.new),
                                    backgroundColor: c.number < 2048 ? colors[c.number] : colors[2048],
                                    color: c.number === 2 || c.number >= 2048 ? 'black' : 'white',
                                    fontSize: width ? (width / 4) * fontSize[String(c.number).length] : '20px'
                                }}
                            >
                                {c.number}
                            </div>
                        }
                    </div>
                ))}
            </div>
        ))
    }, [createAnimationStyle, cells, colors, fontSize, width]);

    return (
        <div className='Game2048'>
            {showInfoModal &&
                <div className='bg' onClick={() => toggleInfoModal()} />
            }
            <div className='container'>
                <div className='menu'>
                    <div className='login-container'>
                        {userName
                            ?
                            <>
                                <h2>{userName}</h2>
                                <button onClick={changeName} style={{ display: 'inline' }}>Change name</button>
                            </>
                            :
                            <>
                                <div className='text'>Enter your name to add to the leaderboard</div>
                                <form onSubmit={handleNameSubmit}>
                                    <input type='text' placeholder='Name...' ref={inputRef} />
                                    <button type='submit'>Ok</button>
                                </form>
                            </>
                        }
                    </div>
                    <button className='menu-button' onClick={onGameStart}>New Game</button>
                    <div>
                        <h3>Score: {score}</h3>
                        <h3>Best Score: {bestScore}</h3>
                    </div>
                    <div className='desc'>
                        Use WASD, arrow keys or swipes to move cells. Read more about this game
                        here: {<a href='https://en.wikipedia.org/wiki/2048_(video_game)' target='_blank' rel='noreferrer'>2048</a>}
                    </div>
                    <div className='info'>
                        <div onClick={() => toggleInfoModal('leaderboard')}>
                            <AiFillTrophy size={30} />
                        </div>
                        <div onClick={() => toggleInfoModal('info')}>
                            <HiOutlineInformationCircle size={30} />
                        </div>
                    </div>
                    {showInfoModal &&
                        <div className='info-modal' ref={infoModal}>
                            {showInfoModal === 'leaderboard' &&
                                <G2048Leaderboard leaderboardData={leaderboardData} />
                            }
                            {showInfoModal === 'info' &&
                                <>
                                    <div className='info-modal__header'>
                                        <h3>Info:</h3>
                                    </div>
                                    Use WASD, arrow keys or swipes to move cells. Read more about this game
                                    here: {<a href='https://en.wikipedia.org/wiki/2048_(video_game)' target='_blank' rel='noreferrer'>2048</a>}
                                </>
                            }
                        </div>
                    }
                </div>
                <div className='field' ref={ref}>
                    <div {...handlers}>
                        {gameOver &&
                            <div className='game-over' style={{ fontSize: width ? width / 7 : '3rem' }}>
                                Game Over!
                                <button onClick={onGameStart}>New Game</button>
                            </div>
                        }
                        {elements}
                    </div>
                </div>
                <div className='leaderboard-container'>
                    <G2048Leaderboard
                        leaderboardData={leaderboardData}
                    />
                </div>
                <div className='app-links'>
                    <a href='https://play.google.com/store/apps/details?id=com.mYgame2048.app&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'
                        target='_blank'
                        rel='noreferrer'
                    >
                        <img
                            alt='Get it on Google Play'
                            src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'
                        />
                    </a>
                    <img src='./img/2048-qr.jpeg' className='qr-link' alt='app-qr' />
                </div>
            </div>

        </div>
    );
};

export default Game2048;