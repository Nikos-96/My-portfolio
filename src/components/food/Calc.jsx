import React, { useState } from 'react';
import styles from './Food.module.css';

const Calc = () => {

    const [gender, setGender] = useState(0);
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [age, setAge] = useState('');
    const [ratio, setRatio] = useState(1);

    const ratios = {
        0: 1.2,
        1: 1.375,
        2: 1.55,
        3: 1.725
    }

    const result = gender === 0
        ? Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratios[ratio])
        : Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratios[ratio])

    return (
        <div className={`${styles['calculating']}`}>
            <div className={`${styles['container']}`}>
                <h2 className={`${styles['title']}`}>Рассчитаем вашу потребность в калориях?
                </h2>
                <div className={`${styles['calculating__field']}`}>
                    <div className={`${styles['calculating__subtitle']}`}>
                        Ваш пол
                    </div>
                    <div className={`${styles['calculating__choose']}`} id="gender">
                        <div
                            id="female"
                            className={`${styles['calculating__choose-item']} ${gender === 0 ? styles['calculating__choose-item_active'] : ''}`}
                            onClick={() => setGender(0)}
                        >
                            Женщина
                        </div>
                        <div
                            id="male"
                            className={`${styles['calculating__choose-item']} ${gender === 1 ? styles['calculating__choose-item_active'] : ''}`}
                            onClick={() => setGender(1)}
                        >
                            Мужчина
                        </div>
                    </div>

                    <div className={`${styles['calculating__subtitle']}`}>
                        Ваша конституция
                    </div>
                    <div className={`${styles['calculating__choose']} ${styles['calculating__choose_medium']}`}>
                        <input type="text" id="height" placeholder="Введите рост" className={`${styles['calculating__choose-item']}`} onInput={(e) => setHeight(+e.target.value)} style={{ border: /\D/g.test(height) && '1px solid red' }} />
                        <input type="text" id="weight" placeholder="Введите вес" className={`${styles['calculating__choose-item']}`} onInput={(e) => setWeight(+e.target.value)} style={{ border: /\D/g.test(weight) && '1px solid red' }} />
                        <input type="text" id="age" placeholder="Введите возраст" className={`${styles['calculating__choose-item']}`} onInput={(e) => setAge(+e.target.value)} style={{ border: /\D/g.test(age) && '1px solid red' }} />
                    </div>

                    <div className={`${styles['calculating__subtitle']}`}>
                        Выберите вашу физическая активность
                    </div>
                    <div className={`${styles['calculating__choose']} ${styles['calculating__choose_big']}`}>
                        <div data-ratio="1.2" id="low" className={`${styles['calculating__choose-item']} ${ratio === 0 && styles['calculating__choose-item_active']}`} onClick={() => setRatio(0)}>Низкая активность </div>
                        <div data-ratio="1.375" id="small" className={`${styles['calculating__choose-item']} ${ratio === 1 && styles['calculating__choose-item_active']}`} onClick={() => setRatio(1)}>
                            Невысокая
                            активность</div>
                        <div data-ratio="1.55" id="medium" className={`${styles['calculating__choose-item']} ${ratio === 2 && styles['calculating__choose-item_active']}`} onClick={() => setRatio(2)}>Умеренная активность</div>
                        <div data-ratio="1.725" id="high" className={`${styles['calculating__choose-item']} ${ratio === 3 && styles['calculating__choose-item_active']}`} onClick={() => setRatio(3)}>Высокая активность</div>
                    </div>

                    <div className={`${styles['calculating__divider']}`}></div>

                    <div className={`${styles['calculating__total']}`}>
                        <div className={`${styles['calculating__subtitle']}`}>
                            Ваша суточная норма калорий:
                        </div>
                        <div className={`${styles['calculating__result']}`}>
                            <span>
                                {(!height || !weight || !age)
                                    ? '____'
                                    : result
                                }
                            </span> ккал
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calc;