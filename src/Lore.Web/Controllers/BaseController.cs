using System.IO;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Lore.Application.Common.Exceptions;

namespace Lore.Api.Controllers
{
    [ApiController]
    public abstract class BaseController : ControllerBase
    {
        private readonly IMediator _mediator;

        protected IMediator Mediator => _mediator ?? HttpContext.RequestServices.GetService<IMediator>();

        protected async Task<MemoryStream> CheckAndReadFormFileAsync(IFormFile formFile, CancellationToken cancellationToken)
        {
            if (formFile == null || formFile.Length <= 0)
            {
                throw new BadRequestException("File is empty");
            }

            var stream = new MemoryStream();
            await formFile.CopyToAsync(stream, cancellationToken);

            return stream;
        }

        protected IActionResult Created() => StatusCode(201);
    }
}
