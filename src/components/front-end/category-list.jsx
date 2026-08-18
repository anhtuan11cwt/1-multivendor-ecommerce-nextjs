import CategoryCard from "@/components/front-end/category-card";
import { getCategories } from "@/lib/frontend-data";

export default async function CategoryList() {
	const categories = await getCategories();

	return (
		<section className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
			{categories.map((category) => (
				<CategoryCard category={category} key={category.id} />
			))}
		</section>
	);
}
