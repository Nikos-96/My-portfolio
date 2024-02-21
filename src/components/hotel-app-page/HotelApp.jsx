import './HotelApp.css';

const HotelApp = () => {
    return (
        <div className='hotel-app__wrapper'>
            <div className="hotel-app__desc">
                <h2>Hotel App</h2>
                <p>
                    Here's a simple program I wrote in Java. This program displays bookings and feedback made on the hotel website.
                </p>
                <p>
                    You can download it here: <a href="download.php?file=Hotel.zip">Download Hotel.zip</a>
                </p>
                <p>It's an executable JAR file that requires Java 21 to run.</p>
            </div>
            <diov className="hotel-app__image">
                <img src="/img/hotel-app.png" alt="hotel app screenshot" />
            </diov>
        </div>
    )
}

export default HotelApp;