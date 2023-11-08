import { SocialParameter } from "./SocialParameter";

export interface SocialLoginSettings {
    apiUri: string;
    redirectUri: string;
    automaticRefresh: boolean;
    title: string | null;
    google: SocialParameter;
    microsoft: SocialParameter;
}
