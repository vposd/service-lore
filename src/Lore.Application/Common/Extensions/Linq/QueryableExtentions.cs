using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using Lore.Application.Common.Extensions.StringToExpression;
using Lore.Application.Common.Models;

namespace Lore.Application.Common.Extensions.Linq
{
    public static class QueryableExtensions
    {
        /// <summary>
        /// Apply query request to queryable chain
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="parentQuery"></param>
        /// <param name="query"></param>
        /// <param name="selectCount">Select count after filter but before pagination</param>
        /// <returns></returns>
        public static IQueryable<T> ApplyQuery<T>(this IQueryable<T> parentQuery, QueryRequest query, out int selectCount)
        {
            if (query == null)
            {
                selectCount = default;
                return parentQuery;
            }

            var filteredRequest = parentQuery
                .Search(query.Search, query.SearchColumns)
                .ApplySort(query.Sort)
                .ApplyFilter(query.Filter);

            selectCount = filteredRequest.Count();

            return filteredRequest
                .Paginate(query.Skip, query.Take);
        }

        /// <summary>
        /// Apply filter to query
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="query"></param>
        /// <param name="filter">Filter string in OData format</param>
        /// <returns></returns>
        public static IQueryable<T> ApplyFilter<T>(this IQueryable<T> query, string filter)
        {
            if (string.IsNullOrEmpty(filter))
            {
                return query;
            }

            try
            {
                var compiledFilter = new FilterQueryLanguage().Parse<T>(filter);
                return query.Where(compiledFilter);
            }
            catch (Exception e)
            {
                throw new FormatException($"Provided filter expression '{filter}' has incorrect format", e);
            }
        }

        /// <summary>
        /// Apply filter to query
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="query"></param>
        /// <param name="filter">Filter string in OData format</param>
        /// <returns></returns>
        public static IQueryable<T> ApplySort<T>(this IQueryable<T> query, string sort)
        {
            if (string.IsNullOrEmpty(sort))
            {
                return query;
            }

            var orderedQuery = new OrderByQueryLanguage().Parse<T>(sort, query.Expression);

            return query.Provider.CreateQuery<T>(orderedQuery);
        }

        /// <summary>
        /// Paginate query
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="query"></param>
        /// <param name="skip">Skip count</param>
        /// <param name="take">Take count</param>
        /// <returns></returns>
        public static IQueryable<T> Paginate<T>(this IQueryable<T> query, uint? skip, uint? take) => query
            .SkipIf(skip.HasValue, (int)skip.GetValueOrDefault())
            .TakeIf(take.HasValue, (int)take.GetValueOrDefault());

        /// <summary>
        /// Search by string properties
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="query"></param>
        /// <param name="skip">Search query</param>
        /// <param name="take">Properties to search</param>
        /// <returns></returns>
        public static IQueryable<T> Search<T>(this IQueryable<T> query, string searchQuery, List<string> searchColumns)
        {
            if (string.IsNullOrEmpty(searchQuery))
            {
                return query;
            }

            var entityType = typeof(T);
            var searchParameterValue = Expression.Constant(searchQuery.ToUpper(), typeof(string));
            var propertiesContains = new List<Expression>();
            var x = Expression.Parameter(entityType, "x");

            Expression containsExpression(Expression property)
            {
                var containsMethod = typeof(string).GetMethod("Contains", new [] { typeof(string) });
                var toUpperMethod = typeof(string).GetMethod("ToUpper", Array.Empty<Type>());
                var propertyToUpper = Expression.Call(property, toUpperMethod);
                return Expression.Call(propertyToUpper, containsMethod, searchParameterValue);
            }

            Expression anyExpression(Type elementType, Expression property)
            {
                var anyMethod = typeof(Enumerable).GetMethods().Single(m => m.Name == "Any" && m.GetParameters().Length == 2);
                var innerParameter = Expression.Parameter(elementType, "z");
                var innerExpression = typeof(SimpleEntityModel).IsAssignableFrom(elementType) ?
                    containsExpression(Expression.Property(innerParameter, "Name")) :
                    containsExpression(innerParameter);
                var innerLambda = Expression.Lambda(innerExpression, innerParameter);
                return Expression.Call(anyMethod.MakeGenericMethod(elementType), property, innerLambda);
            }

            if (searchColumns == null)
            {
                return query;
            }

            foreach (var column in searchColumns)
            {
                var propertyInfo = entityType.GetProperty(column, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);
                if (propertyInfo == null)
                {
                    continue;
                }

                var property = Expression.Property(x, column);

                if (IsMultipleValuesType(propertyInfo.PropertyType))
                {
                    var elementType = GetElementsType(propertyInfo.PropertyType);
                    propertiesContains.Add(anyExpression(elementType, property));
                    continue;
                }

                if (typeof(SimpleEntityModel).IsAssignableFrom(propertyInfo.PropertyType))
                {
                    property = Expression.Property(property, "Name");
                }

                propertiesContains.Add(containsExpression(property));
            }

            if (!propertiesContains.Any())
            {
                return query;
            }

            var root = propertiesContains.Aggregate((left, right) => Expression.Or(left, right));
            var lambda = Expression.Lambda<Func<T, bool>>(root, x);
            return query.Where(lambda);
        }

        private static IQueryable<T> SkipIf<T>(this IQueryable<T> query, bool predicate, int skip) => predicate ? query.Skip(skip) : query;

        private static IQueryable<T> TakeIf<T>(this IQueryable<T> query, bool predicate, int skip) => predicate ? query.Take(skip) : query;

        private static bool IsMultipleValuesType(Type type) => type.IsArray || type.IsGenericType && typeof(IEnumerable<>).MakeGenericType(new [] { type.GetGenericArguments()[0] }).IsAssignableFrom(type);

        private static Type GetElementsType(Type type)
        {
            if (!IsMultipleValuesType(type))
            {
                return null;
            }

            if (type.IsArray)
            {
                return type.GetElementType();
            }

            return type.GetGenericArguments()[0];
        }
    }
}
