import React from 'react';
import { useEffect } from 'react';
import './LogPanel.css';

const LogPanel = ({ movesLog, logsEndRef, style }) => {

    useEffect(() => {
        const scrollToLastLog = () => {
            if (logsEndRef.current) {
                logsEndRef.current.parentNode.parentNode.scrollTop = logsEndRef.current.offsetTop;
            }
        }
        scrollToLastLog();
    }, [logsEndRef])

    return (
        <div className='log-panel' style={{ ...style }}>
            <div style={{ textAlign: 'center' }}>Log</div>
            <ul>
                {
                    movesLog.map((el, i) => {
                        let color;
                        if (el === 'win') {
                            color = 'green';
                        } else if (el === 'lose') {
                            color = 'red';
                        } else {
                            color = 'white';
                        }
                        return (
                            <li
                                style={{ color: color }}
                                key={i}
                                ref={logsEndRef}>
                                {el === 'Game started!' || el === 'lose'
                                    ? el
                                    : `${i}. ${el}`
                                }
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
};

export default LogPanel;