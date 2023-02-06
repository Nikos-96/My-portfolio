import React, { useEffect } from 'react';
import styles from './Food.module.css';
import { useState } from 'react';

const getTimeRemaining = (endtime) => {
    const t = Date.parse(endtime) - Date.parse(new Date());
    const days = Math.floor(t / (1000 * 60 * 60 * 24))
    const hours = Math.floor((t / (1000 * 60 * 60) % 24));
    const minutes = Math.floor((t / 1000 / 60) % 60);
    const seconds = Math.floor((t / 1000) % 60);

    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    }
}

const CountdownTimer = ({ deadline }) => {

    const [timeLeft, setTimeLeft] = useState(getTimeRemaining(deadline));

    useEffect(() => {
        if (timeLeft.total > 0) {
            setTimeout(() => {
                setTimeLeft(getTimeRemaining(deadline))
            }, 1000);
        }
    })

    return (
        <div className={`${styles['promotion__timer']}`}>
            <div className={`${styles['title']}`}>Осталось до конца акции:</div>
            <div className={`${styles['timer']}`}>
                <div className={`${styles['timer__block']}`}>
                    <span id="days">
                        {(timeLeft.days > 0 && timeLeft.days < 10) && '0'}
                        {timeLeft.days}
                    </span>
                    дней
                </div>
                <div className={`${styles['timer__block']}`}>
                    <span id="hours">
                        {(timeLeft.hours > 0 && timeLeft.hours < 10) && '0'}
                        {timeLeft.hours}
                    </span>
                    часов
                </div>
                <div className={`${styles['timer__block']}`}>
                    <span id="minutes">
                        {(timeLeft.minutes > 0 && timeLeft.minutes < 10) && '0'}
                        {timeLeft.minutes}
                    </span>
                    минут
                </div>
                <div className={`${styles['timer__block']}`}>
                    <span id="seconds">
                        {(timeLeft.seconds > 0 && timeLeft.seconds < 10) && '0'}
                        {timeLeft.seconds}
                    </span>
                    секунд
                </div>
            </div>
        </div>
    );
};

export default CountdownTimer;