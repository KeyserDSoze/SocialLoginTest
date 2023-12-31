import './App.css'
import { Wrapper } from './components/wrapper'
import { SocialLoginWrapper, setupSocialLogin } from './rystem.identity/src';

setupSocialLogin(x => {
    x.apiUri = "https://localhost:7003";
    x.google.clientId = "23769141170-lfs24avv5qrj00m4cbmrm202c0fc6gcg.apps.googleusercontent.com";
    x.google.indexOrder = 1;
    x.microsoft.clientId = "0b90db07-be9f-4b29-b673-9e8ee9265927";
    x.microsoft.indexOrder = 0;
    x.facebook.clientId = "345885718092912";
    x.facebook.indexOrder = 2;
    x.automaticRefresh = true;
});
function App() {
    return (
        <>
            <SocialLoginWrapper>
                <Wrapper></Wrapper>
            </SocialLoginWrapper>
        </>
    )
}

export default App
