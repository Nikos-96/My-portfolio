import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Projects from './components/projects/Projects';
// import Landing1 from './components/pages/landings/landing1/Landing1';
import PegSolitairePage from './components/pages/games/PegSolitairePage';
import ConwayGamePage from './components/pages/games/ConwayGamePage';
import GotAppPage from './components/pages/sites/GotAppPage';
import PostsAppPage from './components/pages/sites/PostsAppPage';
import Game2048Page from './components/pages/games/Game2048Page';
import FoodPage from './components/pages/sites/FoodPage';
import Landing1Page from './components/pages/sites/Landing1Page';
import CalculatorPage from './components/pages/sites/CalculatorPage';
import Contact from './components/pages/Contact/Contact';
import Comments from './components/comments/Comments';
import { useEffect } from 'react';
import HotelEmbed from './components/hotel-embed/HotelEmbed';
import HotelApp from './components/hotel-app-page/HotelApp';

function App() {

    useEffect(() => {
        const updateHight = () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }
        updateHight();
        window.addEventListener('resize', updateHight);
        // return () => window.removeEventListener('resize', updateHight);
    }, [])

    return (
        <BrowserRouter>
            <div className="App">
                <Header />
                <div className='main-container'>
                    <Routes>
                        <Route path='/' element={<Projects />} />
                        <Route path='*' element={<Navigate to='/' />} />
                        <Route path='/peg-solitaire' element={<PegSolitairePage />} />
                        <Route path='/conway-game-of-life' element={<ConwayGamePage />} />
                        <Route path='/game2048' element={<Game2048Page />} />
                        <Route path='/got-app/*' element={<GotAppPage />} />
                        <Route path='/food' element={<FoodPage />} />
                        <Route path='/vpn' element={<Landing1Page />} />
                        <Route path='/posts-app' element={<PostsAppPage />} />
                        <Route path='/calculator' element={<CalculatorPage />} />
                        <Route path='/contact' element={<Contact />} />
                        <Route path='/hotel' element={<HotelEmbed />} />
                        <Route path='/hotel-app' element={<HotelApp />} />
                        <Route path='/download.php/*' />
                        <Route path='/comments' element={<Comments />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
