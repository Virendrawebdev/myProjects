import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", revenue: 12000 },
  { day: "Tue", revenue: 18000 },
  { day: "Wed", revenue: 15000 },
  { day: "Thu", revenue: 22000 },
  { day: "Fri", revenue: 28000 },
  { day: "Sat", revenue: 24000 },
  { day: "Sun", revenue: 32000 },
];

const RevenueChart = () => {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-zinc-900">
          Revenue Overview
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Revenue performance for the last 7 days
        </p>
      </div>

      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#18181b"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;