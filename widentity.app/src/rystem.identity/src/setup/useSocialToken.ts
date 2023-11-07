import { Token } from "./Token";


export const useSocialToken = function (): Token {
    const token = localStorage.getItem("socialUserToken");
    if (token != null) {
        const currentToken = JSON.parse(token) as Token;
        console.log(currentToken);
        currentToken.expiresIn = new Date(currentToken.expiresIn);
        currentToken.isExpired = currentToken.expiresIn.getTime() < new Date().getTime();
        return currentToken;
    }
    return { isExpired: true } as Token;
};
