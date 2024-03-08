import React, { useEffect } from 'react';
import PegSolitaire from '../../peg-solitaire/PegSolitaire';
import { useGoogleAnalytics } from 'react-ga4-gtag';

const PegSolitairePage = () => {

    // const gtag = useGoogleAnalytics();

    // useEffect(() => {
    //     if (gtag !== null) {
    //         gtag('event', 'screen_view', {
    //             'app_name': 'My Portfolio',
    //             'screen_name': 'peg-solitaire'
    //         });
    //     }
    // }, [gtag]);

    return (
        <PegSolitaire />
    );
};

export default PegSolitairePage;