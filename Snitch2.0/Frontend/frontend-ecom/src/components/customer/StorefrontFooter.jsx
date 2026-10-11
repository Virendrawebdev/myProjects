import { ArrowUpRight, Heart, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { Link } from "react-router-dom";

const StorefrontFooter = () => (
  <footer className="bg-[#111110] text-white">
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
      <div className="grid gap-10 border-b border-white/10 pb-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Link to="/customer/CustomerProducts" className="inline-block text-2xl font-bold tracking-[0.18em]">
            SNITCH<span className="text-[#e2f163]">.</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-6 text-white/55">
            Everyday essentials, standout style. Find pieces that feel like you.
          </p>
          <Link
            to="/customer/ai-recommend"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#e2f163] px-4 py-2.5 text-sm font-semibold text-[#111110] transition hover:bg-white"
          >
            <Sparkles size={16} />
            Find your style
            <ArrowUpRight size={15} />
          </Link>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Explore</h2>
          <div className="mt-4 flex flex-col items-start gap-3 text-sm text-white/70">
            <Link className="transition hover:text-[#e2f163]" to="/customer/CustomerProducts">Shop all</Link>
            <Link className="transition hover:text-[#e2f163]" to="/customer/Wishlist">Your wishlist</Link>
            <Link className="transition hover:text-[#e2f163]" to="/customer/Cart">Shopping bag</Link>
          </div>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Your account</h2>
          <div className="mt-4 flex flex-col items-start gap-3 text-sm text-white/70">
            <Link className="transition hover:text-[#e2f163]" to="/customer/orders">Order history</Link>
            <Link className="transition hover:text-[#e2f163]" to="/customer/ai-recommend">Style recommendations</Link>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/4 p-5">
          <h2 className="font-semibold">The good stuff, made simple.</h2>
          <div className="mt-4 space-y-3 text-sm text-white/60">
            <p className="flex items-center gap-2"><Truck size={16} className="text-[#e2f163]" /> Order updates in your account</p>
            <p className="flex items-center gap-2"><ShieldCheck size={16} className="text-[#e2f163]" /> Secure checkout</p>
            <p className="flex items-center gap-2"><Heart size={16} className="text-[#e2f163]" /> Save favourites to your wishlist</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} SNITCH. Made for your everyday.</p>
        <p>Good style. No extra noise.</p>
      </div>
    </div>
  </footer>
);

export default StorefrontFooter;
