import { toJpeg } from 'html-to-image';
import { useEffect, useState } from 'react';
import LoadingModal from '../Modal/LoadingModal';
import style from './ScreenShot.module.css';

function ScreenShot({ time, name, refForward, callBack }) {
   const [state, setState] = useState('');

   useEffect(() => {
      if (state === 'loading') {
         toJpeg(refForward).then((result) => {
            const a = document.createElement('a');
            a.href = result;
            a.download = `${time}-${name}.jpg`;
            // a.click();
            setState('');
            callBack(true, result, a); //trả về ảnh cho ImageModal
         });
      }
   }, [state]);
   return (
      <>
         {/* nếu state = loading thì cho hiện Component LoadingModal */}
         {state === 'loading' && <LoadingModal />}
         <div
            className={style.warp}
            onClick={() => {
               setState('loading');
            }}
         >
            <i className={`fa-solid fa-file-export ${style.icon}`}></i>
            <div className={style.text}>Xuất báo cáo</div>
         </div>
      </>
   );
}

export default ScreenShot;
