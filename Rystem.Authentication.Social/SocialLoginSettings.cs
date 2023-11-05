﻿namespace Rystem.Authentication.Social
{
    public sealed class SocialLoginSettings
    {
        public string? ClientId { get; set; }
        public string? ClientSecret { get; set; }
        public string? RedirectUri { get; set; }
        public bool HasValue => ClientId != null && ClientSecret != null && RedirectUri != null;
    }
}
