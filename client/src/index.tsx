import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './root/App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_SIGN_IN_KEY!}>
    <App />
  // </GoogleOAuthProvider>
  // <React.StrictMode>
  // </React.StrictMode>
);