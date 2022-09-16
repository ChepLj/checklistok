import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getChildData } from '../../handelComponents/getChildData';
import getServerTimeStamp from '../../handelComponents/getServerTimeStamp';
import AreaBtn from '../../mobileComponents/button/AreaBtn';
import GroupBtn from '../../mobileComponents/button/GroupBtn';
import ImageModal from '../../mobileComponents/Modal/ImageModal';
import ScreenShot from '../../mobileComponents/screenShot/ScreenShot';
import Header from './header/Header';
import style from './Main.module.css';

function MainMbLo() {
   const location = useLocation();
   let user = JSON.parse(sessionStorage.getItem('user'));
   // console.log(user);
   if (user) {
      // console.log(user);
   } else if (location.state) {
      if (location.state.user) {
         user = JSON.parse(location.state.user);
      } else {
         window.location.href = '/';
      }
   } else {
      window.location.href = '/';
   }
   const [state, setState] = useState({});
   const [imageState, setImageState] = useState([false, '', '']);
   const [ref, setRef] = useState(['Group']);
   const [timeState, setTimeState] = useState('****-**-**');
   const navigate = useNavigate();

   let submitPage = false; //cờ chuyển trang Submit
   const timeToday = useRef();
   const mainLayoutRef = useRef();

   const isBack = useRef(true); //dùng để kiểm tra có phải từ trang submit trở về hay không
   if (isBack.current) {
      isBack.current = false;
      if (location.state) {
         if (location.state.hasOwnProperty('ref')) {
            // console.log('ref main', location.state.ref);
            setRef([...location.state.ref]);
         }
      }
   }

   useEffect(() => {
      const refMain = ref.join('/');
      getChildData(refMain).then((result) => {
         setState({
            ...result.val(),
         });
      });
   }, [ref]);

   useEffect(() => {
      if (submitPage) {
         // Truyền prop qua herf (có thể dùng window.location.href để chuyển hướng mà không cần dùng đến Router hook, nhưng không biết cách truyền prop qua href)
         navigate('/submit', {
            state: {
               title: state,
               refDoc: ref,
               timeStamp: timeState,
            },
         });
      }
   }, [state]);

   /////////////////// get time
   useEffect(() => {
      getServerTimeStamp()
         .then((result) => {
            timeToday.current = new Date(result.val());
            const tempRaw = timeToday.current;
            const month =
               tempRaw.getMonth() + 1 < 10 ? `0${tempRaw.getMonth() + 1}` : tempRaw.getMonth();
            const date = tempRaw.getDate() < 10 ? `0${tempRaw.getDate()}` : tempRaw.getDate();
            const timeTemp = `${tempRaw.getFullYear()}-${month}-${date}`;
            setTimeState(timeTemp);
         })
         .catch((error) => {
            console.log(error);
            timeToday.current = new Date();
            const tempRaw = timeToday.current;
            const month =
               tempRaw.getMonth() + 1 < 10 ? `0${tempRaw.getMonth() + 1}` : tempRaw.getMonth();
            const date = tempRaw.getDate() < 10 ? `0${tempRaw.getDate()}` : tempRaw.getDate();
            const timeTemp = `${tempRaw.getFullYear()}-${month}-${date}`;
            setTimeState(timeTemp);
         });
   }, []);
   // console.log('render', state);
   return (
      <>
         <div className={style.app}>
            <div className={style.warpTest} ref={mainLayoutRef}>
               <Header
                  parentRef={[...ref]}
                  time={timeState}
                  menu={state.level === 'Group'}
                  callBack={(value) => setRef(value)}
                  photoURL={user.photoURL}
               />
               {(function (data) {
                  if (data.level === 'Group')
                     return (
                        <GroupBtn
                           title={state}
                           parentRef={[...ref]}
                           timeToday={timeState}
                           callBack={(value) => setRef(value)}
                        />
                     );
                  if (data.level === 'Area')
                     return (
                        <AreaBtn
                           title={state}
                           parentRef={[...ref]}
                           timeToday={timeState}
                           percent={70}
                           callBack={(value) => setRef(value)}
                        />
                     );

                  if (data.level === 'Equipment') {
                     return (submitPage = true); //chuyển qua trang Submit ở Hook useEffect
                  }

                  // return <h2>Không Có Dữ Liệu</h2>;
               })(state)}
            </div>
            {/* xuat bao cao */}
            {state.level === 'Area' && (
               <>
                  <ScreenShot
                     time={timeState}
                     name={[...ref].pop()}
                     refForward={mainLayoutRef.current}
                     callBack={(value, image, link) => setImageState([value, image, link])}
                  />
                  {imageState[0] && (
                     <ImageModal
                        image={imageState[1]}
                        link={imageState[2]}
                        callBackCancel={(value) => {
                           setImageState([value, '', '']);
                        }}
                     />
                  )}
               </>
            )}
         </div>
      </>
   );
}

export default MainMbLo;
