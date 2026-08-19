import {DollarSign,Package,ShoppingBag, Clock3, ShoppingBagIcon,} from "lucide-react";
import Sidebar from "../../components/seller/Sidebar";
import Header from "../../components/seller/Header";
import StatCard from "../../components/seller/StatCard";
import RevenueChart from "../../components/seller/RevenueChart";
import OrderStatus from "../../components/seller/OderStatus";
import RecentOrders from "../../components/seller/RecentOrders";
import LowStock from "../../components/seller/LowStock";



const SellerDashboard = () => {
    return (
        <div className="flex min-h-screen bg-zinc-50">
            <Sidebar />

            <div className="flex min-w-0 flex-1 flex-col">
                <Header />

                <main className="p-6">
                    <h1 className="text-2xl font-semibold text-zinc-900">
                        Good morning, Virendra
                    </h1>

                    <p className="mt-1 text-sm text-zinc-500">
                        Here's what's happening with your store today.
                    </p>
                    {/* StatCard */}
                    <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        <StatCard
                            title="Total Revenue"
                            value="₹84,250"
                            change="+18.2%"
                            icon={DollarSign}
                        />

                        <StatCard
                            title="Total Orders"
                            value="342"
                            change="+18.2%"
                            icon={ShoppingBagIcon}
                        />

                        <StatCard
                            title="Total Products"
                            value="128"
                            change="+18.2%"
                            icon={Package}
                        />

                        <StatCard
                            title="Pending Orders"
                            value="12"
                            change="+18.2%"
                            icon={Clock3}
                        />
                    </div>
                    {/* RevenueCharts */}
                    <div className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
                      <RevenueChart/>
                      <OrderStatus/>
                    </div>
                    <div className="mt-6 grid gap-6 xl:grid-cols-2">
                     <RecentOrders/>
                     <LowStock/>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default SellerDashboard;