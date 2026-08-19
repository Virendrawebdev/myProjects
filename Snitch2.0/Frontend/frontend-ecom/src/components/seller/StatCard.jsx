import { ArrowUpRight } from "lucide-react";

const StatCard = ({
  title,
  value,
  change,
  icon: Icon,
}) => {
  return (
    <div className="group rounded-2xl border border-zinc-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-zinc-500">
            {title}
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900">
            {value}
          </h2>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-700 transition-colors group-hover:bg-zinc-900 group-hover:text-white">
          <Icon size={19} />
        </div>
      </div>

      <div className="mt-5 flex items-center gap-1.5 text-sm">
        <span className="flex items-center font-medium text-emerald-600">
          <ArrowUpRight size={15} />
          {change}
        </span>

        <span className="text-zinc-400">
          from last month
        </span>
      </div>
    </div>
  );
};

export default StatCard;