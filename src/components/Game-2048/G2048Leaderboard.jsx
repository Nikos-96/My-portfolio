import React from 'react';
import { AiFillTrophy } from 'react-icons/ai'

const G2048Leaderboard = ({ leaderboardData }) => {
    return (
        <div className='leaderboard'>
            <h2>Leaderboard</h2>
            <ul className='leaderboard-list'>
                {leaderboardData.map((el, i) => (
                    <li key={el.id}>
                        <div className='leaderboard-item'>
                            <div className='leaderboard-name'>
                                {i + 1}.
                                {' '}
                                {el.name}
                            </div>
                            <div className='leaderboard-score'>{el.score}</div>
                            <div className='leaderboard-icon'>
                                {(i === 0 || i === 1 || i === 2) &&
                                    <AiFillTrophy
                                        size={20}
                                        color={
                                            (i === 0 && 'gold') ||
                                            (i === 1 && 'silver') ||
                                            (i === 2 && '#CD7F32')
                                        }
                                    />
                                }
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default G2048Leaderboard;