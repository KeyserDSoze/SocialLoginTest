import { SocialLoginSettings } from "./SocialLoginSettings";
import { SocialLoginManager } from "./SocialLoginManager";

export const getSocialLoginSettings = function(): SocialLoginSettings {
    return SocialLoginManager.Instance(null).settings;
};
