import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

import './index.css';
import MobileApp from './MobileApp';
import reportWebVitals from './reportWebVitals';
if (window.innerWidth > 700) {
   window.location.href =
      'https://translate.google.com/?hl=vi&sl=vi&tl=en&text=B%E1%BA%A1n%20%C4%91ang%20truy%20c%E1%BA%ADp%20b%E1%BA%B1ng%20m%C3%A1y%20t%C3%ADnh.%0ATrang%20d%C3%A0nh%20cho%20KSKV%20tr%C3%AAn%20m%C3%A1y%20t%C3%ADnh%20%C4%91ang%20%C4%91%C6%B0%E1%BB%A3c%20ph%C3%A1t%20tri%E1%BB%83n%20!%0A%0ATrong%20khi%20ch%E1%BB%9D%20%C4%91%E1%BB%A3i%20trang%20d%C3%A0nh%20cho%20KSKV%20%C4%91%C6%B0%E1%BB%A3c%20ho%C3%A0n%20th%C3%A0nh.%20H%C3%A3y%20truy%20c%E1%BA%ADp%20b%E1%BA%B1ng%20thi%E1%BA%BFt%20b%E1%BB%8B%20di%20%C4%91%E1%BB%99ng%20!!!%20%0A%0ALi%C3%AAn%20h%E1%BB%87%20Mr.S%E1%BB%B9&op=translate';
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   // <React.StrictMode>
   <BrowserRouter>
      <MobileApp />
   </BrowserRouter>,
   // </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
