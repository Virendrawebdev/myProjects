const StatCard = ({
  title,
  value,
  icon: Icon,
}) => {
  return (
    <div className="group rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-[0_1px_2px_rgba(24,24,27,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-lg sm:p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
            {title}
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
            {value}
          </h2>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef4c9] text-zinc-800 transition-colors group-hover:bg-zinc-900 group-hover:text-white">
          <Icon size={19} />
        </div>
      </div>

      <p className="mt-4 text-xs text-zinc-400 sm:mt-5">
        {title === "Total Revenue" ? "Revenue from completed orders" : "Across your store"}
      </p>
    </div>
  );
};

export default StatCard;