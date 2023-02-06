import GA4React from 'ga-4-react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const ga4react = new GA4React("G-XDWH4WC2KH");
const root = ReactDOM.createRoot(document.getElementById('root'));

(async _ => {

    await ga4react.initialize()
        .then(res => res)
        .catch(err => err)
        .finally(() => {
            root.render(
                <App />
            )
        });
})();