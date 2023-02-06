import React, { useState } from 'react';
import { useEffect } from 'react';
import { AiFillCheckCircle, AiFillStar, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineCheck, AiOutlineInstagram } from 'react-icons/ai';
import { BsArrowDownCircle, BsArrowUpCircle, BsTwitter } from 'react-icons/bs';
import { FaFacebookF } from 'react-icons/fa';
import { HashLink } from 'react-router-hash-link';
import Comments from './Comments';
import './Landing1.css';

const Landing1 = () => {

    const [pageOffset, setPageOffset] = useState(window.pageYOffset);

    useEffect(() => {
        const updateOffset = () => {
            setPageOffset(window.pageYOffset);
        }
        window.addEventListener('scroll', updateOffset);
        return () => window.removeEventListener('scroll', updateOffset);
    }, [])

    return (
        <div className='landing1-container'>
            <div className='landing1'>
                <div className='pageNav'>
                    <BsArrowUpCircle size={40} color='#f53855' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ opacity: pageOffset === 0 ? '0.4' : '' }} />
                    <BsArrowDownCircle size={40} color='#f53855' onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })} style={{ opacity: (window.innerHeight + window.scrollY) >= document.body.scrollHeight && pageOffset !== 0 ? '0.4' : '' }} />

                </div>
                <header>
                    <div className='header-wrapper'>
                        <div className='logo-wrapper'>
                            <img src={require('./img/Vector.png')} alt="logo" className='logo-img' />
                            <span className='logo-name'>LaslesVPN</span>
                        </div>
                        <nav className='nav-wrapper'>
                            <ul className='header-navbar'>
                                <li><HashLink smooth to='#about' className='navbar-link'>About</HashLink></li>
                                <li><HashLink smooth to="#features" className='navbar-link'>Features</HashLink></li>
                                <li><HashLink smooth to="#pricing" className='navbar-link'>Pricing</HashLink></li>
                                <li><HashLink smooth to="#comments" className='navbar-link'>Testimonials</HashLink></li>
                                <li><HashLink smooth to="#help" className='navbar-link'>Help</HashLink></li>
                                {/* <li><a href="#" className='navbar-link'>About</a></li>
                                <li><a href="#" className='navbar-link'>Features</a></li>
                                <li><a href="#" className='navbar-link'>Pricing</a></li>
                                <li><a href="#" className='navbar-link'>Testimonials</a></li>
                                <li><a href="#" className='navbar-link'>Help</a></li> */}
                            </ul>
                        </nav>
                        <div className='header-buttons'>
                            <button className='sign-in btn'>Sign In</button>
                            <button className='sign-up btn'>Sign Up</button>
                        </div>
                    </div>
                </header>

                <main>
                    <div className='top-wrapper' id='about'>
                        <div className='text'>
                            <h1 className='title'>Want anything to be easy with LaslesVPN.</h1>
                            <p className='description'>Provide a network for all your needs with ease and fun using
                                <span>LaslesVPN</span> discover
                                interesting features from us.
                            </p>
                            <button className='get-started btn'>Get Started</button>
                        </div>
                        <img src={require('./img/Illustration1.png')} alt="img" className='top-img' />
                    </div>

                    <div className='info-wrapper'>
                        <div className='info'>
                            <img src={require('./img/Icon/user.png')} alt="user icon" className='info-icon' />
                            <div>
                                <p className='info-bold'>90+</p>
                                <p className='info-normal'>Users</p>
                            </div>
                        </div>
                        <div className='vector'></div>
                        <div className='info'>
                            <img src={require('./img/Icon/location.png')} alt="location icon" className='info-icon' />
                            <div>
                                <p className='info-bold'>30+</p>
                                <p className='info-normal'>Locations</p>
                            </div>
                        </div>
                        <div className='vector'></div>
                        <div className='info'>
                            <img src={require('./img/Icon/Server.png')} alt="server icon" className='info-icon' />
                            <div>
                                <p className='info-bold'>50+</p>
                                <p className='info-normal'>Servers</p>
                            </div>
                        </div>
                    </div>

                    <div className='features-wrapper' id='features'>
                        <img src={require('./img/Illustration2.png')} alt="img2" className='features-img' />
                        <div className='features-text'>
                            <h2 className='features-title'>We Provide Many Features You Can Use</h2>
                            <p className='features-description'>You can explore the features that we provide with fun and have their
                                own
                                functions each feature.</p>
                            <p className='feature'>
                                < AiFillCheckCircle color='#2fab73' size='20px' style={{ marginLeft: '10px' }} />
                                Powerfull online protection.</p>
                            <p className='feature'>
                                < AiFillCheckCircle color='#2fab73' size='20px' style={{ marginLeft: '10px' }} />
                                Internet without borders. </p>
                            <p className='feature'>
                                < AiFillCheckCircle color='#2fab73' size='20px' style={{ marginLeft: '10px' }} />
                                Supercharged VPN </p>
                            <p className='feature'>
                                < AiFillCheckCircle color='#2fab73' size='20px' style={{ marginLeft: '10px' }} />
                                No specific time limits.
                            </p>
                        </div>
                    </div>

                    <div className='cards-wrapper' id='pricing'>
                        <h2 className='cards-title'>Choose Your Plan</h2>
                        <p className='cards-description'>Let's choose the package that is best for you and explore it happily and<br />
                            cheerfully.</p>
                        <div className='cards'>
                            <div className='cards-item'>
                                <img src={require('./img/Free.png')} alt="box" className='cards-img' />
                                <p className='cards-title'>Free Plan</p>
                                <div>
                                    <p className='cards-feature'><span><AiOutlineCheck color='#2fab73' style={{ marginLeft: '25px' }} /></span>Unlimited
                                        Bandwitch
                                    </p>
                                    <p className='cards-feature'><span><AiOutlineCheck color='#2fab73' style={{ marginLeft: '25px' }} /></span>Encrypted
                                        Connection
                                    </p>
                                    <p className='cards-feature'><span><AiOutlineCheck color='#2fab73' style={{ marginLeft: '25px' }} /></span>No Traffic Logs
                                    </p>
                                    <p className='cards-feature'><span><AiOutlineCheck color='#2fab73' style={{ marginLeft: '25px' }} /></span>Works on All
                                        Devices
                                    </p>
                                </div>
                                <p className='cards-price'>Free</p>
                                <button className='cards-btn btn'>Select</button>
                            </div>
                            <div className='cards-item'>
                                <img src={require('./img/Standard.png')} alt="box" className='cards-img' />
                                <p className='cards-title'>Standard Plan</p>
                                <div>
                                    <p className='cards-feature'><span><AiOutlineCheck color='#2fab73' style={{ marginLeft: '25px' }} /></span>Unlimited
                                        Bandwitch
                                    </p>
                                    <p className='cards-feature'><span><AiOutlineCheck color='#2fab73' style={{ marginLeft: '25px' }} /></span>Encrypted
                                        Connection
                                    </p>
                                    <p className='cards-feature'><span><AiOutlineCheck color='#2fab73' style={{ marginLeft: '25px' }} /></span>Yes Traffic Logs
                                    </p>
                                    <p className='cards-feature'><span><AiOutlineCheck color='#2fab73' style={{ marginLeft: '25px' }} /></span>Works on All
                                        Devices
                                    </p>
                                    <p className='cards-feature'><span><AiOutlineCheck color='#2fab73' style={{ marginLeft: '25px' }} /></span>Connect Anyware
                                    </p>
                                </div>
                                <p className='cards-price'>$9 <span className='cards-price-grey'>/ mo</span></p>
                                <button className='cards-btn btn'>Select</button>
                            </div>
                            <div className='cards-item'>
                                <img src={require('./img/Premium.png')} alt="box" className='cards-img' />
                                <p className='cards-title'>Premium Plan</p>
                                <div>
                                    <p className='cards-feature'><span><AiOutlineCheck color='#2fab73' style={{ marginLeft: '25px' }} /></span>Unlimited
                                        Bandwitch
                                    </p>
                                    <p className='cards-feature'><span><AiOutlineCheck color='#2fab73' style={{ marginLeft: '25px' }} /></span>Encrypted
                                        Connection
                                    </p>
                                    <p className='cards-feature'><span><AiOutlineCheck color='#2fab73' style={{ marginLeft: '25px' }} /></span>Yes Traffic Logs
                                    </p>
                                    <p className='cards-feature'><span><AiOutlineCheck color='#2fab73' style={{ marginLeft: '25px' }} /></span>Works on All
                                        Devices
                                    </p>
                                    <p className='cards-feature'><span><AiOutlineCheck color='#2fab73' style={{ marginLeft: '25px' }} /></span>Connect Anyware
                                    </p>
                                    <p className='cards-feature'><span><AiOutlineCheck color='#2fab73' style={{ marginLeft: '25px' }} /></span>Get New Features
                                    </p>
                                </div>
                                <p className='cards-price'>$12 <span className='cards-price-grey'>/ mo</span></p>
                                <button className='cards-btn btn'>Select</button>
                            </div>
                        </div>
                    </div>

                    <div className='locations-wrapper'>
                        <div className='locations-title'>
                            <h2>Huge Global Network </h2>
                            <h2>of Fast VPN</h2>
                        </div>
                        <p className='locations-description'>See <span>LaslesVPN</span> everywhere to make it easier for you when you
                            move<br />
                            locations.
                        </p>
                        <img src={require('./img/Huge Global.png')} alt="locations" className='locations-img' />
                    </div>

                    <div className='links-wrapper'>
                        <a href="#" className='links-item'>
                            <img src={require('./img/links/Mask Group.png')} alt="netflix" />
                        </a>
                        <a href="#" className='links-item'>
                            <img src={require('./img/links/Mask Group-1.png')} alt="reddit" />
                        </a>
                        <a href="#" className='links-item'>
                            <img src={require('./img/links/Mask Group-2.png')} alt="amazon" />
                        </a>
                        <a href="#" className='links-item'>
                            <img src={require('./img/links/Mask Group-3.png')} alt="discord" />
                        </a>
                        <a href="#" className='links-item'>
                            <img src={require('./img/links/Mask Group-4.png')} alt="spotify" />
                        </a>
                    </div>

                    <div className='comments-wrapper' id='comments'>
                        <h2 className='comments-title'>Trusted by Thousands of<br /> Happy Customer</h2>
                        <p className='comments-description'>These are the stories of our customers who have joined us with great<br />
                            pleasure when using this crazy feature.</p>
                        <Comments />
                    </div>

                    <div className='subscribe-wrapper'>
                        <div className='subscribe-text'>
                            <h2>Subscribe Now for<br /> Get Special Features!</h2>
                            <p>Let's subscribe with us and find the fun.</p>
                        </div>
                        <button className='subscribe-btn btn'>Subscribe Now</button>
                    </div>
                </main>

                <footer>
                    <div className='footer-wrapper' id='help'>
                        <div className='footer-item'>
                            <div className='logo-wrapper'>
                                <img src={require('./img/Vector.png')} alt="logo" className='logo-img' />
                                <div className='logo-name'>LaslesVPN</div>
                            </div>
                            <p className='footer-description'>
                                <span>LaslesVPN</span> is a private virtual network that<br /> has unique features and has high
                                security.
                            </p>
                            <div className='footer-social'>
                                <a href="#"><span className='social-link'><FaFacebookF /></span></a>
                                <a href="#"><span className='social-link'><BsTwitter /></span></a>
                                <a href="#"><span className='social-link'><AiOutlineInstagram /></span></a>
                            </div>
                            <p className='copyright'>©2020Lasles<span>VPN</span></p>
                        </div>

                        <div className='footer-item'>
                            <p className='links-title'>Product</p>
                            <ul className='footer-menu'>
                                <li className='footer-link'><a href="#">Download</a></li>
                                <li className='footer-link'><a href="#">Pricing</a></li>
                                <li className='footer-link'><a href="#">Locations</a></li>
                                <li className='footer-link'><a href="#">Server</a></li>
                                <li className='footer-link'><a href="#">Countries</a></li>
                                <li className='footer-link'><a href="#">Blog</a></li>
                            </ul>
                        </div>
                        <div className='footer-item'>
                            <p className='links-title'>Engage</p>
                            <ul className='footer-menu'>
                                <li className='footer-link'><a href="#">LaslesVPN ?</a></li>
                                <li className='footer-link'><a href="#">FAQ</a></li>
                                <li className='footer-link'><a href="#">Tutorials</a></li>
                                <li className='footer-link'><a href="#">About Us</a></li>
                                <li className='footer-link'><a href="#">Privacy Policy</a></li>
                                <li className='footer-link'><a href="#">Terms of Service</a></li>
                            </ul>
                        </div>
                        <div className='footer-item'>
                            <p className='links-title'>Earn Money</p>
                            <ul className='footer-menu'>
                                <li className='footer-link'><a href="#">Affiliate</a></li>
                                <li className='footer-link'><a href="#">Become Partner</a></li>
                            </ul>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Landing1;