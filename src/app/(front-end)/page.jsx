import CategoryList from "@/components/front-end/category-list";
import CommunityTrainings from "@/components/front-end/community-trainings";
import Hero from "@/components/front-end/hero";
import MarketList from "@/components/front-end/market-list";

export default function Home() {
	return (
		<>
			<Hero />
			<MarketList />
			<CategoryList />
			<CommunityTrainings />
		</>
	);
}
