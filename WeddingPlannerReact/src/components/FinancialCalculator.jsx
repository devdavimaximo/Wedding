import { useMemo, useState } from 'react';
import { apiUrl } from '../config/apiBaseUrl';

const SERVICE_TYPES = {
  Weighted: 3,
};

const TYPE_LABELS = {
  3: 'Peso',
};

const serviceGroups = [
  {
    group: 'Essenciais',
    services: [
      { name: 'Aluguel', weight: 10, selected: true },
      { name: 'Buffet', weight: 19, selected: true },
      { name: 'Foto e video', weight: 12, selected: true },
    ],
  },
  {
    group: 'Evento',
    services: [
      { name: 'Decoracao', weight: 8, selected: true },
      { name: 'DJ', weight: 5, selected: true },
      { name: 'Iluminacao', weight: 4, selected: true },
      { name: 'Banda', weight: 6, selected: true },
      { name: 'Cerimonialista', weight: 5, selected: true },
    ],
  },
  {
    group: 'Noivos',
    services: [
      { name: 'Visual dos noivos', weight: 7, selected: true },
      { name: 'Dia da noiva', weight: 3, selected: false },
      { name: 'Dia do noivo', weight: 2, selected: false },
    ],
  },
  {
    group: 'Outros',
    services: [
      { name: 'Papelaria', weight: 2, selected: true },
      { name: 'Aliancas', weight: 4, selected: true },
      { name: 'Lua de mel', weight: 10, selected: false },
      { name: 'Taxas', weight: 2, selected: false },
      { name: 'Extra (emergencia)', weight: 5, selected: true },
    ],
  },
  {
    group: 'Extras',
    services: [
      { name: 'Open bar', weight: 10, selected: false },
      { name: 'Lembrancinhas', weight: 3, selected: false },
      { name: 'Cabine de fotos', weight: 3, selected: false },
      { name: 'Drone', weight: 2, selected: false },
    ],
  },
  {
    group: 'Logistica',
    services: [
      { name: 'Transporte', weight: 4, selected: false },
      { name: 'Hospedagem', weight: 6, selected: false },
    ],
  },
];

