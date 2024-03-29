﻿using System.Threading.Tasks;
using Lore.Application.Common.Interfaces.Services;
using Lore.Application.Common.Models;
using Microsoft.AspNetCore.Http;

namespace Lore.Web.Services
{
    public class CurrentUserService : ICurrentUserService
    {
        private readonly IUserManager userManager;

        public CurrentUserService(
            IHttpContextAccessor httpContextAccessor,
            IUserManager userManager)
        {
            UserId = httpContextAccessor.HttpContext?.User?.Identity.Name;
            IsAuthenticated = UserId != null;
            this.userManager = userManager;
        }

        public string UserId { get; }

        public bool IsAuthenticated { get; }

        public Task<UserModel> Get() => userManager.GetUserById(UserId);
    }
}
