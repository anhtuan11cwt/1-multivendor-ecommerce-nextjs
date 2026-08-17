import NewMarketForm from "@/components/back-office/new-market-form";
import { getData } from "@/lib/get-data";

export default async function NewMarketPage() {
	const categories = await getData("api/categories");

	const categoryOptions = (categories || []).map((item) => ({
		id: item.id,
		title: item.title,
	}));

	return <NewMarketForm categories={categoryOptions} />;
}
