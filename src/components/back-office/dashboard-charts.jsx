import BestSellingProductsChart from "@/components/back-office/dashboard-charts/best-selling-products-chart";
import WeeklySalesChart from "@/components/back-office/dashboard-charts/weekly-sales-chart";

export default function DashboardCharts() {
	return (
		<div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
			<WeeklySalesChart />
			<BestSellingProductsChart />
		</div>
	);
}
