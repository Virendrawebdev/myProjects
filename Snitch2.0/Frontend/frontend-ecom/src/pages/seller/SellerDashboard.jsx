import { ArrowUpRight, CalendarDays, Clock3, DollarSign, Download, Package, ShoppingBagIcon } from "lucide-react";
import Sidebar from "../../components/seller/Sidebar";
import Header from "../../components/seller/Header";
import StatCard from "../../components/seller/StatCard";
import RevenueChart from "../../components/seller/RevenueChart";
import OrderStatus from "../../components/seller/OrderStatus";
import RecentOrders from "../../components/seller/RecentOrders";
import LowStock from "../../components/seller/LowStock";
import { useEffect, useState } from "react";
import { getSellerDashboard } from "../../services/dashboard.api";



const SellerDashboard = () => {
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const data = await getSellerDashboard();
                //   console.log("DashBoard Data:", data.data)
                setDashboard(data.data);

            } catch (error) {
                console.error(error);
                setError("Unable to load dashboard");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);
    if (loading) {
        return <div className="flex min-h-screen items-center justify-center bg-[#f4f5ef] text-sm text-zinc-500">Loading your store overview...</div>;
    }

    if (error) {
        return <div className="flex min-h-screen items-center justify-center bg-[#f4f5ef] px-6 text-center text-sm text-red-600">{error}</div>;
    }

    return (
        <div className="sm:flex min-h-screen min-w-0 bg-[#f4f5ef]">
            <Sidebar dashboard={dashboard} />

            <div className="flex min-w-0 flex-1 flex-col">
                <Header dashboard={dashboard} />

                <main className="min-w-0 flex-1 overflow-x-hidden bg-[#f4f5ef] px-3 py-5 sm:px-5 sm:py-7 lg:px-8 lg:py-9">
                    <div className="mx-auto w-full max-w-[1600px]">
                        <section className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                            <div>
                                <p className="text-sm font-medium uppercase tracking-[0.25em] text-zinc-400">
                                    {new Date().toLocaleDateString("en-US", {
                                        weekday: "long",
                                        month: "long",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
                                </p>
                                <h1 className="font-display text-[2rem] font-semibold leading-none tracking-[-0.04em] text-zinc-950 sm:text-4xl">
                                    Good morning, {dashboard?.seller?.fullName || "Seller"}
                                </h1>
                                <p className="mt-3 max-w-md text-sm leading-6 text-zinc-500">
                                    Here&apos;s what&apos;s happening with your store today.
                                </p>
                            </div>
                            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                                <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-700 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50">
                                    <CalendarDays size={16} />
                                    Last 7 days
                                </button>
                                <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#111110] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-700">
                                    <Download size={16} />
                                    Export report
                                </button>
                            </div>
                        </section>

                        <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
                            <StatCard
                                title="Total Revenue"
                                value={`${dashboard?.totalSales || 0}`}
                                change="+18.2%"
                                icon={DollarSign}
                            />

                            <StatCard
                                title="Total Orders"
                                value={`${dashboard?.totalOrders || 0}`}
                                change="+18.2%"
                                icon={ShoppingBagIcon}
                            />

                            <StatCard
                                title="Total Products"
                                value={`${dashboard?.totalProducts || 0}`}
                                change="+18.2%"
                                icon={Package}
                            />

                            <StatCard
                                title="Pending Orders"
                                value={`${dashboard?.pendingOrders || 0}`}
                                change="+18.2%"
                                icon={Clock3}
                            />
                        </div>
                        <div className="mt-8 flex items-center justify-between sm:mt-10">
                            <div>
                                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">Performance</p>
                                <h2 className="mt-1 font-display text-xl font-semibold tracking-tight text-zinc-950">Your store at a glance</h2>
                            </div>
                            <span className="hidden items-center gap-1 text-xs font-medium text-emerald-700 sm:flex"><ArrowUpRight size={14} /> 18.2% this month</span>
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



