import { SocialLoginSettings } from "../models/setup/SocialLoginSettings";
import { SocialParameter } from "../models/setup/SocialParameter";
import { SocialLoginManager } from "./SocialLoginManager";


export const setupSocialLogin = function (settings: (settings: SocialLoginSettings) => void): SocialLoginManager {
    const url = new URL(window.location.href);
    const baseUri = `${url.protocol}//${url.host}`;
    const parameters = {
        apiUri: baseUri,
        title: null,
        redirectUri: `${baseUri}/account/login`,
        google: {} as SocialParameter,
        microsoft: {} as SocialParameter
    } as SocialLoginSettings;
    settings(parameters);
    return SocialLoginManager.Instance(parameters);
};
