import { update, serverTimestamp } from 'firebase/database';

import { dbRT } from '../firebase/firebaseConfig';

export default function updateDataFirebase(objectData, timeStamp = '22-08-31') {
   const updates = {};
   for (const key in objectData) {
      updates['Result/' + timeStamp + '/' + key] = objectData[key];
   }

   console.log(updates);

   return update(dbRT, updates);
}
