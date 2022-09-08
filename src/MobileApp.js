import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import MainMbLo from './mobileLayout/mainLayout/Main';
import './MobileApp.css';
import Logs from './mobileLayout/logsLayout/Logs';
import { Submit } from './mobileLayout/submitLayout/Submit';
import Login from './mobileLayout/loginLayout/Login';
import { useEffect } from 'react';
import getServerTimeStamp from './handelComponents/getServerTimeStamp';

function MobileApp() {
   const navigate = useNavigate();
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
