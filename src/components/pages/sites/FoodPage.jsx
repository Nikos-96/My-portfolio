import React, { useEffect } from 'react';
import Food from '../../food/Food';
import { useGoogleAnalytics } from 'react-ga4-gtag';

const FoodPage = () => {

    // const gtag = useGoogleAnalytics();

    // useEffect(() => {
    //     if (gtag !== null) {
    //         gtag('event', 'screen_view', {
    //             'app_name': 'My Portfolio',
    //             'screen_name': 'food'
    //         });
    //     }
    // }, [gtag]);

    return (
        <Food />
    );
};

export default FoodPage;