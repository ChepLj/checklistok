import style from './LoadingModal.module.css';

export default function LoadingModal() {
   return (
      <section className={style.modal}>
         <div className={style.loader}></div>
      </section>
   );
}
