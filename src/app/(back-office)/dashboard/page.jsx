import DashboardCharts from "@/components/back-office/dashboard-charts";
import Heading from "@/components/back-office/heading";
import LargeCards from "@/components/back-office/large-cards";
import SmallCards from "@/components/back-office/small-cards";

export default function Dashboard() {
	return (
		<div>
			<Heading title="Tổng quan" />
			<LargeCards />
			<SmallCards />
			<DashboardCharts />
		</div>
	);
}
