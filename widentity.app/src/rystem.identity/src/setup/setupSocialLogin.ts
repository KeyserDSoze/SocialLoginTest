import { SocialLoginSettings } from "./SocialLoginSettings";
import { SocialParameter } from "./SocialParameter";
import { SocialLoginManager } from "./SocialLoginManager";


export const setupSocialLogin = function (settings: (settings: SocialLoginSettings) => void): SocialLoginManager {
    const url = new URL(window.location.href);
    const baseUri = `${url.protocol}//${url.host}`;
    const parameters = {
        apiUri: baseUri,
        title: "Social Login",
        redirectUri: `${baseUri}/account/login`,
        google: {} as SocialParameter,
        microsoft: {} as SocialParameter
    } as SocialLoginSettings;
    settings(parameters);
    return SocialLoginManager.Instance(parameters);
};
