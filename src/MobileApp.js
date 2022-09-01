import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import MainMbLo from './mobileLayout/mainLayout/Main';
import './MobileApp.css';
import { Edit } from './mobileLayout/editLayout/Edit';
import { Submit } from './mobileLayout/submitLayout/Submit';
import { Login } from './mobileLayout/loginLayout/Login';
import { useEffect } from 'react';
import getServerTimeStamp from './handelComponents/getServerTimeStamp';

function MobileApp() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/main');
    }, []);

    return (
        <>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/main" element={<MainMbLo />} />
                <Route path="/edit" element={<Edit />} />
                <Route path="/submit" element={<Submit />} />
            </Routes>
        </>
    );
}

export default MobileApp;
