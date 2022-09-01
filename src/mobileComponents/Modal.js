import { useState } from 'react';
import style from './Modal.module.css';

import { container } from '../handelComponents/createDataSubmit';
import updateDataFirebase from '../handelComponents/updateDataFirebaseDB';

export default function Modal({ header, content, uploadBtn, cancelBtn, callBackCancel, callBackActive }) {
    const [state, setState] = useState('prepareUpload');
    const total = Object.keys(container).length;
    // console.log('render');
    return (
        <>
            {/* <ModalUploading callBackCancel={callBackCancel} setState={setState} /> */}
            {(function () {
                switch (state) {
                    case 'prepareUpload': {
                        return (
                            <ModalPrepareUpLoad
                                callBackCancel={callBackCancel}
                                setState={setState}
                                total={total}
                                // total={total}
                            />
                        );
                    }
                    case 'uploading': {
                        return (
                            <ModalUploading
                                callBackCancel={callBackCancel}
                                setState={setState}
                                state={state}
                                total={total}
                            />
                        );
                    }
                    case 'successful': {
                        return (
                            <ModalUploadDone
                                callBackCancel={callBackCancel}
                                setState={setState}
                                state={state}
                                total={total}
                            />
                        );
                    }
                }
            })()}
        </>
    );
}

/////////////////////////////

function ModalPrepareUpLoad({ callBackCancel, setState, total }) {
    return (
        <section className={style.modal}>
            <div className={style.form}>
                <header className={style.header}>Chuẩn bị Upload</header>
                <div className={style.body}>
                    <b>{total}</b> Mục sẽ được Upload !
                </div>
                <ul className={style.list}>
                    {Object.keys(container).map((crr, index) => {
                        return (
                            <li className={style.item} key={index}>
                                {crr}
                            </li>
                        );
                    })}
                </ul>
                <footer className={style.footer}>
                    <button
                        className={`${style.button} ${style.active}`}
                        onClick={() => {
                            // updateDataFirebase(container)
                            setState('uploading');
                        }}
                    >
                        Bắt đầu UpLoad
                    </button>
                    <button className={style.button} onClick={callBackCancel}>
                        Hủy bỏ
                    </button>
                </footer>
            </div>
        </section>
    );
}

//////////////////////////////////
function ModalUploading({ callBackCancel, setState, state, total }) {
    updateDataFirebase(container)
        .then(() => {
            console.log('update Successful');
            setState('successful');
            // window.location.href = '/main';
        })
        .catch((error) => {
            console.log('updateError', error);
        });
    return (
        <section className={style.modal}>
            <div className={style.form}>
                <header className={style.header} style={{ color: 'yellow' }}>
                    Đang Uploading...
                </header>
                <div className={style.body}>
                    <b>{total}</b> Mục đang được Uploading... !
                </div>
                <ul className={style.list}>
                    {/* {Object.keys(container).map((crr, index) => {
                        return (
                            <li className={style.item} key={index}>
                                {crr}
                            </li>
                        );
                    })} */}
                    {state}
                </ul>
                <footer className={style.footer}>
                    {/* <button
                        className={`${style.button} ${style.active} ${style.disabled}`}
                        onClick={() => {
                            updateDataFirebase(container);
                        }}
                    >
                        Xong, Về trang chủ
                    </button> */}
                    {/* <button className={style.button} onClick={callBackCancel}>
                        Hủy bỏ
                    </button> */}
                </footer>
            </div>
        </section>
    );
}

//////////////////////////////////////
function ModalUploadDone({ callBackCancel, setState, state, total }) {
    return (
        <section className={style.modal}>
            <div className={style.form}>
                <header className={style.header} style={{ color: 'chartreuse' }}>
                    Đã Upload Xong
                </header>
                <div className={style.body}>
                    <b>{total}</b> Mục đã được Upload !
                </div>
                <ul className={style.list}>
                    {/* {Object.keys(container).map((crr, index) => {
                        return (
                            <li className={style.item} key={index}>
                                {crr}
                            </li>
                        );
                    })} */}
                    {state}
                </ul>
                <footer className={style.footer}>
                    <button
                        className={`${style.button} ${style.active} ${style.disabled}`}
                        onClick={() => {
                            window.location.href = '/main';
                        }}
                    >
                        Xong, Về trang chủ
                    </button>
                    {/* <button className={style.button} onClick={callBackCancel}>
                        Hủy bỏ
                    </button> */}
                </footer>
            </div>
        </section>
    );
}
