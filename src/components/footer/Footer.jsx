import React, { useEffect, useState } from 'react';
import './Footer.css';
import { AiFillGithub } from 'react-icons/ai';
import { BsTelegram } from 'react-icons/bs';

const Footer = () => {

    const [iconSize, setIconSize] = useState(50);

    // useEffect(() => {

    //     setIconSize(document.body.clientWidth <= 450 ? 40 : 50);
    //     window.addEventListener()
    // }, [])

    return (
        <div className='footer'>
            <a
                className='footer-link'
                href='https://github.com/Nikos-96/My-portfolio'
                target='_blank'
                rel='noreferrer'
            >
                <AiFillGithub className='footer-icon' color='white' />
                GitHub
            </a>
            <a
                className='footer-link'
                href='https://telegram.me/Nikos_96'
                target='_blank'
                rel='noreferrer'
            >
                <BsTelegram className='footer-icon' color='white' />
                Telegram
            </a>
        </div>
    );
};

export default Footer;