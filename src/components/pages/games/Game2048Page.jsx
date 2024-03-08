import React, { useEffect } from 'react';
import Game2048 from '../../Game-2048/Game2048';
import { useGoogleAnalytics } from 'react-ga4-gtag';

const Game2048Page = () => {

    // const gtag = useGoogleAnalytics();

    // useEffect(() => {
    //     if (gtag !== null) {
    //         gtag('event', 'screen_view', {
    //             'app_name': 'My Portfolio',
    //             'screen_name': 'game2048'
    //         });
    //     }
    // }, [gtag]);

    return (
        <Game2048 />
    );
};

export default Game2048Page;