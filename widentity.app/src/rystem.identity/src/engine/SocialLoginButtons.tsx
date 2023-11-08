import { getSocialLoginSettings } from "../setup/getSocialLoginSettings";
import { useCallback } from 'react';
import {
    LoginSocialGoogle,
    LoginSocialMicrosoft,
    IResolveParams,
} from 'reactjs-social-login';

import {
    GoogleLoginButton,
    MicrosoftLoginButton,
} from 'react-social-login-buttons';
import { SocialLoginManager } from "../setup/SocialLoginManager";

export const SocialLoginButtons = () => {
    const settings = getSocialLoginSettings();
    const onLoginStart = useCallback(() => {
    }, []);
    const setProfile = (provider: number, code: any) => {
        SocialLoginManager.Instance(null).updateToken(provider, code);
    };
    return (
        <>
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
                    onResolve={({ data }: IResolveParams) => {
                        setProfile(1, data.code);
                    }}>
                    <GoogleLoginButton />
                </LoginSocialGoogle>
            }
            {settings.microsoft.clientId &&
                <LoginSocialMicrosoft
                    client_id={settings.microsoft.clientId}
                    tenant="consumers"
                    redirect_uri={settings.redirectUri}
                    onLoginStart={onLoginStart}
                    onResolve={({ data }: IResolveParams) => {
                        setProfile(2, data.id_token);
                    }}
                    onReject={(err: any) => {
                        console.log(err);
                    }}
                >
                    <MicrosoftLoginButton />
                </LoginSocialMicrosoft>
            }
        </>
    );
}