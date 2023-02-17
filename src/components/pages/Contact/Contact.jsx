import React, { useEffect } from 'react';
import './Contact.css'
import { useGoogleAnalytics } from 'react-ga4-gtag';

const Contact = () => {

    // useEffect(() => {
    //     const updateHight = () => {
    //         let vh = window.innerHeight * 0.01;
    //         document.documentElement.style.setProperty('--vh', `${vh}px`);
    //     }
    //     updateHight();
    //     window.addEventListener('resize', updateHight);
    //     return () => window.removeEventListener('resize', updateHight);
    // }, [])

    const gtag = useGoogleAnalytics();

    useEffect(() => {
        if (gtag !== null) {
            gtag('event', 'screen_view', {
                'app_name': 'My Portfolio',
                'screen_name': 'contact'
            });
        }
    }, [gtag]);

    return (
        <div className='contact-page'>
            <div className='container'>
                <p>
                    Hi, my name is Nikos. For the last few years I have been learning html, css, js, react and a little bit (very little) php and mysql by myself.
                </p>
                <p>
                    On this website I tried to show everything I've learned so far. As my portfolio. All the projects here were made by me from scratch. I took ideas and some templates from all over the Internet.
                </p>
                <p>
                    I don't know if I'll keep working on this website, but I will definitely continue to learn programming, because I like it.
                </p>
                <p>
                    If you have any questions or want to contact me, you can do it in telegram.
                </p>
                <br />
                Telegram: <a href="https://telegram.me/Nikos_96" target='_blank' rel='noreferrer'>@Nikos_96</a>
            </div>
        </div >
    );
};

export default Contact;