import React, { useReducer } from "react";

export const SocialLoginContext = React.createContext<React.DispatchWithoutAction>(() => { });

export const SocialLoginWrapper = (c: { children: any }) => {
    const [renderingKey, forceUpdate] = useReducer(x => x + 1, 0);
    return (
        <div key={renderingKey}>
            <SocialLoginContext.Provider value={forceUpdate}>
                {c.children}
                <button onClick={() => forceUpdate()}>force</button>
            </SocialLoginContext.Provider>
        </div>
    );
}
