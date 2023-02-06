import React from 'react';
import { useRef } from 'react';
import { useEffect, useCallback } from 'react';
import { useState } from 'react';
import './Calculator.css';

const Calculator = () => {

    const data = [
        [
            {
                img: require('./img/c.png'),
                alt: 'c',
                value: 'Escape'
            },
            {
                img: require('./img/division.png'),
                alt: 'division',
                value: '/'
            },
            {
                img: require('./img/x.png'),
                alt: 'x',
                value: '*'
            },
            {
                img: require('./img/delete.png'),
                alt: 'delete',
                value: 'Backspace'
            },
        ],
        [
            {
                img: require('./img/7.png'),
                alt: '7',
                value: '7'
            },
            {
                img: require('./img/8.png'),
                alt: '8',
                value: '8'
            },
            {
                img: require('./img/9.png'),
                alt: '9',
                value: '9'
            },
            {
                img: require('./img/minus.png'),
                alt: 'minus',
                value: '\u2212'
                // value: '-'
            },
        ],
        [
            {
                img: require('./img/4.png'),
                alt: '4',
                value: '4'
            },
            {
                img: require('./img/5.png'),
                alt: '5',
                value: '5'
            },
            {
                img: require('./img/6.png'),
                alt: '6',
                value: '6'
            },
            {
                img: require('./img/plus.png'),
                alt: 'plus',
                value: '+'
            },
        ],
        [
            {
                img: require('./img/1.png'),
                alt: '1',
                value: '1'
            },
            {
                img: require('./img/2.png'),
                alt: '2',
                value: '2'
            },
            {
                img: require('./img/3.png'),
                alt: '3',
                value: '3'
            },
            {
                img: require('./img/equals.png'),
                alt: 'equals',
                value: 'Enter',
                rowSpan: 2,
            },
        ],
        [
            {
                img: require('./img/zero.png'),
                alt: 'zero',
                value: '0',
                colSpan: 2,
            },
            {
                img: require('./img/comma.png'),
                alt: 'comma',
                value: ','
            },
        ]
    ]

    const [input, setInput] = useState('');
    const [result, setResult] = useState('');
    const [animatedEl, setAnimatedEl] = useState(null);
    const inputRef = useRef(null);

    const fixNumber = num => {
        if (num && num !== 'undefined') {
            return Number(num.toPrecision(15));
        } else {
            return num;
        }
    };

    const onInput = useCallback(value => {
        if (value === ',') {
            const lastPart = input.match(/([^/*\-+]*$)/)[0];
            if (lastPart.includes(',') || lastPart === '') {
                return input;
            }
        }
        if (result === 'Infinity') {
            setInput('');
            setResult('');
        }
        if (value === 'Escape') {
            setInput('');
            setResult('');
            return;
        }
        if (value === 'Backspace') {
            setInput(prevState => prevState.slice(0, prevState.length - 1));
            return;
        }
        if (value === 'Enter') {
            setResult(() => {
                const prevState = result + input;
                let str = prevState.replace(/\u2212/g, '-');
                str = str.replace(/[^-(),\d/*+.]/g, '');
                str = str.replace(/,/g, '.');
                if (/\D$/.test(str) || /,$/.test(str)) {
                    str = str.slice(0, str.length - 1);
                }
                const num = fixNumber(eval(str));
                const res = String(num).replace(/\./, ',').replace('-', '\u2212');
                return res === 'undefined' ? '' : res;
            });
            setInput('');
            return;
        }
        setInput(prevState => {
            if (result && /\d/.test(value) && prevState === '') {
                return prevState;
            }
            let str = prevState;
            if (/\D$/.test(str) && /\D$/.test(value)) {
                if (value !== ',') {
                    str = str.replace(/.$/, value);
                }
                return str;
            } else {
                if ((prevState === '0') && value === ',') {
                    return prevState += value;
                } else if (/\D0$/.test(str) && /\d/.test(value) && /[^,]0$/.test(str) && value !== ',') {
                    str = str.replace(/.$/, value);
                    return str;
                } else {
                    if (prevState === '' && (/\d/.test(value) || value === '-') && !result) {
                        return prevState += value;
                    }
                    if (prevState === '' && /\D/.test(value) && !result) {
                        return prevState;
                    }
                    if (prevState === '0' && /\d/.test(value)) {
                        return prevState;
                    }
                    return prevState += value;
                }
            }
        });
    }, [input, result])

    const onKeyDown = useCallback(e => {
        const validKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '/', '*', '-', '+', 'Backspace', '.', ',', 'Enter', 'Escape'];
        if (validKeys.includes(e.key)) {
            setAnimatedEl(null);
            if (e.key === '.') {
                onInput(',');
                setAnimatedEl(',')
            } else if (e.key === '-') {
                onInput('\u2212');
                // onInput('-');
                setAnimatedEl('\u2212');
            } else {
                onInput(e.key);
                setAnimatedEl(e.key);
            }
        }
    }, [onInput])

    const startAnimation = (e) => {
        e.target.style.animationName = '';
        setTimeout(() => {
            e.target.style.animationName = 'shadow';
        }, 1);
    }

    const clearAnimation = (e) => {
        e.target.style.animationName = '';
        setAnimatedEl(null);
    }

    useEffect(() => {
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [onKeyDown])

    useEffect(() => {
        inputRef.current.scrollLeft += inputRef.current.scrollWidth;
    }, [input])

    return (
        <div className='calculator' draggable={false}>
            <table className='container'>
                <tbody>
                    <tr>
                        <td colSpan={4} className='input' ref={inputRef} draggable={false}>
                            {result && result}
                            {input}
                        </td>
                    </tr>
                    {data.map((tr, i) => (
                        <tr key={i}>
                            {tr.map(td => (
                                <td
                                    onMouseDown={() => onInput(td.value)}
                                    rowSpan={td.rowSpan ? td.rowSpan : null}
                                    colSpan={td.colSpan ? td.colSpan : null}
                                    key={td.value}
                                >
                                    <img src={td.img} alt={td.alt} style={{ maxHeight: td.value === 'Enter' && 'initial', userSelect: 'none' }} draggable={false} />
                                    <div className='shadow' style={{ animationName: animatedEl === td.value && 'shadow' }} onClick={(e) => startAnimation(e)} onAnimationEnd={e => clearAnimation(e)} onMouseLeave={(e) => clearAnimation(e)} />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Calculator;