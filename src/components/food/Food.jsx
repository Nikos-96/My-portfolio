import React, { useEffect, useState, useRef } from 'react';
import styles from './Food.module.css';
import logo from './icons/logo.svg';
import instagram from './icons/instagram.svg';
import right from './icons/right.svg';
import veg from './icons/veg.svg';
import { BsFacebook } from 'react-icons/bs';
import Tabs from './Tabs';
import Slider from './Slider';
import Calc from './Calc';
import CountdownTimer from './CountdownTimer';
import { useCallback } from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';
import Preview from './Preview';

const Food = () => {

    const [showModal, setShowModal] = useState(false);
    const [menu, setMenu] = useState([]);
    const timerId = useRef(null);

    const onScroll = useCallback(() => {
        if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
            openModal();
        }
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
    }, [])


    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.removeAttribute('style');
        }
        return () => document.body.removeAttribute('style');
    }, [showModal])

    useEffect(() => {
        fetch('food.json')
            .then(res => res.json())
            .then(data => setMenu(data.menu))
            .catch(e => console.log(e))
    }, [])

    useEffect(() => {
        timerId.current = setTimeout(() => {
            // setShowModal(true);
            openModal();
        }, 5000);
        return () => clearTimeout(timerId.current);
    }, [])

    const openModal = () => {
        if (timerId.current) {
            clearTimeout(timerId.current);
        }
        window.removeEventListener('scroll', onScroll);
        timerId.current = null;
        setShowModal(true);
    }

    return (
        <div className={styles['food']}>
            <header className={`${styles['header']}`}>
                <div className={`${styles['header__left-block']}`}>
                    <div className={`${styles['header__logo']}`}>
                        <img src={logo} alt="Логотип" />
                    </div>
                    <nav className={`${styles['header__links']}`}>
                        <a href="#" className={`${styles['header__link']}`}>Доставка питания</a>
                        <a href="#" className={`${styles['header__link']}`}>Второй пункт</a>
                    </nav>
                </div>
                <div>
                    <button
                        data-modal
                        className={`${styles['btn']} ${styles['btn_white']}`}
                        onClick={openModal}
                    >
                        Связаться с нами</button>
                </div>
            </header>

            <div className={`${styles['sidepanel']}`}>
                <div className={`${styles['sidepanel__text']}`}><span>Социальные сети</span></div>
                <div className={`${styles['sidepanel__divider']}`}></div>
                <a href="#" className={`${styles['sidepanel__icon']}`}>
                    <img src={instagram} alt="instagram" />
                </a>
                <a href="#" className={`${styles['sidepanel__icon']}`}>
                    <BsFacebook
                        size={24}
                        color='black'
                    />
                </a>
            </div>

            <Preview />
            {/* <div className={`${styles['preview']}`}>
                <div className={`${styles['bgc_blue']}`}></div>
                <div className={`${styles['container']}`}>
                    <Tabs />
                </div>
            </div> */}

            <div className={`${styles['divider']}`}></div>

            <div className={`${styles['offer']}`}>
                <div className={`${styles['bgc_y']}`}></div>
                <div className={`${styles['container']}`}>
                    <div className={`${styles['offer__text']}`}>
                        <h2 className={`${styles['title']}`}>Что мы можем вам предложить?</h2>
                        <div className={`${styles['offer__descr']}`}>
                            Наша основная идея - это правильное питание. Оно может быть простым и вкусным. Мы не просто
                            доставка, мы сервис! Мы взяли на себя все расчеты БЖУ, калорийности, объемов порций и прочие важные,
                            но скучные аспекты. Вам остается только полезная, сытная и правильная еда, которую мы привозим прямо
                            под дверь.
                        </div>
                    </div>
                    <div className={`${styles['offer__action']}`}>
                        <button data-modal className={`${styles['btn']} ${styles['btn_dark']}`} onClick={openModal}>Связаться с нами</button>
                    </div>
                </div>
                <div className={`${styles['container']}`}>
                    <div className={`${styles['offer__advantages']}`}>
                        <h2>Быстро и полезно</h2>
                        <div className={`${styles['offer__advantages-text']}`}>
                            Готовка дома занимает много сил, времени и нервов. Мы привозим еду сразу на целый день, и ты можешь
                            действовать так, как тебе удобно, не подстраиваясь ни под кого и будучи уверенным в качестве
                            продукта!
                        </div>
                        <h2>Правильный рацион</h2>
                        <div className={`${styles['offer__advantages-text']}`}>
                            Мы разработали специальное меню, где учтены все нюансы правильного питания, от баланса БЖУ до их
                            приготовления и дробления рациона.
                        </div>
                    </div>
                    <Slider />
                </div>
            </div>

            <div className={`${styles['divider']}`}></div>
            <Calc />
            <div className={`${styles['divider']}`}></div>

            <div className={`${styles['menu']}`}>
                <h2 className={`${styles['title']}`}>Наше меню на день</h2>

                <div className={`${styles['menu__field']}`}>
                    <div className={`${styles['container']}`}>
                        <ul className={`${styles['cards-container']}`}>
                            {menu.map((el, i) => (
                                <li key={i} className={styles['menu__item']}>
                                    <img src={require(`./${el.img}`)} alt={el.altimg} />
                                    <h3 className={styles['menu__item-subtitle']}>{el.title}</h3>
                                    <div className={styles['menu__item-descr']}>{el.descr}</div>
                                    <div className={styles['menu__item-divider']}></div>
                                    <div className={styles['menu__item-price']}>
                                        <div className={styles['menu__item-cost']}>Цена:</div>
                                        <div className={styles['menu__item-total']}><span>{el.price}</span> $/день</div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className={`${styles['order']}`}>
                <div className={`${styles['container']}`}>
                    <div className={`${styles['title']}`}>Заказывай пробный день прямо сейчас!</div>
                    <form action="#" className={`${styles['order__form']}`}>
                        <input required placeholder="Ваше имя" name="name" type="text" className={`${styles['order__input']}`} />
                        <input required placeholder="Ваш номер телефона" name="phone" type="phone" className={`${styles['order__input']}`} />
                        <img src={right} alt="right" />
                        <button className={`${styles['btn']} ${styles['btn_dark']} ${styles['btn_min']}`}>Перезвонить мне</button>
                    </form>
                </div>
            </div>

            <div className={`${styles['divider']}`}></div>

            <div className={`${styles['promotion']}`}>
                <div className={`${styles['bgc_y']}`}></div>
                <div className={`${styles['container']}`}>
                    <div className={`${styles['promotion__text']}`}>
                        <div className={`${styles['title']}`}>Акция для новых клиентов!</div>
                        <div className={`${styles['promotion__descr']}`}>
                            Мы ценим каждого клиента и предлагаем вам стать одним из них на очень выгодных условиях.
                            Каждому, кто закажет доставку питание на неделю, будет предоставлена скидка в размере
                            <span>20%!</span>
                            <br />
                            Акция закончится 20 мая в 00:00
                        </div>
                    </div>
                    <CountdownTimer
                        deadline={
                            new Date(Date.now() + 172800000).toISOString().split('T')[0]
                        }
                    />
                </div>
            </div>

            <footer className={`${styles['footer']}`}>
                <div className={`${styles['container']}`}>
                    <div>
                        <div className={`${styles['subtitle']}`}>Мы в социальных сетях:</div>
                        <a href="#" className={`${styles['link']}`}>instagram</a>
                        <a href="#" className={`${styles['link']}`}>facebook</a>
                    </div>
                    <div>
                        <img src={veg} alt="pepper" />
                    </div>
                    <div className={`${styles['call']}`}>
                        <div className={`${styles['subtitle']}`}>Или позвоните нам</div>
                        <a href="#" className={`${styles['link']}`}>+380678341034</a>
                        <a href="#" className={`${styles['link']}`}>+380500941356</a>
                    </div>
                </div>
            </footer>

            <div className={`${styles['modal']}${showModal === true ? ' ' + styles['show'] : ''}`}>
                <div className={`${styles['modal-bg']}`} onClick={() => setShowModal(false)} />
                <div className={`${styles['modal__content']}`}>
                    <form action="#">
                        <div data-close className={`${styles['modal__close']}`}
                            onClick={() => setShowModal(false)}
                        >&times;</div>
                        <div className={`${styles['modal__title']}`}>Мы свяжемся с вами как можно быстрее!</div>
                        <input required placeholder="Ваше имя" name="name" type="text" className={`${styles['modal__input']}`} />
                        <input required placeholder="Ваш номер телефона" name="phone" type="phone" className={`${styles['modal__input']}`} />
                        <button className={`${styles['btn']} ${styles['btn_dark']} ${styles['btn_min']}`}>Перезвонить мне</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Food;