import React, { useEffect } from 'react';
import PostsApp from '../../posts-app/PostsApp';
import { useGoogleAnalytics } from 'react-ga4-gtag';

const PostsAppPage = () => {

    const gtag = useGoogleAnalytics();

    useEffect(() => {
        if (gtag !== null) {
            gtag('event', 'screen_view', {
                'app_name': 'My Portfolio',
                'screen_name': 'posts-app'
            });
        }
    }, [gtag]);

    return (
        <PostsApp />
    );
};

export default PostsAppPage;