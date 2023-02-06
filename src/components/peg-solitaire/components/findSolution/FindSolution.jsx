import React, { useState } from 'react';
import { findSolution } from '../../utils/functions';
import './FindSolution.css';
import Spinner from './../spinner/Spinner';
import Spoiler from '../spoiler/Spoiler';

const FindSolution = ({ allCells }) => {

    const [loading, setLoading] = useState(false);
    const [solution, setSolution] = useState(null);

    const handleClick = () => {
        setLoading(() => true);
        findSolution(allCells).then(res => {
            setSolution(() => res);
            setLoading(() => false);
        });
    }

    if (loading) {
        return <Spinner />
    }
    return (
        <>
            {solution
                ? <Spoiler text={solution} />
                : <button onClick={() => handleClick()}>Find solution</button>
            }
        </>
    );
};

export default FindSolution;