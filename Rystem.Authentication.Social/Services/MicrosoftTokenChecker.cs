using Microsoft.IdentityModel.Protocols;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace Rystem.Authentication.Social
{
    internal sealed class MicrosoftTokenChecker : ITokenChecker
    {
        public async Task<string> CheckTokenAndGetUsernameAsync(IHttpClientFactory clientFactory, SocialLoginBuilder loginBuilder, string code, CancellationToken cancellationToken)
        {
            var token = new JwtSecurityToken(code);
            IConfigurationManager<OpenIdConnectConfiguration> configurationManager = new ConfigurationManager<OpenIdConnectConfiguration>($"{token.Payload.Iss }/.well-known/openid-configuration", new OpenIdConnectConfigurationRetriever());
            OpenIdConnectConfiguration openIdConfig = await configurationManager.GetConfigurationAsync(cancellationToken);
            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateIssuerSigningKey = true,
                ValidateLifetime = true,
                ValidateSignatureLast = true,
                IssuerSigningKeys = openIdConfig.SigningKeys
            };
            try
            {

                var tokenHandler = new JwtSecurityTokenHandler();
                tokenHandler.ValidateToken(code, validationParameters, out SecurityToken validatedToken);
                var jwt = (JwtSecurityToken)validatedToken;
                return jwt.Claims.First(x => x.Type == "email").Value;
            }
            catch (SecurityTokenValidationException)
            {
                return string.Empty;
            }
        }
    }
}
