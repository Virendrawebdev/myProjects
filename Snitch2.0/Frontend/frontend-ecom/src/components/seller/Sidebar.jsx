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
  Menu,
  LogOut,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/auth.api";

const mainMenu = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    link: "/seller/dashboard",
  },
  {
    name: "Products",
    icon: Package,
    link: "/seller/products",
  },
  {
    name: "Orders",
    icon: ShoppingBag,
    link: "/seller/orders",
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

const Sidebar = ({ dashboard }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoutError, setLogoutError] = useState("");
  const sellerName = dashboard?.seller?.fullName || "Seller";
  const sellerInitial = sellerName.trim().charAt(0).toUpperCase() || "S";
  const profileAvatar = dashboard?.seller?.avatar;
  const shopName = dashboard?.seller?.shopName || "Seller Account";

  const handleLogout = async () => {
    setLogoutError("");
    try {
      await logoutUser();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Seller logout failed:", error);
      setLogoutError(error?.response?.data?.message || "Logout failed. Please try again.");
    }
  };

  return (
    <>
      <div className="flex min-h-16 items-center justify-between border-b border-white/10 bg-[#111110] px-4 text-white lg:hidden">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e2f163] text-sm font-bold text-[#111110] shadow-[0_0_0_4px_rgba(226,241,99,0.12)]">S</div>
          <div>
            <span className="block font-display text-sm font-bold tracking-[0.16em]">SNITCH2.0</span>
            <span className="block text-[10px] uppercase tracking-[0.18em] text-white/40">Seller workspace</span>
          </div>
        </div>
        <button aria-label="Open navigation" aria-expanded={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(true)} className="rounded-xl border border-white/10 p-2.5 text-white/70 transition hover:bg-white/10 hover:text-white">
          <Menu size={20} />
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 lg:hidden">
          <button aria-label="Close navigation" className="absolute inset-0 cursor-default" onClick={() => setIsMobileMenuOpen(false)} />
          <aside className="relative flex h-full w-[min(88vw,22rem)] flex-col border-r border-white/10 bg-[#111110] text-white shadow-2xl">
            <div className="flex min-h-20 items-center justify-between border-b border-white/10 px-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e2f163] text-sm font-bold text-[#111110]">S</div>
                <div>
                  <span className="block text-sm font-bold tracking-[0.16em]">SNITCH2.0</span>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-white/40">Menu</span>
                </div>
              </div>
              <button aria-label="Close navigation" onClick={() => setIsMobileMenuOpen(false)} className="rounded-xl border border-white/10 p-2.5 text-white/60 transition hover:bg-white/10 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-3 py-6">
              <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">Main menu</p>
              <div className="space-y-1.5">
            
                {mainMenu.map((item) => {
                  const Icon = item.icon;
                  const isActive = item.link ? location.pathname === item.link || location.pathname.startsWith(`${item.link}/`) : false;
                  const itemClassName = `flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-white/10 text-white ring-1 ring-inset ring-[#e2f163]/40 hover:bg-white/10 hover:text-white"
                      : "text-white/60 hover:bg-white/10 hover:text-white"
                  }`;

                  return (
                    item.link ? <Link to={item.link} key={item.name} onClick={() => setIsMobileMenuOpen(false)} className={itemClassName} aria-current={isActive ? "page" : undefined}>
                      <Icon size={20} />
                      <span>{item.name}</span>
                    </Link> : <button key={item.name} type="button" onClick={() => setIsMobileMenuOpen(false)} className={itemClassName}>
                      <Icon size={20} />
                      <span>{item.name}</span>
                    </button>
                  );
                })}
              </div>
              <p className="mb-3 mt-9 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">Store</p>
              <div className="space-y-1.5">
                {storeMenu.map((item) => {
                  const Icon = item.icon;
                  return <button key={item.name} onClick={() => setIsMobileMenuOpen(false)} className="flex w-full items-center gap-3 rounded-xl px-3.5 py-3.5 text-sm font-medium text-white/60 transition hover:bg-white/10 hover:text-white"><Icon size={18} /><span>{item.name}</span></button>;
                })}
              </div>
              <p className="mb-3 mt-9 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">System</p>
              <button onClick={() => setIsMobileMenuOpen(false)} className="flex w-full items-center gap-3 rounded-xl px-3.5 py-3.5 text-sm font-medium text-white/60 transition hover:bg-white/10 hover:text-white"><Settings size={18} /><span>Settings</span></button>
            </nav>
            <div className="border-t border-white/10 p-4">
              <div className="flex items-center gap-3 rounded-2xl bg-white/6 p-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white text-sm font-bold text-[#0b1120]">
                  {profileAvatar ? (
                    <img src={profileAvatar} alt={`${sellerName} profile`} className="h-full w-full object-cover" />
                  ) : sellerInitial}
                </div>
                <div className="min-w-0"><p className="truncate text-sm font-semibold">{sellerName}</p><p className="mt-0.5 truncate text-xs text-white/40">{shopName}</p></div>
                <Bell size={16} className="ml-auto shrink-0 text-white/40" />
              </div>
              {logoutError && <p role="alert" className="mt-2 px-2 text-xs text-red-300">{logoutError}</p>}
              <button type="button" onClick={handleLogout} className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-white/60 transition hover:bg-white/10 hover:text-white">
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </aside>
        </div>
      )}
      <aside className="hidden min-h-screen w-64 shrink-0 flex-col bg-[#111110] text-white lg:flex">

        {/* Logo */}
        <div className="flex h-20 items-center border-b border-white/10 px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e2f163] text-sm font-bold text-[#111110]">
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
              const isActive = item.link ? location.pathname === item.link || location.pathname.startsWith(`${item.link}/`) : false;
              const itemClassName = `group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm transition-all ${isActive
                  ? "bg-white text-[#0b1120] shadow-lg"
                  : "text-gray-400 hover:bg-white/10 hover:text-white"
                }`;

              return item.link ? (
                <Link key={item.name} to={item.link} className={itemClassName} aria-current={isActive ? "page" : undefined}>
                  <Icon
                    size={18}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  <span>{item.name}</span>
                </Link>
              ) : (
                <button key={item.name} type="button" className={itemClassName}>
                  <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
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
          {logoutError && <p role="alert" className="mb-2 px-2 text-xs text-red-300">{logoutError}</p>}
          <div className="flex items-center gap-3 rounded-xl p-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-[#0b1120]">
              {profileAvatar ? (
                <img src={profileAvatar} alt={`${sellerName} profile`} className="h-full w-full rounded-full object-cover" />
              ) : sellerInitial}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium">
                {sellerName}
              </p>

              <p className="truncate text-xs text-white/40">
                {shopName}
              </p>
            </div>

            <Bell
              size={16}
              className="ml-auto text-white/40"
            />
          </div>
          <button type="button" onClick={handleLogout} className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-white/60 transition hover:bg-white/10 hover:text-white">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;