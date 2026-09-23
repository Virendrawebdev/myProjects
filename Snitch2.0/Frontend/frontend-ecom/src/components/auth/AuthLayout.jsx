import { ArrowUpRight, ShieldCheck, Sparkles } from "lucide-react";

const AuthLayout = ({ eyebrow, title, description, children, footer }) => {
  return (
    <main className="min-h-screen bg-[#f4f1eb] text-[#171717] lg:grid lg:grid-cols-[minmax(320px,0.9fr)_minmax(520px,1.1fr)]">
      <section className="relative hidden overflow-hidden bg-[#171717] p-10 text-[#f4f1eb] lg:flex lg:min-h-screen lg:flex-col lg:justify-between xl:p-14">
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(244,241,235,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(244,241,235,0.12)_1px,transparent_1px)] [background-size:42px_42px]" />
        <div className="absolute -right-28 top-24 h-72 w-72 rounded-full border border-[#e5ff72]/30" />
        <div className="absolute -right-12 top-40 h-44 w-44 rounded-full border border-[#e5ff72]/20" />

        <div className="relative flex items-center gap-3 text-sm font-semibold tracking-[0.2em]">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e5ff72] text-[#171717]">
            <Sparkles size={17} />
          </span>
          SNITCH 2.0
        </div>

        <div className="relative max-w-lg">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-[#e5ff72]">Style, on your terms</p>
          <h2 className="max-w-md text-5xl font-semibold leading-[0.98] tracking-[-0.04em] xl:text-6xl">
            Make room for a better wardrobe.
          </h2>
          <p className="mt-7 max-w-sm text-sm leading-7 text-[#b9b7b0]">
            Discover considered pieces, save your favorites, and move through every order with clarity.
          </p>
          <div className="mt-10 flex items-center gap-3 text-sm text-[#d9d7d0]">
            <ShieldCheck size={18} className="text-[#e5ff72]" />
            A considered space for every style
            <ArrowUpRight size={17} className="ml-1 text-[#e5ff72]" />
          </div>
        </div>

        <p className="relative text-xs uppercase tracking-[0.2em] text-[#77756f]">Curated for the everyday</p>
      </section>

      <section className="flex min-h-screen flex-col px-5 py-6 sm:px-8 sm:py-10 lg:justify-center lg:px-12 xl:px-20">
        <div className="mx-auto w-full max-w-[460px]">
          <div className="mb-10 flex items-center justify-between lg:hidden">
            <span className="text-sm font-bold tracking-[0.2em]">SNITCH 2.0</span>
            <span className="h-2 w-2 rounded-full bg-[#e15c3a]" />
          </div>

          <div className="mb-8 sm:mb-10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#e15c3a]">{eyebrow}</p>
            <h1 className="text-4xl font-semibold leading-none tracking-[-0.04em] sm:text-5xl">{title}</h1>
            <p className="mt-4 max-w-md text-sm leading-6 text-[#77736b]">{description}</p>
          </div>

          {children}
          {footer}
        </div>
      </section>
    </main>
  );
};

export default AuthLayout;
