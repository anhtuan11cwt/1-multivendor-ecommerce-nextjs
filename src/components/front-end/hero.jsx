import HeroCarousel from "@/components/front-end/hero-carousel";
import Sidebar from "@/components/front-end/sidebar";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

const fallbackCategories = [
	{
		id: "vegetables",
		imageUrl: "/organic_vegitable_image.png",
		slug: "vegetables",
		title: "Rau hữu cơ",
	},
	{
		id: "fruits",
		imageUrl: "/fresh_fruits_image.png",
		slug: "fruits",
		title: "Trái cây tươi",
	},
	{
		id: "drinks",
		imageUrl: "/bottles_image.png",
		slug: "drinks",
		title: "Nước giải khát",
	},
	{
		id: "instant",
		imageUrl: "/maggi_image.png",
		slug: "instant",
		title: "Đồ ăn nhanh",
	},
	{
		id: "dairy",
		imageUrl: "/dairy_product_image.png",
		slug: "dairy",
		title: "Sản phẩm sữa",
	},
	{
		id: "bakery",
		imageUrl: "/bakery_image.png",
		slug: "bakery",
		title: "Bánh mì & bánh ngọt",
	},
	{
		id: "grains",
		imageUrl: "/grain_image.png",
		slug: "grains",
		title: "Ngũ cốc",
	},
];

async function getCategories() {
	try {
		const res = await fetch(`${BASE_URL}/api/categories`, {
			cache: "no-store",
		});
		if (!res.ok) throw new Error("Lỗi lấy danh sách danh mục");
		const json = await res.json();
		const data = Array.isArray(json.data) ? json.data : [];
		if (data.length === 0) return fallbackCategories;
		return data.map((category) => ({
			id: category.id,
			imageUrl: category.imageUrl || "",
			slug: category.slug || category.title,
			title: category.title,
		}));
	} catch {
		return fallbackCategories;
	}
}

export default async function Hero() {
	const categories = await getCategories();

	return (
		<section className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
				<div className="hidden lg:block">
					<Sidebar categories={categories} />
				</div>
				<div className="lg:col-span-2">
					<HeroCarousel />
				</div>
			</div>
		</section>
	);
}
