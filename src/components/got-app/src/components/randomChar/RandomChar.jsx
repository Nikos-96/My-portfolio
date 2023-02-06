import React, { useEffect, useState } from 'react';
import GotService from './../../services/GotService';
import Spinner from './../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import RandomCharContent from './RandomCharContent';
import PropTypes from 'prop-types';
import './randomChar.css';

const RandomChar = ({ interval = 2000 }) => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [char, setChar] = useState({});

    const onError = (err) => {
        setLoading(false);
        setError(true);
    }

    useEffect(() => {
        const gotSerivce = new GotService();

        const updateChar = () => {
            const id = Math.floor(Math.random() * (140 - 25 + 1)) + 25;
            gotSerivce.getCharacter(id)
                .then(char => {
                    setChar(char);
                    setLoading(false);
                })
                .catch(onError)
        }

        updateChar();
        const timerId = setInterval(() => {
            updateChar();
        }, interval);

        return () => {
            setLoading(true);
            clearInterval(timerId);
        }
    }, [interval])

    const content = loading
        ? <Spinner />
        : <RandomCharContent
            char={char}
        />
    return (
        <div className='random-block'>
            {error ? <ErrorMessage /> : content}
        </div>


    );
};

RandomChar.propTypes = {
    interval: PropTypes.number
}

export default RandomChar;