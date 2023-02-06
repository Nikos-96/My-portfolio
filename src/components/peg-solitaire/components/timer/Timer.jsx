import React from 'react';
import { useRef } from 'react';
import { useState, useEffect } from 'react';
import { HiOutlineInformationCircle } from 'react-icons/hi';
import Menu from '../menu/Menu';
import './Timer.css';

const Timer = ({ gameStarted, toggleLog, infoText, ...rest }) => {

    const [timer, setTimer] = useState(0);
    const [showInfo, setShowInfo] = useState(false);
    const info = useRef();

    useEffect(() => {
        let intervalId = null;
        if (gameStarted) {
            intervalId = setInterval(() => {
                setTimer(prevState => prevState += 1);
            }, 1000);
        } else if (gameStarted === null) {
            clearInterval(intervalId);
            setTimer(() => 0);
        } else {
            clearInterval(intervalId);
        }
        return (() => clearInterval(intervalId));
    }, [gameStarted])

    const toggleInfo = () => {
        if (!showInfo) {
            setShowInfo(true)
        } else {
            info.current.style.animation = 'closeInfo 0.3s';
            setTimeout(() => {
                setShowInfo(false)
            }, 250);
        }
    }

    const h = Math.floor(timer / 3600);
    const m = Math.floor((timer / 60) % 60);
    const s = timer % 60 >= 60 ? '0' : timer % 60;
    return (
        <div className='timer'>
            <div className='menu-btns'>
                {/* <button>start</button>
                <button>back</button>
                <button>R</button> */}
                <Menu
                    minimized
                    {...rest}
                />
            </div>
            {
                gameStarted === null
                    ? <span>00:00:00</span>
                    : <span>{h < 10 ? '0' : ''}{h}:{m < 10 ? '0' : ''}{m}:{s < 10 ? '0' : ''}{s}</span>
            }
            <div className='log-btn'>
                <HiOutlineInformationCircle onClick={() => toggleInfo()} />
                <button onClick={() => toggleLog()}>Open log</button>
                {showInfo &&
                    <div className='info-modal' ref={info}>
                        {infoText}
                        {/* asdasd asdasd asdasd */}
                    </div>
                }
            </div>
            {showInfo &&
                <div className='bg' onClick={() => toggleInfo()} />
            }
        </div>
    );
};

export default Timer;