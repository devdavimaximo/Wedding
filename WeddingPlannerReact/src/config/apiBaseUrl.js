/**
 * Base URL da API em produção (ex.: https://sua-api.azurewebsites.net).
 * Em desenvolvimento, deixe vazio: o Vite usa o proxy para localhost.
 */
export function getApiBaseUrl() {
  const raw = import.meta.env.VITE_API_BASE_URL;
  if (raw == null || typeof raw !== 'string') return '';
  return raw.trim().replace(/\/+$/, '');
}

export function apiUrl(path) {
  const base = getApiBaseUrl();
  const p = path.startsWith('/') ? path : `/${path}`;
  if (!base) return p;
  return `${base}${p}`;
}
