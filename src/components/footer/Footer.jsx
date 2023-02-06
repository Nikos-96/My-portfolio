import React from 'react';
import './Footer.css';
import { AiFillGithub } from 'react-icons/ai';
import { BsTelegram } from 'react-icons/bs';

const Footer = () => {
    return (
        <div className='footer'>
            <a
                className='footer-link'
                href='https://github.com/Nikos-96/My-portfolio'
                target='_blank'
                rel='noreferrer'
            >
                <AiFillGithub size={50} color='white' />
                GitHub
            </a>
            <a
                className='footer-link'
                href='https://telegram.me/Nikos_96'
                target='_blank'
                rel='noreferrer'
            >
                <BsTelegram size={50} color='white' />
                Telegram
            </a>
        </div>
    );
};

export default Footer;