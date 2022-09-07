import { useRef, useEffect, useState } from 'react';
import { getChildData } from '../../handelComponents/getChildData';

import style from './AreaBtn.module.css';

function AreaBtn({ title = '...', parentRef = [], timeToday = '', callBack }) {
   const percentEffectRef = useRef();
   const [status, setStatus] = useState({}); //render khi có Status

   let item = [];
   ///// get status
   useEffect(() => {
      const refTemp = parentRef[parentRef.length - 1];
      getChildData(`Result/${timeToday}/${refTemp}`)
         .then((result) => {
            if (result.val()) {
               setStatus(result.val());
            }
         })
         .catch((error) => {
            console.log(error);
         });
   }, [timeToday]);
   ////////////////////

   for (const key in title) {
      item.push(key);
   }

   return item.map((crr, index) => {
      if (crr === 'level') return;
      return (
         <div
            className={style.mainWrap}
            key={index}
            onClick={(e) => {
               const parentElement = e.target.closest(`.${style.mainWrap}`);
               const targetElement = parentElement.querySelector('.title');
               parentRef.push(targetElement.innerText);
               callBack(parentRef);
            }}
         >
            <div className={`${style.title} title`}>{crr}</div>
            <div className={style.percentEffect} ref={percentEffectRef} data-ref={crr}></div>
            <HandelStatus
               dataStatusRaw={status.hasOwnProperty(crr) ? status[crr] : []}
               dataItemRaw={title[crr]}
               crr={crr}
            />
         </div>
      );
   });
}

export default AreaBtn;

///////////////////////////
function HandelStatus({ dataStatusRaw, dataItemRaw, crr }) {
   let normal = [];
   let warn = [];
   let error = [];
   let total = [];
   let checked = 0;
   let percent = 0;
   //chuyển thành chuỗi để lọc (không phải dùng vòng lặp)
   const stringStatusConvert = JSON.stringify(dataStatusRaw);
   // console.log(stringStatusConvert);
   const stringItemConvert = JSON.stringify(dataItemRaw);
   // console.log(percentEffectRef);
   if (stringStatusConvert) {
      const regexNormalStatus = /"Status":"normal"/gi;
      const regexWarnStatus = /"Status":"warn"/gi;
      const regexErrorStatus = /"Status":"error"/gi;
      const regexIssueStatus = /"Status":"issue"/gi;
      const regexItemCheck = /"Level":"item"/gi;

      const normalStatusResult = stringStatusConvert.match(regexNormalStatus);
      const warnStatusResult = stringStatusConvert.match(regexWarnStatus);
      const errorStatusResult = stringStatusConvert.match(regexErrorStatus);
      const issueStatusResult = stringStatusConvert.match(regexIssueStatus);
      const issueItemCheckResult = stringItemConvert.match(regexItemCheck);
      if (normalStatusResult) normal = normalStatusResult;
      if (warnStatusResult) warn = warnStatusResult;
      if (errorStatusResult) error = errorStatusResult;
      if (issueStatusResult) error = [...error, ...issueStatusResult];
      if (issueItemCheckResult) total = issueItemCheckResult;
      checked = normal.length + warn.length + error.length;
      percent = (checked / total.length) * 100 ? (checked / total.length) * 100 : 0;
   }
   /////
   return (
      <>
         <div className={style.content}>
            ( {warn.length} Warn; {error.length} Error; Checked {checked}/{total.length} )
         </div>
         <div className={style.percent}>{Math.round(percent)}%</div>
         {handelPercent(percent, crr)}
      </>
   );
}

/////////////
function handelPercent(percent, crr) {
   const nodeList = document.querySelectorAll(`.${style.percentEffect}`);
   for (const node of nodeList) {
      if (node.dataset.ref === crr) {
         const element = node.style;

         if (percent > 70) {
            element.setProperty('--percent', percent + '%');
            element.setProperty('--color', 'lime');
         } else if (percent < 30) {
            element.setProperty('--percent', percent + '%');
            element.setProperty('--color', 'red');
         } else {
            element.setProperty('--percent', percent + '%');
            element.setProperty('--color', 'yellow');
         }
         return;
      }
   }
}
