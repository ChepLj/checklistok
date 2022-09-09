import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getChildData } from '../../handelComponents/getChildData';
import AreaBtn from '../../mobileComponents/button/AreaBtn';
import EquipmentBtnLog from '../../mobileComponents/button/EquipmentBtnLog';
import GroupBtn from '../../mobileComponents/button/GroupBtn';
import Header from './header/Header';
import style from './Logs.module.css';

function Logs() {
   const user = JSON.parse(sessionStorage.getItem('user'));
   if (user) {
      console.log(user);
   } else {
      window.location.href = '/';
   }

   const [state, setState] = useState({});
   const [ref, setRef] = useState(['Group']);
   const location = useLocation();

   useEffect(() => {
      const refMain = ref.join('/');
      getChildData(refMain).then((result) => {
         setState({
            ...result.val(),
         });
      });
   }, [ref]);

   return (
      <>
         {/* <h1>Logs Layout</h1> */}
         <div className={style.app}>
            <Header
               parentRef={[...ref]}
               time={location.state.ref}
               menu={state.level === 'Group'}
               callBack={(value) => setRef(value)}
            />
            {(function (data) {
               if (data.level === 'Group')
                  return (
                     <GroupBtn
                        title={state}
                        parentRef={[...ref]}
                        timeToday={location.state.ref}
                        callBack={(value) => setRef(value)}
                     />
                  );
               if (data.level === 'Area')
                  return (
                     <AreaBtn
                        title={state}
                        parentRef={[...ref]}
                        timeToday={location.state.ref}
                        callBack={(value) => setRef(value)}
                     />
                  );

               if (data.level === 'Equipment') {
                  return <EquipmentBtnLog title={state} timeToday={location.state.ref} />;
               }

               // return <h2>Không Có Dữ Liệu</h2>;
            })(state)}
         </div>
      </>
   );
}

export default Logs;
