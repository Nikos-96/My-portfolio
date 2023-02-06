import React from 'react';
import ProjectListItem from '../project-list-item/ProjectListItem';
import './ProjectList.css';

const ProjectList = ({ activeCategory }) => {

    const data = [
        [
            {
                title: '2048 (real leaderboard!)',
                img: './img/2048.png',
                path: '/game2048'
            },
            {
                title: 'Peg solitaire',
                img: './img/peg-solitaire.png',
                path: '/peg-solitaire'
            },
            {
                title: 'Conway\'s Game of Life',
                img: './img/conway-game-of-life.png',
                path: '/conway-game-of-life'
            },
        ],
        [
            {
                title: 'GoT',
                img: './img/got-app.png',
                path: '/got-app'
            },
            {
                title: 'Posts',
                img: './img/posts.png',
                path: '/posts-app'
            },
        ],
        [
            {
                title: 'Food',
                img: './img/food.png',
                path: '/food'
            },
            {
                title: 'VPN',
                img: './img/vpn-landing.png',
                path: '/landing1'
            },
        ],
        [
            {
                title: 'Beautiful calculator',
                img: './img/calculator.png',
                path: '/calculator'
            }
        ],
    ]

    return (
        <ul className='project-list'>
            {data[activeCategory].map((el, id) => {
                return (
                    <li key={id}>
                        <ProjectListItem
                            title={el.title}
                            img={el.img}
                            path={el.path}
                        />
                    </li>
                )
            })}
        </ul>
    );
};

export default ProjectList;