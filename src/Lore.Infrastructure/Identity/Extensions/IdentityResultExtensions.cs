using System.Linq;
using Lore.Application.Common.Models;
using Microsoft.AspNetCore.Identity;

namespace Lore.Infrastructure.Identity.Extensions
{
    public static class IdentityResultExtensions
    {
        public static OperationResult ToApplicationResult(this IdentityResult result)
            => result.Succeeded
                ? OperationResult.Success()
                : OperationResult.Failure(result.Errors.Select(e => e.Description));
    }
}
