import { SocialLoginSettings } from "./SocialLoginSettings";
import { SocialParameter } from "./SocialParameter";
import { SocialLoginManager } from "./SocialLoginSettings.";


export const setupSocialLogin = function(settings: (settings: SocialLoginSettings) => void): SocialLoginManager {
    const parameters = {
        apiUri: window.location.hostname,
        title: "Social Login",
        redirectUri: `$https://${window.location.hostname}/account/login`,
        google: {} as SocialParameter,
        microsoft: {} as SocialParameter
    } as SocialLoginSettings;
    settings(parameters);
    return SocialLoginManager.Instance(parameters);
};
