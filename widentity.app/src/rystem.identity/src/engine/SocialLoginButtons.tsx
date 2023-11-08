import { getSocialLoginSettings } from "../setup/getSocialLoginSettings";
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
import { SocialLoginSettings } from "../models/setup/SocialLoginSettings";
import React from "react";

const getGoogleButton = (settings: SocialLoginSettings, setProfile: (provider: number, code: any) => void): JSX.Element => {
    return (
        <>
            {settings.google.clientId != null &&
                <LoginSocialGoogle
                    client_id={settings.google.clientId}
                    redirect_uri={settings.redirectUri}
                    scope="openid profile email"
                    discoveryDocs="claims_supported"
                    access_type="offline"
                    isOnlyGetToken={true}
                    onResolve={(x: IResolveParams) => {
                        setProfile(1, x.data?.code);
                    }}
                    onReject={function (): void {

                    } }>
                    <GoogleLoginButton />
                </LoginSocialGoogle>
            }
        </>
    );
}
const getMicrosoftButton = (settings: SocialLoginSettings, setProfile: (provider: number, code: any) => void): JSX.Element => {
    return (
        <>
            {settings.microsoft.clientId &&
                <LoginSocialMicrosoft
                    client_id={settings.microsoft.clientId}
                    tenant="consumers"
                    redirect_uri={settings.redirectUri}
                    onResolve={(x: IResolveParams) => {
                        setProfile(2, x.data?.id_token);
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

const getButtons = new Array<(settings: SocialLoginSettings, setProfile: (provider: number, code: any) => void) => JSX.Element>;
getButtons.push(getGoogleButton);
getButtons.push(getMicrosoftButton);

export const SocialLoginButtons = () => {
    const settings = getSocialLoginSettings();
    const setProfile = (provider: number, code: any) => {
        SocialLoginManager.Instance(null).updateToken(provider, code);
    };
    return (
        <>
            {settings.title != null && <h1 className="title">{settings.title}</h1>}
            {getButtons.map(getButton => getButton(settings, setProfile))}
        </>
    );
}