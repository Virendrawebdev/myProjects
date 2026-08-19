import {
  BarChart3,
  Bell,
  Box,
  CreditCard,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingBag,
  Tag,
  Users,
} from "lucide-react";

const mainMenu = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    active: true,
  },
  {
    name: "Products",
    icon: Package,
  },
  {
    name: "Orders",
    icon: ShoppingBag,
  },
  {
    name: "Customers",
    icon: Users,
  },
  {
    name: "Analytics",
    icon: BarChart3,
  },
];

const storeMenu = [
  {
    name: "Store Profile",
    icon: Box,
  },
  {
    name: "Payments",
    icon: CreditCard,
  },
  {
    name: "Discounts",
    icon: Tag,
  },
];

const Sidebar = () => {
  return (
    <aside className="hidden min-h-screen w-64 shrink-0 flex-col bg-[#0b1120] text-white md:flex">

      {/* Logo */}
      <div className="flex h-20 items-center border-b border-white/10 px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-sm font-bold text-[#0b1120]">
            S
          </div>

          <span className="text-xl font-bold tracking-[0.2em]">
            SNITCH2.0
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">

        {/* Main */}
        <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-widest text-white/35">
          Main
        </p>

        <div className="space-y-1">
          {mainMenu.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm transition-all ${
                  item.active
                    ? "bg-white text-[#0b1120] shadow-lg"
                    : "text-white/60 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon
                  size={18}
                  strokeWidth={item.active ? 2.5 : 2}
                />

                <span>{item.name}</span>
              </button>
            );
          })}
        </div>

        {/* Store */}
        <p className="mb-3 mt-8 px-3 text-[11px] font-semibold uppercase tracking-widest text-white/35">
          Store
        </p>

        <div className="space-y-1">
          {storeMenu.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/60 transition-all hover:bg-white/10 hover:text-white"
              >
                <Icon size={18} />

                <span>{item.name}</span>
              </button>
            );
          })}
        </div>

        {/* System */}
        <p className="mb-3 mt-8 px-3 text-[11px] font-semibold uppercase tracking-widest text-white/35">
          System
        </p>

        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/60 transition-all hover:bg-white/10 hover:text-white">
          <Settings size={18} />
          <span>Settings</span>
        </button>
      </nav>

      {/* Seller profile */}
      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3 rounded-xl p-2">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-[#0b1120]">
            V
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium">
              Virendra
            </p>

            <p className="text-xs text-white/40">
              Seller Account
            </p>
          </div>

          <Bell
            size={16}
            className="ml-auto text-white/40"
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;