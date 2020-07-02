using System;
using System.Collections.Generic;
using System.Linq;
using Lore.Application.Common.Extensions.Linq;
using Lore.Application.Common.Interfaces;

namespace Lore.Application.Common.Extensions.EF
{
    public static class UpdateManyToManyExtensions
    {
        public static void TryPatchManyToMany<T, TKey>(this ILoreDbContext db, IEnumerable<T> currentItems, IEnumerable<T> newItems, Func<T, TKey> getKey) where T : class
        {
            var cre = newItems.Except(currentItems, getKey);
            db.Set<T>().RemoveRange(currentItems.Except(newItems, getKey));
            db.Set<T>().AddRange(newItems.Except(currentItems, getKey));
        }
    }
}
