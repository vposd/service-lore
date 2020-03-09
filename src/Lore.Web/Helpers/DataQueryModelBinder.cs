using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Lore.Web.Models;

namespace Lore.Web.Helpers
{
    public class DataQueryModelBinder : IModelBinder
    {
        public Task BindModelAsync(ModelBindingContext bindingContext)
        {
            if (bindingContext.ModelType == null)
            {
                return Task.CompletedTask;
            }

            var result = HttpUtility.ParseQueryString(bindingContext.ActionContext.HttpContext.Request.QueryString.Value);
            var query = new DataQuery();

            foreach (var key in result.AllKeys.Select(s => s.Trim().ToLower()))
            {
                switch (key)
                {
                    case "skip":
                        query.Skip = Convert.ToUInt32(result.Get(key));
                        break;
                    case "take":
                        query.Take = Convert.ToUInt32(result.Get(key));
                        break;
                    case "sort":
                        query.Sort = result.Get(key);
                        break;
                    case "filter":
                        query.Filter = result.Get(key);
                        break;
                    case "q":
                        query.Search = result.Get(key);
                        break;
                    case "col":
                        query.SearchColumns = ParseColumns(result.Get(key));
                        break;
                }
            }

            bindingContext.Result = ModelBindingResult.Success(query);

            return Task.CompletedTask;
        }

        private List<string> ParseColumns(string input)
        {
            var splitted = input
                .Split(',');

            if (splitted.Length > 0)
            {
                return splitted
                    .Select(x => x.TrimEnd().TrimStart())
                    .ToList();
            }

            return new List<string>
            {
                input
            };
        }
    }
}
