namespace Lore.Application.Common.Models
{
    public class AuthResult
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
        public int Expires { get; set; }
    }
}
