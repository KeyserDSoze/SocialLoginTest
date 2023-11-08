import { SocialParameter } from "./SocialParameter";

export interface SocialLoginSettings {
    apiUri: string;
    redirectUri: string;
    automaticRefresh: boolean;
    title: string;
    google: SocialParameter;
    microsoft: SocialParameter;
}
