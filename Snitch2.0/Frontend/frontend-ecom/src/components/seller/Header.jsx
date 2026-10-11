const Header = ({ dashboard }) => {
  const sellerName = dashboard?.seller?.fullName || "Seller";
  const sellerInitial = sellerName.trim().charAt(0).toUpperCase() || "S";

  return (
    <header className="flex min-h-16 items-center justify-between gap-3 border-b border-zinc-200/80 bg-white/90 px-3 backdrop-blur sm:min-h-20 sm:px-6 lg:px-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">Seller workspace</p>
        <p className="mt-0.5 text-sm font-medium text-zinc-700">{dashboard?.seller?.shopName || "Manage your store"}</p>
      </div>
      <div className="flex min-w-0 items-center gap-2 border-l border-zinc-200 pl-3 sm:gap-3 sm:pl-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-zinc-900 text-sm font-semibold text-white sm:h-10 sm:w-10">
            {dashboard?.seller?.avatar ? (
              <img
                src={dashboard.seller.avatar}
                alt={`${sellerName} profile`}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              sellerInitial
            )}
          </div>

          <div className="min-w-0">
            <p className="max-w-32 truncate text-xs font-semibold text-zinc-900 sm:max-w-none sm:text-sm">
              {sellerName}
            </p>

            <p className="hidden text-xs text-zinc-500 sm:block">
              {dashboard?.seller?.shopName || "Seller account"}
            </p>
          </div>
      </div>
    </header>
  );
};

export default Header;