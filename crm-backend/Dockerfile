# Build Stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy solution and project files
COPY CRM.sln ./
COPY CRM.API/CRM.API.csproj CRM.API/
COPY CRM.Application/CRM.Application.csproj CRM.Application/
COPY CRM.Domain/CRM.Domain.csproj CRM.Domain/
COPY CRM.Infrastructure/CRM.Infrastructure.csproj CRM.Infrastructure/
COPY CRM.Tests/CRM.Tests.csproj CRM.Tests/

# Restore dependencies
RUN dotnet restore

# Copy everything else
COPY . .

# Build
WORKDIR /src/CRM.API
RUN dotnet build -c Release -o /app/build

# Publish
FROM build AS publish
RUN dotnet publish -c Release -o /app/publish

# Runtime Stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .

EXPOSE 80
ENTRYPOINT ["dotnet", "CRM.API.dll"]
