import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './custom.css'
import App from './App';
import { AuthProvider } from './Auth/AuthContext'
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
      <ToastContainer />
    </AuthProvider>
  </React.StrictMode>
);

