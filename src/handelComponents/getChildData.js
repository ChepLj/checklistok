import { async } from '@firebase/util';
import { dbRT } from '../firebase/firebaseConfig';
import { get, child } from 'firebase/database';

export const getChildData = (ref) => {
    try {
        return get(child(dbRT, ref));
    } catch (error) {
        console.log(error);
    }
};
