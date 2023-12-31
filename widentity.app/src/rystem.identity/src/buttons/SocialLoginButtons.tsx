import { getSocialLoginSettings } from "../setup/getSocialLoginSettings";
import {
    LoginSocialGoogle,
    LoginSocialMicrosoft,
    IResolveParams,
    LoginSocialFacebook,
} from 'reactjs-social-login';

import {
    FacebookLoginButton,
    GoogleLoginButton,
    MicrosoftLoginButton,
} from 'react-social-login-buttons';
import { SocialLoginManager } from "../setup/SocialLoginManager";
import { SocialLoginSettings } from "../models/setup/SocialLoginSettings";
import React from "react";

interface SocialButtonValue {
    element: JSX.Element,
    position: number
}

const getGoogleButton = (settings: SocialLoginSettings, setProfile: (provider: number, code: any) => void): SocialButtonValue => {
    const redirectUri = `${settings.redirectDomain}/account/login`;
    return {
        position: settings.google.indexOrder,
        element: (
            <div key="g">
                {settings.google.clientId != null &&
                    <LoginSocialGoogle
                        client_id={settings.google.clientId}
                        redirect_uri={redirectUri}
                        scope="openid profile email"
                        discoveryDocs="claims_supported"
                        access_type="offline"
                        isOnlyGetToken={true}
                        onResolve={(x: IResolveParams) => {
                            setProfile(1, x.data?.code);
                        }}
                        onReject={function (): void {
                        }}>
                        <GoogleLoginButton />
                    </LoginSocialGoogle>
                }
            </div>
        )
    } as SocialButtonValue;
}

const getMicrosoftButton = (settings: SocialLoginSettings, setProfile: (provider: number, code: any) => void): SocialButtonValue => {
    const redirectUri = `${settings.redirectDomain}/account/login`;
    return {
        position: settings.microsoft.indexOrder,
        element: (
            <div key="m">
                {settings.microsoft.clientId &&
                    <LoginSocialMicrosoft
                        client_id={settings.microsoft.clientId}
                        tenant="consumers"
                        redirect_uri={redirectUri}
                        onResolve={(x: IResolveParams) => {
                            setProfile(2, x.data?.id_token);
                        }}
                        onReject={(err: any) => {
                            console.log(err);
                        }}
                        isOnlyGetToken={true}
                    >
                        <MicrosoftLoginButton />
                    </LoginSocialMicrosoft>
                }
            </div>
        )
    } as SocialButtonValue;
}

const getFacebookButton = (settings: SocialLoginSettings, setProfile: (provider: number, code: any) => void): SocialButtonValue => {
    const redirectUri = `${settings.redirectDomain}/account/login`;
    return {
        position: settings.facebook.indexOrder,
        element: (
            <div key="f">
                {settings.facebook.clientId != null &&
                    <LoginSocialFacebook
                        appId={settings.facebook.clientId}
                        fieldsProfile={
                            'id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender'
                        }
                        redirect_uri={redirectUri}
                        onResolve={(x: IResolveParams) => {
                            setProfile(3, x.data?.accessToken);
                        }}
                        onReject={err => {
                        }}
                        isOnlyGetToken={true}
                    >
                        <FacebookLoginButton />
                    </LoginSocialFacebook>
                }
            </div>
        )
    } as SocialButtonValue;
}

const getButtons = new Array<(settings: SocialLoginSettings, setProfile: (provider: number, code: any) => void) => SocialButtonValue>;
getButtons.push(getGoogleButton);
getButtons.push(getMicrosoftButton);
getButtons.push(getFacebookButton);

export const SocialLoginButtons = () => {
    const settings = getSocialLoginSettings();
    const setProfile = (provider: number, code: any) => {
        SocialLoginManager.Instance(null).updateToken(provider, code);
    };
    return (
        <>
            {settings.title != null && <h1 className="title">{settings.title}</h1>}
            {getButtons
                .sort((x1, x2) => x1(settings, setProfile).position - x2(settings, setProfile).position)
                .map(value => value(settings, setProfile).element)}
        </>
    );
}