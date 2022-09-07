import style from './Main.module.css';
import Header from './header/Header';
import GroupBtn from '../../mobileComponents/button/GroupBtn';
import AreaBtn from '../../mobileComponents/button/AreaBtn';
import getServerTimeStamp from '../../handelComponents/getServerTimeStamp';
import { getChildData } from '../../handelComponents/getChildData';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, Route, useLocation } from 'react-router-dom';

function MainMbLo() {
   if (!true) {
      window.location.href = '/';
   }
   const [state, setState] = useState({});
   const [ref, setRef] = useState(['Group']);
   const [timeState, setTimeState] = useState('****-**-**');
   const navigate = useNavigate();
   const location = useLocation();
   let submitPage = false; //cờ chuyển trang Submit
   const timeToday = useRef();

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
            console.dir(timeToday.current);
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
            <Header
               parentRef={[...ref]}
               time={timeState}
               menu={state.level === 'Group'}
               callBack={(value) => setRef(value)}
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
      </>
   );
}

export default MainMbLo;
