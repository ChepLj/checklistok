import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './MobileApp.css';
import Login from './mobileLayout/loginLayout/Login';
import Logs from './mobileLayout/logsLayout/Logs';
import MainMbLo from './mobileLayout/mainLayout/Main';
import { Submit } from './mobileLayout/submitLayout/Submit';

function MobileApp() {
   useEffect(() => {
      // navigate('/main');
   }, []);

   return (
      <>
         <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/main" element={<MainMbLo />} />
            <Route path="/logs" element={<Logs />} />
            <Route path="/submit" element={<Submit />} />
         </Routes>
      </>
   );
}

export default MobileApp;
