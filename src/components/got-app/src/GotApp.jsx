import Header from './components/header/Header';
import RandomChar from './components/randomChar/RandomChar';
import { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import BooksPage from './components/pages/BooksPage';
import HousesPage from './components/pages/HousesPage';
import CharacterPage from './components/pages/CharacterPage';
import BooksItem from './components/pages/BooksItem';
import React from 'react';
import './GotApp.css';

const GotApp = () => {

    const [showRandomBlock, setShowRandomBlock] = useState(true);

    return (
        <div className='GotApp'>
            {/* <Container> */}
            <div className='container'>
                <Header />
            </div>
            {/* </Container> */}
            {/* <Container> */}
            <div className='container'>
                {showRandomBlock ? <RandomChar interval={2000} /> : null}

                <button
                    style={{ marginBottom: '40px' }}
                    onClick={() => setShowRandomBlock(prevState => !prevState)}>
                    Toggle random character
                </button>
            </div>
            <div className='container' style={{ display: 'flex' }}>

                <Routes>
                    <Route path='/characters' element={<CharacterPage />} />
                    <Route path='/houses' element={<HousesPage />} />
                    <Route path='/books' element={<BooksPage />} />
                    <Route path='/books/:id' element={<BooksItem />} />
                    {/* <Route path='/' element='' /> */}
                    <Route path='*' element={<Navigate to={'characters/'} />} />
                </Routes>
            </div>
            {/* <Row> */}
            {/* <Col lg={{ size: 5, offset: 0 }}> */}


            {/* </Col> */}
            {/* </Row> */}

            {/* </Container> */}
        </div >
    );
};

export default GotApp;