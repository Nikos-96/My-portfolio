import './HotelEmbed.css';

const HotelEmbed = () => {
    return (
        <div className="iframe-container">
            <iframe
                title="Hotel Project"
                src={process.env.PUBLIC_URL + '/hotel-project/index.html'}
                // src={'./hotel-project/index.html'}
                width="100%"
                height="100%"
                sandbox="allow-same-origin allow-scripts allow-forms"
            />
        </div>
    )
}

export default HotelEmbed;