import React from 'react';
import ReactDOM from 'react-dom/client';
import Notes from 'components/Notes';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Notes />
  </React.StrictMode>
);