import { signInWithPopup } from 'firebase/auth';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, providerFB, providerGG } from '../../firebase/firebaseConfig';
import style from './Login.module.css';

export default function Login() {
   const msnvRef = useRef(0);
   const passRef = useRef('');
   const navigate = useNavigate();
   const user = JSON.parse(sessionStorage.getItem('user'));
   if (user) {
      window.location.href = '/main';
   }
   const rememberRef = useRef();
   let timeTemp = '';
   function getLocalTime() {
      const tempRaw = new Date();
      const month = tempRaw.getMonth() + 1 < 10 ? `0${tempRaw.getMonth() + 1}` : tempRaw.getMonth();
      const date = tempRaw.getDate() < 10 ? `0${tempRaw.getDate()}` : tempRaw.getDate();
      timeTemp = `${tempRaw.getFullYear()}-${month}-${date}`;
   }
   getLocalTime();

   const handelLoginGG = () => {
      signInWithPopup(auth, providerGG)
         .then((result) => {
            const user = result.user;

            sessionStorage.setItem('user', JSON.stringify(user));
            if (rememberRef.current.checked) {
               localStorage.setItem(`user-${timeTemp}`, JSON.stringify(user));
               window.location.href = '/main';
            } else {
               // localStorage.clear(); ///CHU Y sẽ xóa sach dữ liệu
               window.location.href = '/main';
            }
         })
         .catch((error) => {
            alert(error);
         });
   };
   /////////////////FaceBook
   const handelLoginFB = () => {
      signInWithPopup(auth, providerFB)
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
         .catch((error) => {
            alert(error);
         });
   };
   /////////
   useEffect(() => {
      const user = localStorage.getItem(`user-${timeTemp}`);
      if (user) {
         // console.log(user);
         navigate('/main', {
            state: {
               user: user,
               timeStamp: timeTemp,
            },
         });
      }
   });
   ////////// Login With MSNV////////
   const loginWithMSNV = () => {
      if (passRef.current.value === '1131') {
         const user = {};
         user.displayName = 'Admin';
         user.photoURL =
            'https://thumbs.dreamstime.com/b/admin-stamp-seal-watermark-distress-style-blue-vector-rubber-print-admin-title-scratched-texture-grunge-textured-133645421.jpg';
         user.email = '';
         user.providerData = [{ providerId: 'Mã số nhân viên' }];
         sessionStorage.setItem('user', JSON.stringify(user));
         window.location.href = '/main';
      }
   };
   /////////////
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
         <input ref={msnvRef} type="number" className={style.input} placeholder="Nhập msnv"></input>
         <input
            ref={passRef}
            type="text"
            className={style.input}
            placeholder="Nhập password"
         ></input>
         <button className={style.loginBtn} onClick={loginWithMSNV}>
            Đăng Nhập
         </button>
         <p className={style.text}>---------- hoặc ----------</p>
         <section className={style.poviderLogin} onClick={handelLoginGG}>
            <img
               className={style.icon}
               src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png"
               alt=""
            ></img>
            <p className={style.textProvider}>Đăng nhập với Google</p>
         </section>
         <section className={style.poviderLogin} onClick={handelLoginFB}>
            <img
               className={style.icon}
               src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Facebook_icon_2013.svg/640px-Facebook_icon_2013.svg.png"
               alt=""
            ></img>
            <p className={style.textProvider}>Đăng nhập với Facebook</p>
         </section>
         <div className={style.rememberWarp}>
            <input
               className={style.rememberInput}
               id="remember"
               type="checkbox"
               ref={rememberRef}
            />
            <label className={style.rememberLabel} htmlFor="remember">
               ghi nhớ đăng nhập ngày hôm nay.
            </label>
         </div>
      </section>
   );
}
