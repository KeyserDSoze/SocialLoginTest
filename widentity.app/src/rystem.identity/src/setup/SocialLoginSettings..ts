import { SocialLoginSettings } from "./SocialLoginSettings";

export class SocialLoginManager {
    private static instance: SocialLoginManager | null;
    public settings: SocialLoginSettings;
    private constructor(settings: SocialLoginSettings | null) {
        this.settings = settings ?? {} as SocialLoginSettings;
    }
    public static Instance(settings: SocialLoginSettings | null): SocialLoginManager {
        if (SocialLoginManager.instance == null)
            SocialLoginManager.instance = new SocialLoginManager(settings);
        return SocialLoginManager.instance;
    }
}

