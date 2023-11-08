using Rystem.Authentication.Social;

namespace Widentity.Test.Api.Services
{
    internal sealed class SocialUserProvider : ISocialUserProvider
    {
        public Task<SocialUser> GetAsync(string username, CancellationToken cancellationToken)
        {
            return Task.FromResult(new SocialUser
            {
                Username = $"a {username}"
            });
        }
    }
}
