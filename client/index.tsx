import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from '@app/App';

const appContainer = document.getElementById('root');
if(appContainer){
  const root = ReactDOM.createRoot(appContainer);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
};