import React from 'react';
import { useState } from 'react';
import { getPagesArray } from '../utils/pages';
import './Pagination.css';

const Pagination = ({ totalPages, page, changePage }) => {

    const [inputValue, setInputValue] = useState('');

    let pagesArray = getPagesArray(totalPages).slice(1, totalPages - 1)

    if (totalPages > 10) {
        if (page <= 5) {
            pagesArray = pagesArray.slice(0, 8);
        } else if (page + 5 > totalPages) {
            pagesArray = pagesArray.slice(totalPages - 10);
        } else {
            pagesArray = pagesArray.slice(page - 5 > 0 ? page - 5 : 0, page + 2 < totalPages - 1 ? page + 2 : totalPages - 1);
        }
    }


    const onPageChange = (p) => {
        if (p >= 1 && p <= totalPages) {
            changePage(p)
        }
    }

    const onSetPage = (e) => {
        e.preventDefault();
        if (+inputValue < 1) {
            setInputValue(1);
            changePage(1);
        } else if (+inputValue > totalPages) {
            setInputValue(totalPages);
            changePage(totalPages);
        } else {
            changePage(+inputValue);
        }
    }

    if (totalPages === 1) {
        pagesArray = getPagesArray(totalPages);
    }

    if (totalPages === 0) {
        return ''
    }

    return (
        <div className='page__wrapper'>
            <span
                className={`page page-nav${page === 1 ? ' disabled' : ''}`}
                onClick={() => onPageChange(page - 1)}
            >
                Prev
            </span>
            {totalPages > 1 &&
                <span
                    onClick={() => changePage(1)}
                    key={1}
                    className={page === 1 ? 'page page__current' : 'page'}
                >
                    1
                </span>
            }
            {(page - 5 > 0 && totalPages > 10) &&
                <span className='page page-dots'>
                    ...
                </span>
            }
            {pagesArray.map(p =>
                <span
                    onClick={() => changePage(p)}
                    key={p}
                    className={page === p ? 'page page__current' : 'page'}
                >
                    {p}
                </span>
            )}
            {(page + 2 < totalPages - 2 && totalPages > 10) &&
                <span className='page page-dots'>
                    ...
                </span>
            }
            {totalPages > 1 &&
                <span
                    onClick={() => changePage(totalPages)}
                    key={totalPages}
                    className={page === totalPages ? 'page page__current' : 'page'}
                >
                    {totalPages}
                </span>
            }
            <span
                className={`page page-nav${page === totalPages ? ' disabled' : ''}`}
                onClick={() => onPageChange(page + 1)}
            >
                Next
            </span>
            <form className='page-jump'>
                <button
                    onClick={onSetPage}
                >
                    Go to</button>
                <input
                    type='number'
                    min={1}
                    max={totalPages}
                    onChange={(e) => setInputValue(e.target.value)}
                    value={inputValue}
                />
            </form>
        </div>
    );
};

export default Pagination;