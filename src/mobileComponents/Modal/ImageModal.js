import style from './ImageModal.module.css';

export default function ImageModal({ image, link, callBackCancel }) {
   return (
      <section className={style.modal}>
         <div className={style.form}>
            <div className={style.imgWarp}>
               <img className={style.image} src={image} alt="Xuất báo cáo" />
            </div>
            <div className={style.bottom}>
               <span className={style.buttonCancel} onClick={() => callBackCancel(false)}>
                  Hủy
               </span>
               <div
                  className={style.downloadWarp}
                  onClick={() => {
                     link.click();
                     callBackCancel(false);
                  }}
               >
                  <i className={`fa-solid fa-download ${style.text}`}></i>
                  <span className={style.text}>Tải xuống</span>
               </div>
            </div>
         </div>
      </section>
   );
}
