# Wedding Planner

Aplicação para planejamento de casamento com cálculo de distribuição de orçamento entre serviços (fixos, por convidado e ponderados).

## Sobre o projeto

O repositório contém uma solução full stack com:

- **Backend** em ASP.NET Core Web API para calcular a distribuição do orçamento.
- **Frontend** em React + Vite para interface de uso.

Atualmente a API expõe endpoints para cálculo (`POST /api/calculator/calculate`) e health check (`GET /api/calculator/health`).

## Tecnologias utilizadas

### Backend (`WeddingPlannerCsharp/WeddingPlanner`)

- .NET 7 (`net7.0`)
- ASP.NET Core Web API
- Injeção de dependência nativa
- Swagger / OpenAPI (`Swashbuckle.AspNetCore`)
- CORS configurável por `appsettings.json`

### Frontend (`WeddingPlannerCsharp/WeddingPlannerReact`)

- React 19
- Vite 8
- JavaScript (ES Modules)
- Tailwind CSS
- PostCSS + Autoprefixer
- ESLint

## Estrutura do projeto

```text
WeddingPlannerCsharp/
  WeddingPlanner/         # API ASP.NET Core
  WeddingPlannerReact/    # App React (Vite)
```

## Como executar localmente

### 1) Backend (API)

No diretório da API:

```bash
cd WeddingPlannerCsharp/WeddingPlanner
dotnet restore
dotnet run
```

A API inicia com Swagger habilitado em ambiente de desenvolvimento.

### 2) Frontend (React)

Em outro terminal:

```bash
cd WeddingPlannerCsharp/WeddingPlannerReact
npm install
npm run dev
```

Por padrão, no desenvolvimento local o frontend usa proxy para a API em `localhost`.

## Configuração de ambiente

- Frontend: use `WeddingPlannerCsharp/WeddingPlannerReact/.env.example` como base para criar `.env.local`.
- Produção: defina `VITE_API_BASE_URL` com a URL pública da API (sem `/` no final).
- Backend: ajuste `Cors:AllowedOrigins` em `appsettings.json` (ou variáveis de ambiente) com as origens permitidas do frontend.
