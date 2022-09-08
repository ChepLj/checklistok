import { signInWithPopup, signOut } from 'firebase/auth';
import { useState } from 'react';
import { auth, providerGG } from '../../firebase/firebaseConfig';
import style from './Login.module.css';

export default function Login() {
   const [state, setState] = useState();
   const handelLoginGG = () => {
      signInWithPopup(auth, providerGG)
         .then((result) => {
            console.log(result);

            // The signed-in user info.
            const user = result.user;
            console.log(user);
            // ...
            // setState(JSON.stringify(user));
            sessionStorage.setItem('user', JSON.stringify(user));
            window.location.href = '/main';
         })
         .catch((error) => {});
   };

   return (
      <section className={style.warp}>
         <img
            className={style.thumbnail}
            src="https://media.istockphoto.com/vectors/paper-checklist-and-pencil-flat-pictogram-vector-id1303877287?k=20&m=1303877287&s=612x612&w=0&h=XpJG8-1-uzHeOQ5AQsfMZSmLt3u7IqZ0TWKtO8nnWQ0="
            alt=""
         ></img>
         <div className={style.titleWarp}>
            <span className={style.title}>Đăng nhập bằng MSNV</span>
         </div>
         <input type="number" className={style.input} placeholder="Nhập msnv"></input>
         <input type="text" className={style.input} placeholder="Nhập password"></input>
         <button className={style.loginBtn}>Đăng Nhập</button>
         <p className={style.text}>---------- hoặc ----------</p>
         <section className={style.poviderLogin} onClick={handelLoginGG}>
            <img
               className={style.icon}
               src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png"
               alt=""
            ></img>
            <p className={style.textProvider}>Đăng nhập với Google</p>
         </section>
         <section className={style.poviderLogin}>
            <img
               className={style.icon}
               src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Facebook_icon_2013.svg/640px-Facebook_icon_2013.svg.png"
               alt=""
            ></img>
            <p className={style.textProvider}>Đăng nhập với Facebook</p>
         </section>
      </section>
   );
}
