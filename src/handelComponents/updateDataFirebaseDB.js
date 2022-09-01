import { update, serverTimestamp } from 'firebase/database';

import { dbRT } from '../firebase/firebaseConfig';

const date = '22-08-31';

export default function updateDataFirebase(objectData) {
    const updates = {};
    for (const key in objectData) {
        updates['Result/' + date + key] = objectData[key];
    }

    console.log(updates);

    return update(dbRT, updates);
}
