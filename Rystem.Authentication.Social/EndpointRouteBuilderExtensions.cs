using Google.Apis.Auth;
using Microsoft.AspNetCore.Authentication.BearerToken;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Rystem.Authentication.Social;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Security.Claims;

namespace Microsoft.Extensions.DependencyInjection
{
    public static partial class EndpointRouteBuilderExtensions
    {
        public static IApplicationBuilder UseSocialLoginEndpoint(this IApplicationBuilder app)
        {
            app.UseAuthentication();
            app.UseAuthorization();
            if (app is IEndpointRouteBuilder endpointBuilder)
                endpointBuilder.Map("api/Authentication/Social/Token", async ([FromServices] SocialLoginBuilder socialSettings,
                    [FromServices] IHttpClientFactory clientFactory,
                    [FromServices] IClaimsCreator? claimCreator,
                [FromQuery] ProviderType provider,
                [FromQuery] string code,
                CancellationToken cancellationToken) =>
                {
                    string? username;
                    switch (provider)
                    {
                        case ProviderType.Google:
                            username = await GetGoogleUsernameAsync(clientFactory, socialSettings.Google, code, cancellationToken);
                            break;
                        default:
                            username = null;
                            break;
                    }
                    if (!string.IsNullOrWhiteSpace(username))
                    {
                        var claims = claimCreator == null ? new[] { new Claim(ClaimTypes.Name, username) } : await claimCreator.GetClaimsAsync(username, cancellationToken);
                        var claimsPrincipal = new ClaimsPrincipal(
                         new ClaimsIdentity(claims,
                           BearerTokenDefaults.AuthenticationScheme
                         )
                       );
                        return Results.SignIn(claimsPrincipal);
                    }
                    return Results.BadRequest();
                });
            return app;
        }
        private const string GooglePostMessage = "client_id={0}&client_secret={1}&grant_type=authorization_code&code={2}&redirect_uri={3}";
        private static async Task<string> GetGoogleUsernameAsync(IHttpClientFactory clientFactory, SocialLoginSettings settings, string code, CancellationToken cancellationToken)
        {
            var client = clientFactory.CreateClient(Constants.GoogleAuthenticationClient);
            var content = new StringContent(string.Format(GooglePostMessage, settings.ClientId, settings.ClientSecret, code, settings.RedirectUri), new MediaTypeHeaderValue("application/x-www-form-urlencoded"));
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
