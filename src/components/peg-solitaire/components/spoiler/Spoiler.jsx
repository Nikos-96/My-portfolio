import React from 'react';
import './Spoiler.css';

const Spoiler = ({ text }) => {
    return (
        <details>
            <summary>See the solution</summary>
            <ol className='spoiler-container'>
                {
                    text.map((el, i) => {
                        return <li key={i}>{el}</li>
                    })
                }
            </ol>
        </details>
    );
};

export default Spoiler;