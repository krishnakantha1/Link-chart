import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from "./App"
import { UserCredentialProvider } from './components/UserCredentialProvider/UserCredentialProvider'


const root = ReactDOM.createRoot(document.querySelector("#root"))

root.render(
    <React.StrictMode>
        <UserCredentialProvider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </UserCredentialProvider>
    </React.StrictMode>
    
)