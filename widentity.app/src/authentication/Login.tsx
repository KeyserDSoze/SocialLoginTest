import { useCallback, useState } from 'react';
import { User } from './User';
import {
    LoginSocialGoogle,
    IResolveParams,
} from 'reactjs-social-login';

import {
    GoogleLoginButton,
} from 'react-social-login-buttons';

const REDIRECT_URI =
    'https://localhost:5173/account/login';

const Login = () => {
    const [provider, setProvider] = useState('');
    const [profile, setProfile] = useState<any>();

    const onLoginStart = useCallback(() => {
    }, []);

    const onLogout = useCallback(() => { }, []);

    return (
        <>
            {provider && profile && (
                <User provider={provider} profile={profile} onLogout={onLogout} />
            )}
            <div className={`App ${provider && profile ? 'hide' : ''}`}>
                <h1 className="title">ReactJS Social Login</h1>

                <LoginSocialGoogle
                    client_id={'23769141170-lfs24avv5qrj00m4cbmrm202c0fc6gcg.apps.googleusercontent.com'}
                    onLoginStart={onLoginStart}
                    redirect_uri={REDIRECT_URI}
                    scope="openid profile email"
                    discoveryDocs="claims_supported"
                    access_type="offline"
                    isOnlyGetToken={true}
                    onResolve={({ provider, data }: IResolveParams) => {
                        console.log(provider);
                        setProvider(provider);
                        console.log(data);
                        setProfile(data);
                        console.log(data.code);
                        fetch("https://localhost:7003/api/Authentication/Social/Token?provider=0&code=" + data.code)
                            .then(t => {
                                console.log(t);
                            });
                    }}
                >
                    <GoogleLoginButton />
                </LoginSocialGoogle>
            </div>
        </>
    );
};

export default Login;