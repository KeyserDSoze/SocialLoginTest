import { SocialParameter } from "./SocialParameter";

export interface SocialLoginSettings {
    apiUri: string;
    redirectUri: string;
    title: string;
    google: SocialParameter;
    microsoft: SocialParameter;
}
