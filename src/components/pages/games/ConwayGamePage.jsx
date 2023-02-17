import React, { useEffect } from 'react';
import ConwayGame from '../../conway-game-of-life/ConwayGame';
import { useGoogleAnalytics } from 'react-ga4-gtag';

const ConwayGamePage = () => {

    const gtag = useGoogleAnalytics();

    useEffect(() => {
        if (gtag !== null) {
            gtag('event', 'screen_view', {
                'app_name': 'My Portfolio',
                'screen_name': 'conway-game-of-life'
            });
        }
    }, [gtag]);

    return (
        <ConwayGame />
    );
};

export default ConwayGamePage;