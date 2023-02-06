import React, { useState } from 'react';
import styles from './Food.module.css';

const Tabs = ({ tabsData, activeTab, setActiveTab }) => {

    return (
        <div className={`${styles['tabcontainer']}`}>
            <div
                className={`${styles['tabcontent']} ${styles['fade']}`}
                key={activeTab}
            >
                <img src={require(`${tabsData[activeTab].src}`)} alt={tabsData[activeTab].alt} />
                {/* <div className={`${styles['tabcontent__descr']}`}>
                    {tabsData[activeTab].descr}
                </div> */}
                <div className={`${styles['preview__life']}`}>Живи полной жизнью!</div>
            </div>
            <div className={`${styles['tabheader']}`}>
                <h3>Выберите стиль питания</h3>
                <ul className={`${styles['tabheader__items']}`}>
                    {tabsData.map((el, i) => {
                        const style = i === activeTab
                            ? `${styles['tabheader__item']} ${styles['tabheader__item_active']}`
                            : `${styles['tabheader__item']}`
                        return (
                            <li
                                key={i}
                                className={style}
                                onClick={() => setActiveTab(i)}
                            >
                                {el.linkName}
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    );
};

export default Tabs;