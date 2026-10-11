import { Clock3, DollarSign, Package, ShoppingBagIcon, ArrowUpRight, ArrowRight } from "lucide-react";
import Sidebar from "../../components/seller/Sidebar";
import Header from "../../components/seller/Header";
import StatCard from "../../components/seller/StatCard";
import RevenueChart from "../../components/seller/RevenueChart";
import OrderStatus from "../../components/seller/OrderStatus";
import RecentOrders from "../../components/seller/RecentOrders";
import LowStock from "../../components/seller/LowStock";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getSellerDashboard } from "../../services/dashboard.api";



const SellerDashboard = () => {
    const navigate = useNavigate();
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const currentHour = new Date().getHours();
    const greeting = currentHour < 12
        ? "Good morning"
        : currentHour < 17
            ? "Good afternoon"
            : "Good evening";

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const data = await getSellerDashboard();
                //   console.log("DashBoard Data:", data.data)
                setDashboard(data.data);

            } catch (error) {
                console.error(error);
                if (
                    error?.response?.status === 404 &&
                    error?.response?.data?.message === "Seller profile not found"
                ) {
                    navigate("/seller/setup", { replace: true });
                    return;
                }
                setError(
                    error?.response?.data?.message || "Unable to load dashboard"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, [navigate]);
    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#f4f5ef] px-4">
                <div className="w-full max-w-5xl animate-pulse">
                    <div className="h-9 w-64 rounded-lg bg-zinc-200" />
                    <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {Array.from({ length: 4 }, (_, index) => <div key={index} className="h-32 rounded-2xl bg-white" />)}
                    </div>
                    <div className="mt-6 h-80 rounded-2xl bg-white" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#f4f5ef] px-6">
                <div role="alert" className="max-w-lg rounded-2xl border border-red-200 bg-white p-6 text-center shadow-sm">
                    <h1 className="font-semibold text-zinc-900">Dashboard unavailable</h1>
                    <p className="mt-2 text-sm text-red-700">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen min-w-0 bg-[#f4f5ef] lg:flex">
            <Sidebar dashboard={dashboard} />

            <div className="flex min-w-0 flex-1 flex-col">
                <Header dashboard={dashboard} />

                <main className="min-w-0 flex-1 overflow-x-hidden bg-[#f4f5ef] px-3 py-5 sm:px-5 sm:py-7 lg:px-8 lg:py-9">
                    <div className="mx-auto w-full max-w-[1600px]">
                        <section className="mb-7 overflow-hidden rounded-3xl bg-[#e8eddb] p-5 sm:mb-8 sm:p-8">
                            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                            <div className="min-w-0">
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                                    {new Date().toLocaleDateString("en-US", {
                                        weekday: "long",
                                        month: "long",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
                                </p>
                                <h1 className="mt-2 font-display text-3xl font-semibold leading-tight tracking-[-0.04em] text-zinc-950 sm:text-4xl">
                                    {greeting}, {dashboard?.seller?.fullName || "Seller"}
                                </h1>
                                <p className="mt-2 max-w-md text-sm leading-6 text-zinc-600">
                                    Here&apos;s what&apos;s happening at {dashboard?.seller?.shopName || "your store"}.
                                </p>
                            </div>
                            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                                <Link to="/seller/products" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#111110] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-700">
                                    Manage products <ArrowRight size={16} />
                                </Link>
                                <Link to="/seller/orders" className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-white/70 px-4 py-2.5 text-sm font-semibold text-zinc-800 transition hover:bg-white">
                                    View orders
                                </Link>
                            </div>
                            </div>
                        </section>

                        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
                            <StatCard
                                title="Total Revenue"
                                value={`₹${Number(dashboard?.totalSales || 0).toLocaleString("en-IN")}`}
                                icon={DollarSign}
                            />

                            <StatCard
                                title="Total Orders"
                                value={`${dashboard?.totalOrders || 0}`}
                                icon={ShoppingBagIcon}
                            />

                            <StatCard
                                title="Total Products"
                                value={`${dashboard?.totalProducts || 0}`}
                                icon={Package}
                            />

                            <StatCard
                                title="Pending Orders"
                                value={`${dashboard?.pendingOrders || 0}`}
                                icon={Clock3}
                            />
                        </div>
                        <div className="mt-8 flex items-center justify-between sm:mt-10">
                            <div>
                                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">Performance</p>
                                <h2 className="mt-1 font-display text-xl font-semibold tracking-tight text-zinc-950">Your store at a glance</h2>
                            </div>
                            <span className="hidden items-center gap-1 text-xs font-medium text-zinc-500 sm:flex"><ArrowUpRight size={14} /> Live store metrics</span>
                        </div>
                        <div className="mt-4 grid min-w-0 gap-4 sm:mt-5 sm:gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
                            <RevenueChart data={dashboard?.revenueOverview} />
                            <OrderStatus data={dashboard?.orderStatusOverview} />
                        </div>
                        <div className="mt-4 grid min-w-0 gap-4 sm:mt-6 sm:gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
                            <RecentOrders orders={dashboard?.recentOrders || []} />
                            <LowStock products={dashboard?.lowestStockProducts || []} />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default SellerDashboard;
