import NewProductForm from "@/components/back-office/new-product-form";
import { getData } from "@/lib/get-data";

export default async function NewProductPage() {
	const [categories, farmers] = await Promise.all([
		getData("api/categories"),
		getData("api/farmers"),
	]);

	const categoryOptions = (categories || []).map((item) => ({
		id: item.id,
		title: item.title,
	}));
	const farmerOptions = (farmers || []).map((item) => ({
		id: item.id,
		title: item.name,
	}));

	return (
		<NewProductForm categories={categoryOptions} farmers={farmerOptions} />
	);
}
