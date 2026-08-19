import { Bell, Search } from "lucide-react";

const Header = () => {
  return (
    <header className="flex h-20 items-center justify-between border-b border-zinc-200 bg-white px-6">

      {/* Search */}
      <div className="relative w-full max-w-md">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
        />

        <input
          type="text"
          placeholder="Search products, orders..."
          className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-zinc-400 focus:bg-white"
        />
      </div>

      {/* Right section */}
      <div className="ml-6 flex items-center gap-4">

        {/* Notification */}
        <button className="relative rounded-xl p-2.5 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900">
          <Bell size={19} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 border-l border-zinc-200 pl-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-sm font-semibold text-white">
            V
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-zinc-900">
              Virendra
            </p>

            <p className="text-xs text-zinc-500">
              Seller
            </p>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;