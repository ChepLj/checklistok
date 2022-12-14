import { useLocation, useNavigate } from 'react-router-dom';
import EquipmentBtn from '../../mobileComponents/button/EquipmentBtn';
import Header from './header/Header';

/*...*/

export const Submit = () => {
   const user = JSON.parse(sessionStorage.getItem('user'));
   // if (user) {
   //    // console.log(user);
   // } else {
   //    window.location.href = '/';
   // }
   let location = useLocation(); //dùng useLocation để lấy prop
   const state = location.state.title;
   const refDoc = location.state.refDoc;
   const timeStamp = location.state.timeStamp;
   const navigate = useNavigate();
   // console.log(refDoc);
   // Xử lý khi nhấn nút Back
   const backToAreaBtn = (ref) => {
      navigate('/main', { state: { ref: ref } }); //truyền ref qua prop để gọi lại dữ liệu
   };
   ///////////////
   return (
      <>
         <Header
            parentRef={[...refDoc]}
            timeStamp={timeStamp}
            callBack={(value) => backToAreaBtn(value)}
         />
         {user ? (
            <EquipmentBtn title={state} timeToday={location.state.timeStamp} />
         ) : (
            <h3>Không có thông tin User. Vui lòng quay lại trang chủ !</h3>
         )}
      </>
   );
};
