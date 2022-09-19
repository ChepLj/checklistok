import { useState } from 'react';
import InfoModal from '../../../mobileComponents/Modal/InfoModal';
import LeftSideModal from '../../../mobileComponents/Modal/LeftSideModal';
import style from './Header.module.css';

function Header({ parentRef, time, menu, userName, email, provider, photoURL, callBack }) {
   const [leftSideModalFlag, setLeftSideModalFlag] = useState(false);
   const [infoModalFlag, setInfoModalFlag] = useState(false);
   const title = parentRef.length > 1 ? parentRef[parentRef.length - 1] : 'Bảo Trì Điện Lò Cao';
   return (
      <>
         <header className={style.header}>
            {menu ? (
               <div //menu
                  className={`fa-solid fa-bars fz1r4 ${style.button}`}
                  onClick={(e) => {
                     /// show menu
                     setLeftSideModalFlag(true);
                  }}
               ></div>
            ) : (
               <div //Back
                  className={`fa-solid fa-arrow-left fz1r4 ${style.button}`}
                  onClick={(e) => {
                     if (parentRef.length > 1) {
                        parentRef.pop();
                        callBack(parentRef);
                     }
                  }}
               ></div>
            )}

            <div className={style.headerWrap}>
               {/* Title */}
               <span className={style.title}>{title}</span>
               {/* Date and Shift */}
               <div>
                  <span className={style.time}>{time}</span>
                  <span className={style.shift}>Ca ...</span>
               </div>
            </div>
            <div className={style.auth}>
               <img
                  className={style.avatar}
                  src={photoURL}
                  onClick={() => {
                     setInfoModalFlag(true);
                  }}
                  alt=""
               ></img>
            </div>
         </header>
         <div className={style.headerMarginBottom}></div>
         {/* Modal leftSide display */}
         {leftSideModalFlag && (
            <LeftSideModal
               callBackClose={(value) => {
                  setLeftSideModalFlag(value);
               }}
            />
         )}
         {/* Modal Info display */}
         {infoModalFlag && (
            <InfoModal
               userName={userName}
               email={email}
               provider={provider}
               time={time}
               callBackClose={(value) => {
                  setInfoModalFlag(false);
               }}
            />
         )}
      </>
   );
}

export default Header;
