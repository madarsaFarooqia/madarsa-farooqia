import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { ToastProvider } from './components/ToastProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <App />
    <ToastProvider />
  </>
);
