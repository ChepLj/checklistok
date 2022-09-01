import style from './Submit.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './header/Header';
import EquipmentBtn from '../../mobileComponents/button/EquipmentBtn';
import Modal from '../../mobileComponents/Modal';

/*...*/

export const Submit = () => {
    if (!true) {
        window.location.href = '/';
    }
    let location = useLocation(); //dùng useLocation để lấy prop
    const state = location.state.title;
    const refDoc = location.state.refDoc;
    const navigate = useNavigate();
    // console.log(refDoc);
    const backToAreaBtn = (ref) => {
        navigate('/main', { state: { ref: ref } });
    };
    return (
        <>
            <Header parentRef={[...refDoc]} callBack={(value) => backToAreaBtn(value)} />

            <EquipmentBtn title={state} />
        </>
    );
};
