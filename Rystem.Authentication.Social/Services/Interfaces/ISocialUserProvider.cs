namespace Rystem.Authentication.Social
{
    public interface ISocialUserProvider
    {
        Task<SocialUser> GetAsync(string? username, CancellationToken cancellationToken);
    }
}
