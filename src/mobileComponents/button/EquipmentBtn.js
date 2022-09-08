import { useEffect } from 'react';
import {
   handelSubmitNote,
   handelSubmitRadioType,
   handelSubmitTypingType,
} from '../../handelComponents/createDataSubmit';
import { getChildData } from '../../handelComponents/getChildData';
import style from './EquipmentBtn.module.css';

function EquipmentBtn({ title = '...', timeToday = '' }) {
   let item = []; //tạo mảng để lưu Title (mới có thể dùng phương thức Map())

   for (const key in title) {
      //đưa các Title equipment vào mảng
      item.push(key);
   }

   useEffect(() => {
      // lấy trạng thái
      getChildData(`Result/${timeToday}`)
         .then((result) => {
            if (result.val()) {
               handelAddStatus(result.val());
            }
         })
         .catch((error) => {
            console.log(error);
         });
   }, [timeToday]);
   //render

   return item.map((crr, index) => {
      if (crr === 'level') return;
      return (
         <div className={style.wrap} key={index}>
            <div
               className={style.title}
               onClick={(e) => {
                  handelHide(e);
               }}
            >
               {crr}
            </div>
            {(function (dataInput) {
               let arrayContent = [];
               for (const key in dataInput) {
                  arrayContent.push(key);
               }

               return arrayContent.map((crrKey, index) => {
                  switch (dataInput[crrKey].type) {
                     case 'radio': {
                        return (
                           <RadioType
                              dataInput={dataInput[crrKey]}
                              keyCrr={crrKey}
                              // keyParent={crr}
                              key={index}
                           />
                        );
                     }
                     case 'temperature': {
                        return (
                           <TypingType
                              dataInput={dataInput[crrKey]}
                              keyCrr={crrKey}
                              // keyParent={crr}
                              key={index}
                           />
                        );
                     }
                     case 'note': {
                        return (
                           <NoteType
                              dataInput={dataInput[crrKey]}
                              index={index}
                              key={index}
                              keyCrr={crrKey}
                              keyParent={crr}
                           />
                        );
                     }
                  }
               });
            })(title[crr])}
         </div>
      );
   });
}
export default EquipmentBtn;

// ////////////////////////////////////////////////////////////////

function handelHide(e) {
   const temp = [...e.target.closest(`.${style.wrap}`).children];
   temp.shift(); //cắt element đầu mảng (title)
   temp.map((crr, index) => {
      crr.classList.toggle(style.hide);
   });
}

// RadioType
function RadioType({ dataInput, keyCrr }) {
   console.log(dataInput.doc.replace('/Group', ''));
   return (
      <div className={`${style.content} ${style.hide}`} key={keyCrr}>
         <span className={style.description}>{keyCrr}</span>

         <div className={style.radioType}>
            <label className={style.radioLabel}>
               {dataInput.content.normal}
               <input
                  type="radio"
                  className={`${style.radioCheck} fieldRadio`}
                  name={`${dataInput.doc}/${keyCrr}`}
                  data-doc-ref={dataInput.doc.replace('/Group', '')}
                  data-item-ref={keyCrr}
                  data-text={'normal'}
                  onChange={(e) => {
                     handelSubmitRadioType(e.target, 'normal');
                  }}
               />
            </label>
            <label className={style.radioLabel}>
               {dataInput.content.issue}
               <input
                  type="radio"
                  className={`${style.radioCheck} fieldRadio`}
                  name={`${dataInput.doc}/${keyCrr}`}
                  data-doc-ref={dataInput.doc.replace('/Group', '')}
                  data-item-ref={keyCrr}
                  data-text={'issue'}
                  onChange={(e) => {
                     handelSubmitRadioType(e.target, 'issue');
                  }}
               />
            </label>
         </div>
      </div>
   );
}

// TypingType

function TypingType({ dataInput, keyCrr }) {
   return (
      <div className={`${style.content} ${style.hide}`} key={keyCrr}>
         <span className={style.description}>{keyCrr}</span>
         <div className={style.typingType}>
            {dataInput.content.map((crr, index) => {
               return (
                  <label className={style.typingLabel} key={index}>
                     {crr}
                     <input
                        type="number"
                        className={`${style.typingCheck} fieldTyping`}
                        name={`${dataInput.doc}/${keyCrr}`}
                        data-doc-ref={dataInput.doc.replace('/Group', '')}
                        data-crr={crr}
                        data-item-ref={keyCrr}
                        onChange={(e) => {
                           handelSubmitTypingType(e.target, crr);
                        }}
                     />
                  </label>
               );
            })}
         </div>
      </div>
   );
}

/////////////////////
function NoteType({ dataInput, index, keyCrr, keyParent }) {
   return (
      <div key={index} className={`${style.noteTitle} ${style.hide}`}>
         <h5 className={style.noteTitle}>{keyCrr}</h5>
         <input
            className={`${style.noteInput} fieldNote`}
            type="text"
            placeholder={`Nhập ghi chú ( ${keyParent} )`}
            data-doc-ref={dataInput.doc.replace('/Group', '')}
            data-item-ref={keyCrr}
            onChange={(e) => {
               handelSubmitNote(e.target, 'normal');
            }}
         />
      </div>
   );
}

/////////////////////////// Add status

function handelAddStatus(statusValue) {
   const fieldRadioNode = document.querySelectorAll('.fieldRadio');
   const fieldTypingNode = document.querySelectorAll('.fieldTyping');
   const fieldNoteNode = document.querySelectorAll('.fieldNote');

   //////////Radio
   for (const item of fieldRadioNode) {
      const docRef = item.dataset.docRef;
      const itemRef = item.dataset.itemRef;
      const textRef = item.dataset.text;
      const ref = `${docRef}/${itemRef}/Check/Status`.replaceAll('/', '-');
      if (statusValue.hasOwnProperty(ref)) {
         if (statusValue[ref] === 'normal' && textRef === 'normal') {
            //////////
            item.checked = true;
         } else if (statusValue[ref] === 'issue' && textRef === 'issue') {
            /////////
            item.checked = true;
         }
      }
   }

   //////////Typing
   for (const item of fieldTypingNode) {
      const docRef = item.dataset.docRef;
      const itemRef = item.dataset.itemRef;
      const crr = item.dataset.crr;
      const ref = `${docRef}/${itemRef}/${crr}`.replaceAll('/', '-');
      if (statusValue.hasOwnProperty(ref)) {
         item.value = statusValue[ref];
      }
   }

   //////////Note
   for (const item of fieldNoteNode) {
      const docRef = item.dataset.docRef;
      const itemRef = item.dataset.itemRef;
      const ref = `${docRef}/${itemRef}/Note`.replaceAll('/', '-');
      if (statusValue.hasOwnProperty(ref)) {
         item.value = statusValue[ref];
      }
   }
}
