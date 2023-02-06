import React from 'react';

const RandomCharContent = ({ char }) => {
    const { name, gender, born, died, culture } = char;
    return (
        <>
            <h4>Random Character: {name}</h4>
            <ul className="random-block__list">
                <li className="random-block__list-item">
                    <span className="term">Gender </span>
                    <span>{gender}</span>
                </li>
                <li className="random-block__list-item">
                    <span className="term">Born </span>
                    <span>{born}</span>
                </li>
                <li className="random-block__list-item">
                    <span className="term">Died </span>
                    <span>{died}</span>
                </li>
                <li className="random-block__list-item">
                    <span className="term">Culture </span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    );
};

export default RandomCharContent;