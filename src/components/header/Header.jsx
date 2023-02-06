import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles['header-inner']}>
                <div className={styles.title}><h1>My Projects</h1></div>
                <div className={styles['header-links']}>
                    <Link to='/' className={styles['header-links__item']}>
                        {/* <button>Home</button> */}
                        Home
                    </Link>
                    <Link to='/contact' className={styles['header-links__item']}>
                        {/* <button>Home</button> */}
                        Contact
                    </Link>
                    {/* <button>Contact</button> */}
                </div>
            </div>
        </div>
    );
};

export default Header;