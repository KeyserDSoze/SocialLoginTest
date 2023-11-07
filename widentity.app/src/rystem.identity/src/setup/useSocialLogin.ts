import { SocialLoginManager } from "./SocialLoginSettings.";

export const useSocialLogin = function(): SocialLoginManager {
    return SocialLoginManager.Instance(null);
};
