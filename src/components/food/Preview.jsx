import React from 'react';
import { useState } from 'react';
import styles from './Food.module.css';
import Tabs from './Tabs';

const Preview = () => {

    const tabsData = [
        {
            src: './img/tabs/vegy.jpg',
            alt: 'vegy',
            descr: `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Для
            людей, которые интересуются спортом; активных и здоровых. Это абсолютно новый продукт с
            оптимальной ценой и высоким качеством!`,
            linkName: 'Фитнес',
        },
        {
            src: './img/tabs/elite.jpg',
            alt: 'elite',
            descr: `Меню “Премиум” - мы используем не только красивый дизайн упаковки, но и качественное исполнение
            блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!`,
            linkName: 'Премиум',
        },
        {
            src: './img/tabs/post.jpg',
            alt: 'post',
            descr: `Наше специальное “Постное меню” - это тщательный подбор ингредиентов: полное отсутствие
            продуктов животного происхождения. Полная гармония с собой и природой в каждом элементе! Все
            будет Ом!`,
            linkName: 'Постное',
        },
        {
            src: './img/tabs/vegy.jpg',
            alt: 'vegy',
            descr: `Меню "Сбалансированное" - это соответствие вашего рациона всем научным рекомендациям. Мы
            тщательно просчитываем вашу потребность в к/б/ж/у и создаем лучшие блюда для вас.`,
            linkName: 'Сбалансированное',
        },
    ]

    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className={`${styles['preview']}`}>
            <div className={`${styles['bgc_blue']}`}></div>
            <div className={`${styles['container']}`}>
                <Tabs
                    tabsData={tabsData}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
                {/* <div className={`${styles['preview__life']}`}>Живи полной жизнью!</div> */}
            </div>
            <div className={`${styles['tabcontent__descr']}`}>
                {tabsData[activeTab].descr}
            </div>
        </div>
    );
};

export default Preview;