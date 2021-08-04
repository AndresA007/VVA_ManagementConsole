import React from 'react';
import ReactDOM from 'react-dom';

import { Auth0Provider } from '@auth0/auth0-react';

import App from "./components/App";



// Render the react components
//ReactDOM.render(<App />, document.getElementById('root'));


ReactDOM.render(

    <React.StrictMode>
        <Auth0Provider
        
        domain="dev-xoy-9-xd.us.auth0.com"
        clientId="K16LFMoQLab9yU4rLHKN1gXULOAk1Aev"
        
        redirectUri={window.location.origin}
        >

            <App />

        </Auth0Provider>


    </React.StrictMode>,
    document.getElementById('root')


);