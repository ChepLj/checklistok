import { update, child, get, serverTimestamp } from 'firebase/database';

import { dbRT } from '../firebase/firebaseConfig';

export default async function getServerTimeStamp(objectData) {
    try {
        await update(dbRT, { timeStamp: serverTimestamp() });
        return await get(child(dbRT, 'timeStamp'));
    } catch (result) {
        console.log(result);
    }
}
