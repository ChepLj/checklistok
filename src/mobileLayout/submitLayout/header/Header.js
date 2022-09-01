import style from './Header.module.css';
import Modal from '../../../mobileComponents/Modal';
import { useState } from 'react';
import { setSelectionRange } from '@testing-library/user-event/dist/utils';

function Header({ parentRef, callBack }) {
    const title = parentRef.length > 1 ? parentRef[parentRef.length - 1] : 'Bảo Trì Điện Lò Cao';
    const [isModal, setIsModal] = useState(false);

    return (
        <>
            <header className={style.header}>
                <div
                    className={`fa-solid fa-arrow-left fz1r4 ${style.button}`}
                    onClick={(e) => {
                        if (parentRef.length > 1) {
                            parentRef.pop();
                            callBack(parentRef);
                        }
                    }}
                ></div>

                <div className={style.headerWrap}>
                    {/* Title */}
                    <span className={style.title}>{title}</span>
                    {/* Date and Shift */}
                    <div>
                        <span className={style.time}>2022-8-15</span>
                        <span className={style.shift}>Ca D</span>
                    </div>
                </div>
                <div className={style.uploadWrap}>
                    <i
                        className={`${style.upload} fa-solid fa-cloud-arrow-up`}
                        onClick={() => {
                            setIsModal(true);
                        }}
                    ></i>
                </div>
            </header>
            <div className={style.headerMarginBottom}></div>
            {isModal ? (
                <Modal
                    callBackCancel={(value) => {
                        setIsModal(false);
                    }}
                />
            ) : (
                ''
            )}
        </>
    );
}

export default Header;
