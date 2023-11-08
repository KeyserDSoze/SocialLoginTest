using Google.Apis.Auth;
using System.Net.Http.Headers;
using System.Net.Http.Json;

namespace Rystem.Authentication.Social
{
    internal sealed class GoogleTokenChecker : ITokenChecker
    {
        private const string GooglePostMessage = "client_id={0}&client_secret={1}&grant_type=authorization_code&code={2}&redirect_uri={3}";
        private static readonly MediaTypeHeaderValue s_mediaTypeHeaderValue = new("application/x-www-form-urlencoded");
        public async Task<string> CheckTokenAndGetUsernameAsync(IHttpClientFactory clientFactory, SocialLoginBuilder loginBuilder, string code, CancellationToken cancellationToken)
        {
            var settings = loginBuilder.Google;
            var client = clientFactory.CreateClient(Constants.GoogleAuthenticationClient);
            var content = new StringContent(string.Format(GooglePostMessage, settings.ClientId, settings.ClientSecret, code, settings.RedirectUri), s_mediaTypeHeaderValue);
            var response = await client.PostAsync(string.Empty, content);
            if (response.IsSuccessStatusCode)
            {
                var message = await response.Content.ReadFromJsonAsync<AuthenticationResponse>(cancellationToken);
                if (message != null)
                {
                    var payload = await GoogleJsonWebSignature.ValidateAsync(message.IdToken);
                    return payload.Email;
                }
            }
            return string.Empty;
        }
    } 
}
