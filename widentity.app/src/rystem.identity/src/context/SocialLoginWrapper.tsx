import { useReducer } from "react";
import { useSocialToken } from "../setup/useSocialToken";
import { SocialLoginContextUpdate, SocialLoginContextRefresh } from "./SocialLoginContext";
import { SocialLoginManager } from "../setup/SocialLoginManager";


export const SocialLoginWrapper = (c: { children: any; }) => {
    const [renderingKey, forceUpdate] = useReducer(x => x + 1, 0);
    SocialLoginManager.Instance(null).refresher = () => forceUpdate();
    const forceRefresh = () => {
        const oldToken = useSocialToken();
        SocialLoginManager.Instance(null).updateToken(0, oldToken.refreshToken);
    };
    return (
        <div key={renderingKey}>
            <SocialLoginContextUpdate.Provider value={forceUpdate}>
                <SocialLoginContextRefresh.Provider value={forceRefresh}>
                    {c.children}
                </SocialLoginContextRefresh.Provider>
            </SocialLoginContextUpdate.Provider>
        </div>
    );
};
