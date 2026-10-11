import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


const RevenueChart = ({data=[]}) => {
  return (
    <div className="min-w-0 rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-zinc-900">
          Revenue over time
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Completed order revenue by date
        </p>
      </div>

      {data.length > 0 ? (
        <div className="h-[240px] w-full sm:h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 4 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e4e4e7"
            />

            <XAxis
              dataKey="_id"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#71717a", fontSize: 11 }}
              tickFormatter={(value) => new Date(value).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              width={48}
              tick={{ fill: "#71717a", fontSize: 11 }}
              tickFormatter={(value) => `₹${value >= 1000 ? `${Math.round(value / 1000)}k` : value}`}
            />

            <Tooltip
              formatter={(value) => [`₹${Number(value).toLocaleString("en-IN")}`, "Revenue"]}
              labelFormatter={(value) => new Date(value).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
              contentStyle={{ borderRadius: 12, borderColor: "#e4e4e7" }}
            />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#111110"
              strokeWidth={2.5}
              activeDot={{ r: 5, fill: "#e2f163", stroke: "#111110", strokeWidth: 2 }}
              dot={{ r: 3, fill: "#111110" }}
            />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex h-60 items-center justify-center rounded-xl bg-zinc-50 px-6 text-center sm:h-80">
          <div>
            <p className="font-medium text-zinc-700">Revenue activity will show here</p>
            <p className="mt-1 text-sm text-zinc-500">Completed orders will appear in this chart.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RevenueChart;