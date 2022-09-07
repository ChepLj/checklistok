import style from './Login.module.css';

import { auth, db, providerFB, providerGG } from '../../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, signInWithRedirect, getRedirectResult } from 'firebase/auth';

function Login() {
    const navigate = useNavigate();
    // Sign In With Facebook
    const handelSignInFB = () => {
        signInWithRedirect(auth, providerFB)
            .then((result) => {
                console.log(result);
                navigate('/main');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    //   Sign In With Google
    const handelSignInGG = () => {
        signInWithPopup(auth, providerGG)
            .then((result) => {
                console.log(result);
                navigate('/main');
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div className="form">
            <h2>Login</h2>
            <button onClick={handelSignInFB}>Login with Facebook</button>
            <button onClick={handelSignInGG}>Login with Google</button>
        </div>
    );
}
export default Login;
