import { useState } from 'react';
import { Link } from 'react-router-dom';
import LeftSideModal from '../../../mobileComponents/Modal/LeftSideModal';
import style from './Header.module.css';

function Header({ parentRef, time, menu, callBack }) {
   const [leftSideModalFlag, setLeftSideModalFlag] = useState(false);
   const title = parentRef.length > 1 ? parentRef[parentRef.length - 1] : 'Bảo Trì Điện Lò Cao';
   return (
      <>
         <header className={style.header}>
            {menu ? (
               <Link
                  className={`fa-solid fa-house fz1r4 ${style.button}`}
                  to="/main"
                  state={{ tes: 'ok' }}
               ></Link>
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
               <span className={style.titleLabel}>Bạn đang xem lại báo cáo</span>
               {/* Date and Shift */}

               <span className={style.time}>Ngày {time}</span>

               <span className={style.title}>{title}</span>
            </div>
            <div className={style.auth}>
               <img
                  className={style.avatar}
                  src={
                     'https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg'
                  }
                  onClick={() => {
                     alert('chưa làm tới');
                  }}
               ></img>
            </div>
         </header>
         <div className={style.headerMarginBottom}></div>
         {/* Modal display */}
         {leftSideModalFlag && (
            <LeftSideModal
               callBackClose={(value) => {
                  setLeftSideModalFlag(value);
               }}
            />
         )}
      </>
   );
}

export default Header;
