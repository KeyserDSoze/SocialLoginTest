using Widentity.Test.Api.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSocialLogin(x =>
{
    x.Google.ClientId = builder.Configuration["SocialLogin:Google:ClientId"];
    x.Google.ClientSecret = builder.Configuration["SocialLogin:Google:ClientSecret"];
    x.Google.RedirectUri = builder.Configuration["SocialLogin:Google:RedirectUri"];
    x.Microsoft.ClientId = builder.Configuration["SocialLogin:Microsoft:ClientId"];
    x.Microsoft.ClientSecret = builder.Configuration["SocialLogin:Microsoft:ClientSecret"];
    x.Microsoft.RedirectUri = builder.Configuration["SocialLogin:Microsoft:RedirectUri"];
},
x =>
{
    x.BearerTokenExpiration = TimeSpan.FromHours(1);
    x.RefreshTokenExpiration = TimeSpan.FromDays(10);
});
builder.Services.AddSocialUserProvider<SocialUserProvider>();
builder.Services.AddAuthorization();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(x =>
{
    x.AddPolicy("all", t =>
    {
        t.AllowAnyHeader().AllowAnyOrigin();
    });
});
var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("all");
app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();
app.UseSocialLoginEndpoint();
app.MapControllers();

app.Run();
