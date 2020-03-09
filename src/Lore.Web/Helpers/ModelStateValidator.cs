using Microsoft.AspNetCore.Mvc;

namespace Lore.Web.Helpers
{
    public static class ModelStateValidator
    {
        public static IActionResult ValidateModelState(ActionContext context)
        {
            return new BadRequestObjectResult(context.ModelState);
        }
    }
}
