import React from 'react';
import './AppHeader.css';
import styled from 'styled-components';

const Header = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    h1 {
        font-size: 2.6rem;
        /* color: ${props => props.colored ? 'red' : 'black'};
        :hover {
            color: blue;
        } */
    }
    h2 {
        font-size: 1.4rem;
        color: grey;
    }
`;

const AppHeader = ({ liked, allPosts }) => {
    return (
        <Header>
            <h1>Posts</h1>
            <h2>{allPosts} total posts, liked {liked}</h2>
        </Header>
    );
};

export default AppHeader;