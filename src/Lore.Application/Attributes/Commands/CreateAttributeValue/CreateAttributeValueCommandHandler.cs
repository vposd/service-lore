﻿using System.Threading;
using System.Threading.Tasks;
using Lore.Application.Attributes.Commands.CreateAttributeValue;
using Lore.Application.Common.Interfaces;
using Lore.Application.Common.Models;
using Lore.Domain.Entities;
using MediatR;

namespace Lore.Application.Attributes.Commands.CreateAttribute
{
    public class CreateAttributeValueCommandHandler : IRequestHandler<CreateAttributeValueCommand, OperationResult>
    {
        private readonly ILoreDbContextFactory contextFactory;

        public CreateAttributeValueCommandHandler(
            ILoreDbContextFactory contextFactory)
        {
            this.contextFactory = contextFactory;
        }

        public async Task<OperationResult> Handle(CreateAttributeValueCommand request, CancellationToken cancellationToken)
        {
            using var context = contextFactory.Create();

            context.AttributesValues.Add(new AttributeValue
            {
                AttributeId = request.AttributeId,
                Value = request.Value,
                IsDefault = request.IsDefault
            });

            await context.SaveChangesAsync(cancellationToken);

            return OperationResult.Success();
        }
    }
}