# WeddingPlanner (React + Vite)

## Deploy na Vercel

1. No GitHub, use a raiz do repositório ou defina **Root Directory** = `WeddingPlannerReact` no projeto da Vercel.
2. Variável de ambiente (Production): `VITE_API_BASE_URL` = URL pública da API ASP.NET **sem barra no final** (ex.: `https://sua-api.azurewebsites.net`).
3. Após o primeiro deploy, copie a URL do site (ex.: `https://seu-app.vercel.app`) e inclua essa origem na API: em `appsettings.json` em `Cors:AllowedOrigins`, ou variável de ambiente `Cors__AllowedOrigins__0` no host da API.

Em desenvolvimento local, não defina `VITE_API_BASE_URL` (ou deixe vazio): o Vite continua usando o proxy para `http://localhost:5150` definido em `vite.config.js`.

Veja também `.env.example`.

---

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
