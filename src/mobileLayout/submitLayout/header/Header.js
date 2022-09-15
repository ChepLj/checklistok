import style from './Header.module.css';
import Modal from '../../../mobileComponents/Modal/Modal';
import ModalAlert from '../../../mobileComponents/Modal/ModalAlert';
import { useState } from 'react';
import { container } from '../../../handelComponents/createDataSubmit';

function Header({ parentRef, timeStamp, callBack }) {
   const title = parentRef.length > 1 ? parentRef[parentRef.length - 1] : 'Bảo Trì Điện Lò Cao';
   const [isModal, setIsModal] = useState(false);
   const [isModalAlert, setIsModalAlert] = useState(false);

   return (
      <>
         <header className={style.header}>
            <div
               className={`fa-solid fa-arrow-left fz1r4 ${style.button}`}
               onClick={(e) => {
                  if (Object.keys(container).length === 0) {
                     if (parentRef.length > 1) {
                        parentRef.pop(); //cắt phần tử Ref cuối mảng sau đó gọi hàm backToAreaBtn để render lại

                        callBack(parentRef);
                     }
                  } else {
                     setIsModalAlert(true);
                  }
               }}
            ></div>

            <div className={style.headerWrap}>
               {/* Title */}
               <span className={style.title}>{title}</span>
               {/* Date and Shift */}
               <div>
                  <span className={style.time}>{timeStamp}</span>
                  <span className={style.shift}>Ca ...</span>
               </div>
            </div>
            <div className={style.uploadWrap}>
               <i
                  className={`${style.upload} fa-solid fa-cloud-arrow-up`}
                  onClick={() => {
                     setIsModal(true); // set cờ Modal upload để render lại giao diện modal
                  }}
               ></i>
            </div>
         </header>
         <div className={style.headerMarginBottom}></div>
         {isModal ? ( // check nếu có cờ Modal( nút Upload được nhấn thì cho render Modal)
            <Modal
               callBackCancel={(value) => {
                  setIsModal(false);
               }}
            />
         ) : (
            ''
         )}

         {/* thông báo */}
         {isModalAlert ? ( // check nếu có cờ Modal( nút Upload được nhấn thì cho render Modal)
            <ModalAlert
               type={'warn'}
               okTitle={'Đã hiểu! Vẫn quay lại'}
               content={'Bạn chưa Upload dữ liệu. Nếu quay lại, dữ liệu trên trang này sẽ bị xóa !'}
               cancelTitle={'Hủy'}
               callBackCancel={(value) => {
                  setIsModalAlert(false);
               }}
               callBackOK={(value) => {
                  if (parentRef.length > 1) {
                     parentRef.pop(); //cắt phần tử Ref cuối mảng sau đó gọi hàm backToAreaBtn để render lại
                     if (Object.keys(container)) {
                        Object.keys(container).forEach((key) => delete container[key]); // xóa giá trị trong biến container
                     }

                     callBack(parentRef); // gọi lại hàm render
                  }
               }}
            />
         ) : (
            ''
         )}
      </>
   );
}

export default Header;
