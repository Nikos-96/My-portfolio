import React, { useEffect } from 'react';
import Landing1 from '../../landing1/Landing1';
import { useGoogleAnalytics } from 'react-ga4-gtag';

const Landing1Page = () => {

    // const gtag = useGoogleAnalytics();

    // useEffect(() => {
    //     if (gtag !== null) {
    //         gtag('event', 'screen_view', {
    //             'app_name': 'My Portfolio',
    //             'screen_name': 'vpn'
    //         });
    //     }
    // }, [gtag]);

    return (
        <Landing1 />
    );
};

export default Landing1Page;