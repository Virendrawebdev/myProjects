import { Bell, ChevronDown, Search } from "lucide-react";

const Header = ({ dashboard }) => {
  return (
    <header className="flex min-h-16 items-center justify-between gap-3 border-b border-zinc-200/80 bg-white/90 px-3 backdrop-blur sm:min-h-20 sm:px-6 lg:px-8">

      {/* Search */}
      <div className="relative min-w-0 max-w-lg flex-1">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
        />

        <input
          type="text"
          placeholder="Search products, orders..."
          className="w-full min-w-0 rounded-xl border border-zinc-200 bg-[#f7f8f4] py-2.5 pl-10 pr-3 text-xs outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white sm:pr-4 sm:text-sm"
        />
      </div>

      {/* Right section */}
      <div className="ml-0 flex shrink-0 items-center gap-1 sm:ml-6 sm:gap-3">

        {/* Notification */}
        <button aria-label="View notifications" className="relative rounded-xl p-2.5 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900">
          <Bell size={19} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2 border-l border-zinc-200 pl-2 sm:gap-3 sm:pl-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-sm font-semibold text-white sm:h-10 sm:w-10">
            V
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-zinc-900">
             {dashboard?.seller?.fullName || "Seller"}
            </p>

            <p className="text-xs text-zinc-500">
              Seller
            </p>
          </div>
          <ChevronDown size={15} className="hidden text-zinc-400 sm:block" />
        </div>

      </div>
    </header>
  );
};

export default Header;