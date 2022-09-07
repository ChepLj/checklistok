import { useState } from 'react';
import style from './ModalAlert.module.css';

export default function ModalAlert({
   callBackCancel,
   callBackOK,
   cancelTitle,
   okTitle = 'OK',
   content = 'Thông Báo',
   type = 'notify',
}) {
   const [state, setState] = useState(false);
   const checktype = () => {
      switch (type) {
         //Modal cảnh báo
         case 'warn': {
            return (
               <div className={style.form}>
                  <header
                     className={style.header}
                     style={{ backgroundColor: 'yellow', color: 'red' }}
                  >
                     Cảnh Báo !
                  </header>
                  <div className={style.body}>{content}</div>

                  <footer className={style.footer}>
                     {(function () {
                        if (okTitle)
                           return (
                              <button
                                 className={`${style.button} ${style.active} ${style.disabled}`}
                                 onClick={() => {
                                    callBackOK(true);
                                 }}
                              >
                                 {okTitle}
                              </button>
                           );
                     })()}
                     {(function () {
                        if (cancelTitle)
                           return (
                              <button
                                 className={`${style.button}`}
                                 onClick={() => {
                                    callBackCancel(true);
                                 }}
                              >
                                 {cancelTitle}
                              </button>
                           );
                     })()}
                  </footer>
               </div>
            );
         }
         // Modal Lỗi
         case 'error': {
            return (
               <div className={style.form}>
                  <header
                     className={style.header}
                     style={{ backgroundColor: 'red', color: 'white' }}
                  >
                     Lỗi !
                  </header>
                  <div className={style.body}>{content}</div>

                  <footer className={style.footer}>
                     {(function () {
                        if (okTitle)
                           return (
                              <button
                                 className={`${style.button} ${style.active} ${style.disabled}`}
                                 onClick={() => {
                                    callBackOK(true);
                                 }}
                              >
                                 {okTitle}
                              </button>
                           );
                     })()}
                     {(function () {
                        if (cancelTitle)
                           return (
                              <button
                                 className={`${style.button}`}
                                 onClick={() => {
                                    callBackCancel(true);
                                 }}
                              >
                                 {cancelTitle}
                              </button>
                           );
                     })()}
                  </footer>
               </div>
            );
         }
         //  Modal thông báo
         default: {
            return (
               <div className={style.form}>
                  <header
                     className={style.header}
                     style={{ backgroundColor: 'deepskyblue', color: 'white' }}
                  >
                     Thông Báo !
                  </header>
                  <div className={style.body}>{content}</div>

                  <footer className={style.footer}>
                     {(function () {
                        if (okTitle)
                           return (
                              <button
                                 className={`${style.button} ${style.active} ${style.disabled}`}
                                 onClick={() => {
                                    callBackOK(true);
                                 }}
                              >
                                 {okTitle}
                              </button>
                           );
                     })()}

                     {(function () {
                        if (cancelTitle)
                           return (
                              <button
                                 className={`${style.button}`}
                                 onClick={() => {
                                    callBackCancel(true);
                                 }}
                              >
                                 {cancelTitle}
                              </button>
                           );
                     })()}
                  </footer>
               </div>
            );
         }
      }
   };

   return <section className={style.modal}>{checktype()}</section>;
}
////////////////////////////////
