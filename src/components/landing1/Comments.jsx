import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { AiFillStar, AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

const Comments = () => {

    const [activeDot, setActiveDot] = useState(0);
    let translate = useRef(0);
    const slider = useRef(null);

    const cards = [
        {
            name: 'Viezh Robert',
            land: 'Warsaw, Poland',
            commentText: `“Wow... I am very happy to use this VPN, it turned out to be more than my expectations and so
            far there have been no problems. LaslesVPN always the best.”`,
            img: './img/Ellipse 175.png',
        },
        {
            name: 'Yessica Christy',
            land: 'Shanxi, China',
            commentText: `“I like it because I like to travel far and still can connect with high speed.”`,
            img: './img/Ellipse 175-1.png',
        },
        {
            name: 'Kim Young Jou',
            land: 'Seoul, South Korea',
            commentText: `“This is very unusual for my business that currently requires a virtual private network that has
            high security.”`,
            img: './img/Ellipse 175-2.png',
        },
        {
            name: 'Viezh Robert',
            land: 'Warsaw, Poland',
            commentText: `“Wow... I am very happy to use this VPN, it turned out to be more than my expectations and so
            far there have been no problems. LaslesVPN always the best.”`,
            img: './img/Ellipse 175.png',
        },
        {
            name: 'Yessica Christy',
            land: 'Shanxi, China',
            commentText: `“I like it because I like to travel far and still can connect with high speed.”`,
            img: './img/Ellipse 175-1.png',
        },
        {
            name: 'Kim Young Jou',
            land: 'Seoul, South Korea',
            commentText: `“This is very unusual for my business that currently requires a virtual private network that has
            high security.”`,
            img: './img/Ellipse 175-2.png',
        },
        {
            name: 'Viezh Robert',
            land: 'Warsaw, Poland',
            commentText: `“Wow... I am very happy to use this VPN, it turned out to be more than my expectations and so
            far there have been no problems. LaslesVPN always the best.”`,
            img: './img/Ellipse 175.png',
        },
        {
            name: 'Yessica Christy',
            land: 'Shanxi, China',
            commentText: `“I like it because I like to travel far and still can connect with high speed.”`,
            img: './img/Ellipse 175-1.png',
        },
        {
            name: 'Kim Young Jou',
            land: 'Seoul, South Korea',
            commentText: `“This is very unusual for my business that currently requires a virtual private network that has
            high security.”`,
            img: './img/Ellipse 175-2.png',
        },
        {
            name: 'Yessica Christy',
            land: 'Shanxi, China',
            commentText: `“I like it because I like to travel far and still can connect with high speed.”`,
            img: './img/Ellipse 175-1.png',
        },
    ]

    const moveSlider = (dir) => {
        const max = (cards.length - 2) * -450;
        const nextTranslate = dir === 'r' ? translate.current - 450 : translate.current + 450;
        if (nextTranslate <= 0 && nextTranslate >= max) {
            translate.current = nextTranslate;
            slider.current.style.transform = `translateX(${nextTranslate}px)`;
        }
        setActiveDot(prevState => {
            const nextState = dir === 'r' ? prevState + 1 : prevState - 1;
            if (nextState >= 0 && nextState <= cards.length - 2) {
                return nextState;
            } else {
                return prevState;
            }
        })
    }

    const setSlide = (n) => {
        const nextTranslate = n * -450;
        translate.current = nextTranslate;
        slider.current.style.transform = `translateX(${nextTranslate}px)`;
        setActiveDot(n);
    }

    return (
        <>
            <div className='comments-cards'>
                <div className='comments-cards__inner' ref={slider}>
                    {cards.map((el, i) => (
                        <div className='comments-cards__item' key={i}>
                            <div className='comments-card__item__top'>
                                <img src={require(`${el.img}`)} alt="avatar'" className='comments-card__item__top__img' />
                                <div className='comments-card__item__top__name'>
                                    <p className='name'>{el.name}</p>
                                    <p className='land'>{el.land}</p>
                                </div>
                                <p className='rating'>
                                    4.5
                                    <AiFillStar color='#fea250' style={{ marginLef: '11px' }} />
                                </p>
                            </div>
                            <p className='comments-card__item__text'>{el.commentText}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className='comments-navbar'>
                <div className='select-buttons'>
                    {cards.slice(0, cards.length - 1).map((_, i) => (
                        <button
                            key={i}
                            className={`${i === 0 ? 'select-buttons__first' : 'select-buttons__btn'} btn ${i === activeDot ? ' select-buttons__active' : ''}`}
                            onClick={() => setSlide(i)}
                        />
                    ))}
                </div>
                <div className='arrows'>
                    <button className='arrows-btn btn' onClick={() => moveSlider('l')}>
                        <span className='arrow'><AiOutlineArrowLeft /></span>
                    </button>
                    <button className='arrows-btn btn' onClick={() => moveSlider('r')}>
                        <span className='arrow'><AiOutlineArrowRight /></span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Comments;