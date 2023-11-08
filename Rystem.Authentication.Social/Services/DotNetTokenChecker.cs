﻿using Microsoft.AspNetCore.Authentication.BearerToken;
using Microsoft.Extensions.Options;

namespace Rystem.Authentication.Social
{
    internal sealed class DotNetTokenChecker : ITokenChecker
    {
        private readonly BearerTokenOptions _options;
        public DotNetTokenChecker(IOptionsMonitor<BearerTokenOptions> options)
        {
            _options = options.Get(BearerTokenDefaults.AuthenticationScheme);
        }

        public Task<string> CheckTokenAndGetUsernameAsync(IHttpClientFactory clientFactory, SocialLoginBuilder loginBuilder, string code, CancellationToken cancellationToken)
        {
            var ticket = _options.RefreshTokenProtector.Unprotect(code);
            var identity = ticket?.Principal?.Identity;
            if (identity?.IsAuthenticated == true)
                return Task.FromResult(identity.Name ?? string.Empty);
            else
                return Task.FromResult(string.Empty);
        }
    }
}
