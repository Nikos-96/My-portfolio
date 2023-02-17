// import GA4React from 'ga-4-react';
import React from 'react';
import ReactDOM from 'react-dom/client';
// import ReactDOM from 'react-dom';
// import { GA4Provider } from 'react-ga4';
import { GoogleAnalyticsProvider } from 'react-ga4-gtag';
import App from './App';

// const ga4react = new GA4React("G-XDWH4WC2KH");
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <GoogleAnalyticsProvider measurementId="G-XDWH4WC2KH">
        <App />
    </GoogleAnalyticsProvider>
)

// (async _ => {

//     await ga4react.initialize()
//         .then(res => res)
//         .catch(err => err)
//         .finally(() => {
//             root.render(
//                 <App />
//             )
//         });
// })();