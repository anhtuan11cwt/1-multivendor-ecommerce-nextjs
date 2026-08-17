import NewTrainingForm from "@/components/back-office/new-training-form";
import { getData } from "@/lib/get-data";

export default async function NewTrainingPage() {
	const categories = await getData("api/categories");

	const categoryOptions = (categories || []).map((item) => ({
		id: item.id,
		title: item.title,
	}));

	return <NewTrainingForm categories={categoryOptions} />;
}
