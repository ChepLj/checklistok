import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getChildData } from '../../handelComponents/getChildData';
import style from './LeftSideModal.module.css';

export default function LeftSideModal({ callBackClose }) {
   const [state, setState] = useState([]);
   useEffect(() => {
      getChildData('Result')
         .then((result) => {
            const object = result.val();
            let array = [];
            for (const key in object) {
               array.push(key);
            }
            setState([...array].reverse());
         })
         .catch((error) => {
            console.log(error);
         });
   }, []);
   return (
      <div className={style.warp}>
         <section className={style.modal}>
            <div className={style.form}>
               <div className={style.header}>
                  <div
                     className={style.closeWarp}
                     onClick={() => {
                        callBackClose(false);
                     }}
                  >
                     <label>Đóng </label>
                     <i className={`fa-solid fa-xmark ${style.closeBtn}`}></i>
                  </div>
               </div>
               <div className={style.body}>
                  <div
                     className={style.item}
                     onClick={(e) => {
                        e.target.querySelector(`.${style.list}`) &&
                           e.target
                              .querySelector(`.${style.list}`)
                              .classList.toggle(`${style.hide}`);
                     }}
                  >
                     Xem Lại Báo Cáo
                     <ul className={`${style.list} ${style.hide}`}>
                        {state.map((crr, index) => {
                           return (
                              <li key={index} className={style.listItem}>
                                 <Link className={style.button} state={{ ref: crr }} to="/logs">
                                    {crr}
                                 </Link>
                              </li>
                           );
                        })}
                     </ul>
                  </div>
               </div>
            </div>
         </section>
      </div>
   );
}
