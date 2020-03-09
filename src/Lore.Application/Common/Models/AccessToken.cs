namespace Lore.Application.Common.Models
{
    public sealed class AccessToken
    {
        public string Token { get; }
        public int ValidTo { get; }

        public AccessToken(string token, int validTo)
        {
            Token = token;
            ValidTo = validTo;
        }
    }
}
