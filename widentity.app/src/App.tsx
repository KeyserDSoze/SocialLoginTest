import './App.css'
//import Login from './authentication/Login'
import { setupSocialLogin } from "./rystem.identity/src/setup/setupSocialLogin"
import { SocialLoginWrapper } from './rystem.identity/src/context/SocialLoginContext'
import { Wrapper } from './components/wrapper'

setupSocialLogin(x => {
    x.apiUri = "https://localhost:7003";
    x.google.clientId = "23769141170-lfs24avv5qrj00m4cbmrm202c0fc6gcg.apps.googleusercontent.com";
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
