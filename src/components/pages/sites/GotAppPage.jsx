import React, { useEffect } from 'react';
import GotApp from '../../got-app/src/GotApp';
import { useGoogleAnalytics } from 'react-ga4-gtag';

const GotAppPage = () => {

    // const gtag = useGoogleAnalytics();

    // useEffect(() => {
    //     if (gtag !== null) {
    //         gtag('event', 'screen_view', {
    //             'app_name': 'My Portfolio',
    //             'screen_name': 'got-app'
    //         });
    //     }
    // }, [gtag]);

    return (
        <GotApp />
    );
};

export default GotAppPage;