import React, { useState } from 'react';
import styles from './Food.module.css';
import left from './icons/left.svg';
import right from './icons/right.svg';

const Slider = () => {

    const slides = [
        {
            img: './img/slider/pepper.jpg',
            alt: 'pepper',
        },
        {
            img: './img/slider/food-12.jpg',
            alt: 'food',
        },
        {
            img: './img/slider/olive-oil.jpg',
            alt: 'oil',
        },
        {
            img: './img/slider/paprika.jpg',
            alt: 'paprika',
        },
    ]

    const [currentSlide, setCurrentSlide] = useState(0);

    const sliderInnerStyle = {
        width: `${slides.length * 100}%`,
        transform: `translateX(-${currentSlide * (100 / slides.length)}%)`
        // transform: `translateX(-${currentSlide * 650}px)`
    }

    const onSlideInc = () => {
        setCurrentSlide(prevState => {
            return prevState === slides.length - 1 ? 0 : prevState + 1;
        });
    }

    const onSlideDec = () => {
        setCurrentSlide(prevState => {
            return prevState === 0 ? slides.length - 1 : prevState - 1;
        });
    }

    return (
        <div className={`${styles['offer__slider']}`}>
            <div className={`${styles['offer__slider-counter']}`}>
                <div className={`${styles['offer__slider-prev']}`} onClick={onSlideDec}>
                    <img src={left} alt="prev" />
                </div>
                <span>
                    <span className={styles['current']}>
                        {currentSlide < 9 && '0'}
                        {currentSlide + 1}
                    </span>
                    <span>
                        /
                        {slides.length <= 9 && '0'}
                        {slides.length}
                    </span>
                </span>
                <div className={`${styles['offer__slider-next']}`} onClick={onSlideInc}>
                    <img src={right} alt="next" />
                </div>
            </div>
            <div className={`${styles['offer__slider-wrapper']}`}>
                <ul className={`${styles['offer__slider-inner']}`} style={sliderInnerStyle}>
                    {slides.map(el => (
                        <li
                            key={el.img}
                            className={`${styles['offer__slide']}`}
                        >
                            <img src={require(`${el.img}`)} alt={el.alt} />
                        </li>
                    ))}
                </ul>
            </div>
            <ul className={`${styles['carousel-indicators']}`}>
                {slides.map((el, i) => (
                    <li
                        key={el.img}
                        className={`${styles['dot']}`}
                        style={{
                            opacity: currentSlide === i && 1
                        }}
                        onClick={() => setCurrentSlide(i)}
                    />
                ))}
            </ul>
        </div>
    );
};

export default Slider;