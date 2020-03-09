using System.ComponentModel.DataAnnotations;

namespace Lore.Web.Models
{
    public class UserCredentials
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
