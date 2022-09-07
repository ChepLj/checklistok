//////////////////

export const container = {}; // object lưu giá trị update
export const container2 = {}; // object lưu giá trị update kieu 2

export function handelSubmitTypingType(e, label) {
   const docRef = e.dataset.docRef;
   const itemRef = e.dataset.itemRef;
   const value = e.value;

   // -------------Phương Án 1 ------------------
   // if (!container[docRef]) {
   //     //kiểm tra nếu chưa có thì khởi tạo
   //     container[docRef] = {};
   // }

   // if (!container[docRef][itemRef]) {
   //     //kiểm tra nếu chưa có thì khởi tạo
   //     container[docRef][itemRef] = {};
   // }

   // const temp = container[docRef][itemRef]; //ánh xạ qua một biến mới để tránh lỗi
   // temp[label] = value;

   // -------------Phương Án 2 ------------------

   container[`${docRef}/${itemRef}/Status`] = 'normal';
   container[`${docRef}/${itemRef}/${label}`] = value;
   let temp = `${docRef}/${itemRef}/Status`.replaceAll('/', '-');
   let temp2 = `${docRef}/${itemRef}/${label}`.replaceAll('/', '-');
   container[temp] = 'normal';
   container[temp2] = value;
   console.log(container);
}
///////
export function handelSubmitRadioType(e, status) {
   const docRef = e.dataset.docRef;
   const itemRef = e.dataset.itemRef;

   // -------------Phương Án 1 ------------------
   // if (!container[docRef]) {
   //     //kiểm tra nếu chưa có thì khởi tạo
   //     container[docRef] = {};
   // }

   // if (!container[docRef][itemRef]) {
   //     //kiểm tra nếu chưa có thì khởi tạo
   //     container[docRef][itemRef] = {};
   // }
   // // console.log(container);
   // if (e.value) {
   //     const temp = container[docRef][itemRef]; //ánh xạ qua một biến mới để tránh lỗi
   //     temp['status'] = status;
   //     console.log(container);
   // }

   // -------------Phương Án 2 ------------------
   if (e.value) {
      container[`${docRef}/${itemRef}/Check`] = status;
      let temp = `${docRef}/${itemRef}/Check`.replaceAll('/', '-');
      container[temp] = status;
      console.log(container);
   }
}

//////////////////
export function handelSubmitNote(e) {
   const docRef = e.dataset.docRef;
   const itemRef = e.dataset.itemRef;
   const value = e.value;

   // -------------Phương Án 1 ------------------
   // if (!container[docRef]) {
   //     //kiểm tra nếu chưa có thì khởi tạo
   //     container[docRef] = {};
   // }

   // if (!container[docRef][itemRef]) {
   //     //kiểm tra nếu chưa có thì khởi tạo
   //     container[docRef][itemRef] = {};
   // }

   // const temp = container[docRef][itemRef]; //ánh xạ qua một biến mới để tránh lỗi
   // temp['Note'] = value;
   // console.log(container);

   // -------------Phương Án 2 ------------------

   container[`${docRef}/${itemRef}/Note`] = value;
   let temp = `${docRef}/${itemRef}/Note`.replaceAll('/', '-');
   container[temp] = value;
   console.log(temp);
   console.log(container);
}
