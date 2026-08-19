import {PieChart, Pie,Cell,Tooltip,ResponsiveContainer,} from "recharts";

const data = [
  {
    name: "Delivered",
    value: 68,
  },
  {
    name: "Shipped",
    value: 18,
  },
  {
    name: "Pending",
    value: 10,
  },
  {
    name: "Cancelled",
    value: 4,
  },
];

const COLORS = [
  "#18181b",
  "#52525b",
  "#a1a1aa",
  "#e4e4e7",
];

const OrderStatus = () => {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-zinc-900">
          Order Status
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Current order distribution
        </p>
      </div>

      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={3}
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {data.map((item, index) => (
          <div
            key={item.name}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{
                  backgroundColor: COLORS[index],
                }}
              />

              <span className="text-zinc-600">
                {item.name}
              </span>
            </div>

            <span className="font-medium text-zinc-900">
              {item.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderStatus;