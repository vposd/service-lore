using System;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Lore.Web.Helpers
{
    public class CommaSeparatedModelBinder : IModelBinder
    {
        public Task BindModelAsync(ModelBindingContext bindingContext)
        {
            if (bindingContext.ModelType == null || bindingContext.FieldName == null)
            {
                return Task.CompletedTask;
            }

            var result = HttpUtility.ParseQueryString(bindingContext.ActionContext.HttpContext.Request.QueryString.Value);
            var key = result.AllKeys
                .Select(s => s.Trim().ToLower())
                .Where(s => s == bindingContext.FieldName.ToLower())
                .FirstOrDefault();

            var value = result.Get(key);

            if (string.IsNullOrEmpty(value))
            {
                return Task.CompletedTask;
            }

            var elementType = bindingContext.ModelType.GetElementType();
            var converter = TypeDescriptor.GetConverter(elementType);
            var values = Array.ConvertAll(ParseColumns(value), x => converter.ConvertFromString(x != null ? x.Trim() : x));
            var typedValues = Array.CreateInstance(elementType, values.Length);

            values.CopyTo(typedValues, 0);

            bindingContext.Result = ModelBindingResult.Success(typedValues);

            return Task.CompletedTask;
        }

        private string[] ParseColumns(string input)
        {
            var splitted = input
                .Split(',');

            if (splitted.Length == 0)
            {
                return new [] { input };
            }

            return splitted
                .Select(x => x.TrimEnd().TrimStart())
                .ToArray();

        }
    }
}
