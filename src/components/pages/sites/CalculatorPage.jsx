import React, { useEffect } from 'react';
import Calculator from '../../calculator/Calculator';
import { useGoogleAnalytics } from 'react-ga4-gtag';

const CalculatorPage = () => {

    // const gtag = useGoogleAnalytics();

    // useEffect(() => {
    //     if (gtag !== null) {
    //         gtag('event', 'screen_view', {
    //             'app_name': 'My Portfolio',
    //             'screen_name': 'calculator'
    //         });
    //     }
    // }, [gtag]);

    return (
        <Calculator />
    );
};

export default CalculatorPage;