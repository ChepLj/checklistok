import style from './InfoModal.module.css';

export default function InfoModal({ userName, email, provider, time, callBackClose }) {
   const logOut = () => {
      localStorage.removeItem(`user-${time}`);
      sessionStorage.removeItem(`user`);
      window.location.href = '/';
   };
   return (
      <section className={style.modal}>
         <div className={style.form}>
            <div className={style.close} onClick={callBackClose}>
               đóng..
               <i className="fa-solid fa-xmark"></i>
            </div>
            <header className={style.header}>Thông tin User</header>
            <div className={style.body}>
               <p>{`User Name: ${userName}`}</p>
               <p>{`Email: ${email}`}</p>
               <p>{`Provider: ${provider}`}</p>
            </div>
            <button className={style.button} onClick={logOut}>
               Đăng Xuất
            </button>
         </div>
      </section>
   );
}
