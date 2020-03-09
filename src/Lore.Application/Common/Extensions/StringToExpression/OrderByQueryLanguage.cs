using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using StringToExpression;
using StringToExpression.GrammerDefinitions;

namespace Lore.Application.Common.Extensions.StringToExpression
{
    /// <summary>
    /// Provides the base class for parsing sort query parameters.
    /// </summary>
    public class OrderByQueryLanguage
    {
        private readonly Language language;

        public OrderByQueryLanguage()
        {
            language = new Language(AllDefinitions().ToArray());
        }

        /// <summary>
        /// Parses the specified text converting it into a predicate expression
        /// </summary>
        /// <typeparam name="T">The input type</typeparam>
        /// <param name="text">The text to parse.</param>
        /// <param name="expression">Query expression.</param>
        /// <returns></returns>
        /// 
        public MethodCallExpression Parse<T>(string text, Expression expression)
        {
            var parameters = new [] { Expression.Parameter(typeof(T)) };
            var methodName = text.FirstOrDefault() != '-' ? "OrderBy" : "OrderByDescending";
            var expText = text.Replace("-", string.Empty);
            var body = language.Parse(expText, parameters);

            return Expression.Call(
                typeof(Queryable),
                methodName,
                new Type[] { typeof(T), body.Type },
                expression,
                Expression.Lambda(body, parameters)
            );
        }

        /// <summary>
        /// Returns all the definitions used by the language.
        /// </summary>
        /// <returns></returns>
        protected virtual IEnumerable<GrammerDefinition> AllDefinitions()
        {
            var definitions = new List<GrammerDefinition>();
            definitions.AddRange(TypeDefinitions());
            definitions.AddRange(PropertyDefinitions());
            return definitions;
        }

        /// <summary>
        /// Returns the definitions for types used within the language.
        /// </summary>
        /// <returns></returns>
        protected virtual IEnumerable<GrammerDefinition> TypeDefinitions()
        {
            return new []
            {
                new OperandDefinition(
                    name: "STRING",
                    regex: @"'(?:\\.|[^'])*'",
                    expressionBuilder : x => Expression.Constant(x.Trim('\'')
                        .Replace("\\'", "'")
                        .Replace("\\r", "\r")
                        .Replace("\\f", "\f")
                        .Replace("\\n", "\n")
                        .Replace("\\\\", "\\")
                        .Replace("\\b", "\b")
                        .Replace("\\t", "\t"))),
            };
        }

        /// <summary>
        /// Returns the definitions for property names used within the language.
        /// </summary>
        /// <returns></returns>
        protected virtual IEnumerable<GrammerDefinition> PropertyDefinitions()
        {
            return new []
            {
                //Properties
                new OperandDefinition(
                    name: "PROPERTY_PATH",
                    regex: @"(?<![0-9])([A-Za-z_][A-Za-z0-9_]*/?)+",
                    expressionBuilder: (value, parameters) =>
                    {
                        return value.Split('/').Aggregate((Expression)parameters[0], (exp, prop) => Expression.MakeMemberAccess(exp, GetProperty(exp.Type, prop)));
                    }),
            };
        }

        private PropertyInfo GetProperty(Type type, string property)
        {
            return type.GetTypeInfo().GetProperty(property, BindingFlags.Instance | BindingFlags.IgnoreCase | BindingFlags.Public);
        }
    }
}
