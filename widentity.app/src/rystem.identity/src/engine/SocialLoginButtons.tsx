import { getSocialLoginSettings } from "../setup/getSocialLoginSettings";
import { useCallback, useContext, useState } from 'react';
import {
    LoginSocialGoogle,
    LoginSocialMicrosoft,
    IResolveParams,
} from 'reactjs-social-login';

import {
    GoogleLoginButton,
    MicrosoftLoginButton,
} from 'react-social-login-buttons';
import { Token } from "../setup/Token";
import { SocialToken } from "../setup/SocialToken";
import { SocialLoginContext } from "../context/SocialLoginContext";

export const SocialLoginButtons = () => {
    const settings = getSocialLoginSettings();
    const [provider, setProvider] = useState('');
    const [token, setToken] = useState<Token>();
    const socialContext = useContext(SocialLoginContext);
    const onLoginStart = useCallback(() => {
    }, []);
    const setProfile = (provider: number, data: any) => {
        fetch(`${settings.apiUri}/api/Authentication/Social/Token?provider=${provider}&code=${data.code}`)
            .then(t => {
                return t.json();
            })
            .then(t => {
                const tok = t as SocialToken;
                const newToken = {
                    accessToken: tok.accessToken,
                    refreshToken: tok.refreshToken,
                    isExpired: false,
                    expiresIn: new Date(new Date().getTime() + tok.expiresIn * 1000)
                } as Token;
                localStorage.setItem("socialUserToken", JSON.stringify(newToken));
                setToken(newToken);
                socialContext();
            });
    };
    return (
        <>
            <div className={`App ${provider && token ? 'hide' : ''}`}>
                <h1 className="title">{settings.title}</h1>
                {settings.google.clientId != null &&
                    <LoginSocialGoogle
                        client_id={settings.google.clientId}
                        onLoginStart={onLoginStart}
                        redirect_uri={settings.redirectUri}
                        scope="openid profile email"
                        discoveryDocs="claims_supported"
                        access_type="offline"
                        isOnlyGetToken={true}
                        onResolve={({ provider, data }: IResolveParams) => {
                            setProvider(provider);
                            setProfile(0, data);
                        }}>
                        <GoogleLoginButton />
                    </LoginSocialGoogle>
                }
                {settings.microsoft.clientId &&
                    <LoginSocialMicrosoft
                        client_id={settings.microsoft.clientId}
                        redirect_uri={settings.redirectUri}
                        onLoginStart={onLoginStart}
                        onResolve={({ provider, data }: IResolveParams) => {
                            setProvider(provider);
                            setProfile(1, data);
                        }}
                        onReject={(err: any) => {
                            console.log(err);
                        }}
                    >
                        <MicrosoftLoginButton />
                    </LoginSocialMicrosoft>
                }
            </div>
        </>
    );
}