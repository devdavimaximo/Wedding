export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-brand-200 bg-brand-950 text-brand-100"
      role="contentinfo"
    >
      <div className="mx-auto max-w-6xl px-6 py-12 md:flex md:items-center md:justify-between md:py-14">
        <div>
          <p className="font-display text-lg font-semibold text-white">
            WeddingPlanner
          </p>
          <p className="mt-2 max-w-md text-sm text-brand-200/90">
            Projeto de portfólio — planejamento de orçamento para casamento com
            API em ASP.NET Core e Front-end em React.
          </p>
        </div>
        <p className="mt-8 text-sm text-brand-300 md:mt-0">
          © {year} Davi Maximo Quoos.
        </p>
      </div>
    </footer>
  );
}