const defaultServices = serviceGroups.flatMap((group) =>
  group.services.map((service) => ({
    id: crypto.randomUUID(),
    group: group.group,
    name: service.name,
    type: 'Weighted',
    value: 0,
    weight: service.weight,
    selected: service.selected,
  })),
);

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export default function FinancialCalculator() {
  const [totalBudget, setTotalBudget] = useState(100000);
  const [services, setServices] = useState(defaultServices);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const selectedCount = useMemo(() => services.filter((service) => service.selected).length, [services]);

  const groupedServices = useMemo(() => {
    return services.reduce((acc, service) => {
      if (!acc[service.group]) {
        acc[service.group] = [];
      }
      acc[service.group].push(service);
      return acc;
    }, {});
  }, [services]);

  const updateServiceSelection = (id, selected) => {
    setServices((current) =>
      current.map((service) => (service.id === id ? { ...service, selected } : service)),
    );
  };

  const handleCalculate = async (event) => {
    event.preventDefault();
    setError('');
    setResult(null);
    setIsLoading(true);

    const excludedServices = services
      .filter((service) => !service.selected)
      .map((service) => service.name.trim());

    const payload = {
      totalBudget: Number(totalBudget),
      guestsCount: 1,
      excludedServices,
      services: services.map((service) => ({
        name: service.name.trim(),
        type: SERVICE_TYPES[service.type],
        value: Number(service.value),
        weight: Number(service.weight),
        isRequired: false,
      })),
    };

    try {
      const response = await fetch(apiUrl('/api/Calculator/calculate'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const responseBody = await response.json();
      if (!response.ok) {
        throw new Error(responseBody?.message || 'Erro ao calcular distribuicao.');
      }

      setResult(responseBody);
    } catch (requestError) {
      setError(requestError.message || 'Falha ao conectar com a API.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="sistema-financeiro"
      className="scroll-mt-6 border-t border-brand-100 bg-cream py-14 md:py-20"
      aria-labelledby="finance-heading"
    >
      <div className="mx-auto max-w-6xl px-6">
        <header className="rounded-2xl border border-brand-100 bg-white p-6 shadow-soft md:p-8">
          <p className="text-sm font-medium uppercase tracking-wider text-brand-600">Sistema financeiro</p>
          <h2 id="finance-heading" className="mt-2 font-display text-3xl font-bold text-brand-950 md:text-4xl">
            Wedding Planner Financeiro
          </h2>
          <p className="mt-3 max-w-3xl text-brand-800/90 md:text-lg">
            Informe o orçamento e selecione os serviços desejados. Os pesos são internos e a API calcula a
            distribuição.
          </p>
        </header>

        <form onSubmit={handleCalculate} className="mt-8 grid gap-6 lg:grid-cols-3">
          <section className="rounded-2xl border border-brand-100 bg-white p-6 shadow-soft lg:col-span-2 md:p-8">
            <h3 className="font-display text-xl font-semibold text-brand-950">Dados iniciais</h3>
            <div className="mt-4 max-w-md">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-brand-800">Orçamento total (R$)</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={totalBudget}
                  onChange={(event) => setTotalBudget(event.target.value)}
                  className="w-full rounded-xl border border-brand-200 bg-cream px-4 py-3 text-brand-950 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                  required
                />
              </label>
            </div>

            <div className="mt-10">
              <h4 className="mb-4 font-display text-lg font-semibold text-brand-950">Serviços disponíveis</h4>
              <div className="space-y-4">
                {Object.entries(groupedServices).map(([groupName, groupItems]) => (
                  <div key={groupName} className="rounded-xl border border-brand-100 bg-cream/50 p-4">
                    <h5 className="mb-3 text-xs font-semibold uppercase tracking-wider text-brand-600">
                      {groupName}
                    </h5>
                    <div className="grid gap-2 md:grid-cols-2">
                      {groupItems.map((service) => (
                        <label
                          key={service.id}
                          className="flex cursor-pointer items-center gap-3 rounded-lg border border-transparent bg-white p-2.5 text-sm text-brand-900 transition hover:border-brand-200"
                        >
                          <input
                            type="checkbox"
                            checked={service.selected}
                            onChange={(event) => updateServiceSelection(service.id, event.target.checked)}
                            className="h-4 w-4 rounded border-brand-300 text-brand-600 focus:ring-brand-500"
                          />
                          <span>{service.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <aside className="h-fit rounded-2xl border border-brand-100 bg-white p-6 shadow-soft md:p-8">
            <h3 className="font-display text-xl font-semibold text-brand-950">Resumo</h3>
            <div className="mt-4 space-y-2 text-sm text-brand-800">
              <p>Serviços totais: {services.length}</p>
              <p>Serviços incluídos: {selectedCount}</p>
              <p>Serviços excluídos: {services.length - selectedCount}</p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-6 w-full rounded-xl bg-brand-700 px-4 py-3.5 font-semibold text-white shadow-soft transition hover:bg-brand-800 disabled:cursor-not-allowed disabled:bg-brand-300"
            >
              {isLoading ? 'Calculando...' : 'Calcular distribuição'}
            </button>

            {error && (
              <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-800 ring-1 ring-red-100">{error}</p>
            )}
          </aside>
        </form>

        {result && (
          <section className="mt-8 rounded-2xl border border-brand-100 bg-white p-6 shadow-soft md:p-8">
            <h3 className="font-display text-xl font-semibold text-brand-950">Resultado da distribuição</h3>
            <div className="mt-6 grid gap-3 text-sm md:grid-cols-3">
              <p className="rounded-xl bg-brand-50 p-4 font-medium text-brand-900">
                Orçamento: {currencyFormatter.format(result.totalBudget)}
              </p>
              <p className="rounded-xl bg-brand-50 p-4 font-medium text-brand-900">
                Total usado: {currencyFormatter.format(result.totalUsed)}
              </p>
              <p className="rounded-xl bg-brand-50 p-4 font-medium text-brand-900">
                Saldo: {currencyFormatter.format(result.remainingAmount)}
              </p>
            </div>

            <div className="mt-8 overflow-x-auto rounded-xl border border-brand-100">
              <table className="min-w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-brand-200 bg-brand-50/80 text-left text-brand-700">
                    <th className="px-4 py-3 font-semibold">Serviço</th>
                    <th className="px-4 py-3 font-semibold">Tipo</th>
                    <th className="px-4 py-3 font-semibold">Custo</th>
                  </tr>
                </thead>
                <tbody>
                  {result.services?.map((service) => (
                    <tr key={`${service.name}-${service.type}`} className="border-b border-brand-100 last:border-0">
                      <td className="px-4 py-3 text-brand-900">{service.name}</td>
                      <td className="px-4 py-3 text-brand-700">{TYPE_LABELS[service.type] ?? service.type}</td>
                      <td className="px-4 py-3 font-medium text-brand-950">
                        {currencyFormatter.format(service.cost)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </section>
  );
}
