using Microsoft.AspNetCore.Identity;

namespace Lore.Infrastructure.Identity
{
    public class ApplicationRole : IdentityRole
    {
        public string Description { get; set; }
    }
}
