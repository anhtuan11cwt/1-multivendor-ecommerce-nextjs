import { getData } from "@/lib/get-data";

export const fallbackCategories = [
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

export const fallbackMarkets = [
	{
		id: "market-1",
		logo: "/main_banner_bg.png",
		slug: "cho-nong-san-trung-uong",
		title: "Chợ Nông Sản Trung Ương",
	},
	{
		id: "market-2",
		logo: "/bottom_banner_image.png",
		slug: "cho-dem-tan-binh",
		title: "Chợ Đêm Tân Bình",
	},
	{
		id: "market-3",
		logo: "/leaf_icon.svg",
		slug: "cho-huu-co-saigon",
		title: "Chợ Hữu Cơ Sài Gòn",
	},
	{
		id: "market-4",
		logo: "/organic_vegitable_image.png",
		slug: "cho-thu-duc",
		title: "Chợ Thủ Đức",
	},
	{
		id: "market-5",
		logo: "/dairy_product_image.png",
		slug: "cho-binh-dien",
		title: "Chợ Bình Điền",
	},
	{
		id: "market-6",
		logo: "/bakery_image.png",
		slug: "cho-ben-thanh",
		title: "Chợ Bến Thành",
	},
];

export const fallbackTrainings = [
	{
		description:
			"Hướng dẫn trồng rau hữu cơ tại nhà: chuẩn bị đất, gieo hạt, chăm sóc và thu hoạch đúng kỹ thuật.",
		id: "training-1",
		imageUrl: "/organic_vegitable_image.png",
		slug: "ky-thuat-trong-rau-huu-co",
		title: "Kỹ thuật trồng rau hữu cơ",
	},
	{
		description:
			"Quy trình chăm sóc trái cây từ khi ra hoa đến thu hoạch giúp nâng cao năng suất và chất lượng.",
		id: "training-2",
		imageUrl: "/fresh_fruits_image.png",
		slug: "quy-trinh-cham-soc-trai-cay",
		title: "Quy trình chăm sóc trái cây",
	},
	{
		description:
			"Chế biến và bảo quản nông sản sau thu hoạch để giảm hao hụt và giữ độ tươi lâu hơn.",
		id: "training-3",
		imageUrl: "/grain_image.png",
		slug: "bao-quan-nong-san-sau-thu-hoach",
		title: "Bảo quản nông sản sau thu hoạch",
	},
];

export const fallbackBanners = [
	{
		alt: "Banner rau củ sạch",
		href: "/categories/vegetables",
		id: "banner-1",
		src: "/main_banner_bg.png",
	},
	{
		alt: "Banner nông sản tươi",
		href: "/products",
		id: "banner-2",
		src: "/bottom_banner_image.png",
	},
	{
		alt: "Trái cây tươi ngon",
		href: "/categories/fruits",
		id: "banner-3",
		src: "/fresh_fruits_image.png",
	},
	{
		alt: "Rau hữu cơ",
		href: "/categories/vegetables",
		id: "banner-4",
		src: "/organic_vegitable_image.png",
	},
	{
		alt: "Sản phẩm sữa",
		href: "/categories/dairy",
		id: "banner-5",
		src: "/dairy_product_image.png",
	},
];

export async function getBanners() {
	const data = await getData("api/banners");
	if (!Array.isArray(data) || data.length === 0) return fallbackBanners;
	return data.map((banner) => ({
		alt: banner.title || "Banner khuyến mãi",
		href: banner.link || "/products",
		id: banner.id,
		src: banner.imageUrl,
	}));
}

export async function getCategories() {
	const data = await getData("api/categories");
	if (!Array.isArray(data) || data.length === 0) return fallbackCategories;
	return data.map((category) => ({
		id: category.id,
		imageUrl: category.imageUrl || "",
		slug: category.slug || category.title,
		title: category.title,
	}));
}

export async function getMarkets() {
	const data = await getData("api/markets");
	if (!Array.isArray(data) || data.length === 0) return fallbackMarkets;
	return data.map((market) => ({
		id: market.id,
		logo: market.logo || "",
		slug: market.slug,
		title: market.title,
	}));
}

export async function getTrainings() {
	const data = await getData("api/trainings");
	if (!Array.isArray(data) || data.length === 0) return fallbackTrainings;
	return data.map((training) => ({
		description: training.description || "",
		id: training.id,
		imageUrl: training.imageUrl || "",
		slug: training.slug,
		title: training.title,
	}));
}
