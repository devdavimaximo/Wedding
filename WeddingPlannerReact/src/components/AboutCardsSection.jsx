const cards = [
  {
    title: 'A ideia',
    icon: '✦',
    text: 'Casamentos envolvem dezenas de custos e decisões. A ideia é centralizar o orçamento e traduzir prioridades em números, sem planilhas confusas.',
  },
  {
    title: 'A proposta',
    icon: '◇',
    text: 'Você informa o valor total e escolhe quais serviços entram no pacote. O sistema redistribui o orçamento respeitando pesos — como um roteiro financeiro para o evento.',
  },
  {
    title: 'Por que existe',
    icon: '♥',
    text: 'O WeddingPlanner nasceu para quem quer transparência: ver quanto cabe em cada item, ajustar o que importa e conversar com fornecedores com números na mão.',
  },
];

export default function AboutCardsSection() {
  return (
    <section className="border-t border-brand-100/80 bg-cream-dark py-16 md:py-20" aria-labelledby="about-heading">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="about-heading" className="font-display text-3xl font-bold text-brand-950 md:text-4xl">
            Pensado para o casal
          </h2>
          <p className="mt-3 text-brand-800/85 md:text-lg">
            Três pilares que guiam o projeto — do conceito ao uso no dia a dia do planejamento.
          </p>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <li key={card.title}>
              <article className="group flex h-full flex-col rounded-2xl border border-brand-100 bg-white p-6 shadow-soft transition-all duration-500 ease-out hover:-translate-y-1 hover:border-brand-200/70 hover:shadow-[0_16px_48px_-16px_rgba(58,18,25,0.14)]">
                <span
                  className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-xl text-brand-700 transition-colors duration-500 ease-out group-hover:bg-brand-100/90 group-hover:text-brand-800"
                  aria-hidden
                >
                  {card.icon}
                </span>
                <h3 className="font-display text-xl font-semibold text-brand-950">{card.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-800/90 md:text-base">{card.text}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
