import React, { useEffect } from 'react';
import Comments from '../../comments/Comments';
import { useGoogleAnalytics } from 'react-ga4-gtag';

const CommentsPage = () => {

    // const gtag = useGoogleAnalytics();

    // useEffect(() => {
    //     if (gtag !== null) {
    //         gtag('event', 'screen_view', {
    //             'app_name': 'My Portfolio',
    //             'screen_name': 'comments'
    //         });
    //     }
    // }, [gtag]);

    return (
        <Comments />
    );
};

export default CommentsPage;