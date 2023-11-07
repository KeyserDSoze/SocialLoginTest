import { SocialLoginSettings } from "./SocialLoginSettings";
import { SocialLoginManager } from "./SocialLoginSettings.";

export const getSocialLoginSettings = function(): SocialLoginSettings {
    return SocialLoginManager.Instance(null).settings;
};
