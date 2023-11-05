using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Authentication.BearerToken;
using Rystem.Authentication.Social;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddSocialLogin(this IServiceCollection services,
            Action<SocialLoginBuilder> settings,
            Action<BearerTokenOptions>? action = null)
        {
            services
                .AddAuthentication()
                .AddBearerToken(action!);
            SocialLoginBuilder builder = new();
            settings(builder);
            services.AddSingleton(builder);
            if (builder.Google.HasValue)
            {
                services.AddHttpClient(Constants.GoogleAuthenticationClient, x =>
                {
                    x.BaseAddress = new Uri("https://oauth2.googleapis.com/token");
                });
            }
            return services;
        }
        public static IServiceCollection AddSocialLoginStorage<TStorage>(this IServiceCollection services, ServiceLifetime lifetime = ServiceLifetime.Transient)
            where TStorage : class, IClaimsCreator
        {
            services.AddService<IClaimsCreator, TStorage>(lifetime);
            return services;
        }
    }
}
