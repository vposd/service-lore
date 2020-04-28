#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build

WORKDIR /src
COPY ["src/Lore.Web/Lore.Web.csproj", "src/Lore.Web/"]
COPY ["src/Lore.Web.Contracts/Lore.Web.Contracts.csproj", "src/Lore.Web.Contracts/"]
COPY ["src/Lore.Application/Lore.Application.csproj", "src/Lore.Application/"]
COPY ["src/Lore.Domain/Lore.Domain.csproj", "src/Lore.Domain/"]
COPY ["src/Lore.Infrastructure/Lore.Infrastructure.csproj", "src/Lore.Infrastructure/"]
COPY ["src/Lore.Persistence/Lore.Persistence.csproj", "src/Lore.Persistence/"]
RUN dotnet restore "src/Lore.Web/Lore.Web.csproj"
COPY . .
WORKDIR "/src/src/Lore.Web"
RUN dotnet build "Lore.Web.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Lore.Web.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Lore.Web.dll"]