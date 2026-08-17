const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

const PRICE_SCALE = 1000;

const categoryList = [
	{
		description: "Rau củ hữu cơ tươi sạch từ nông trại",
		imageUrl: "/organic_vegitable_image.png",
		slug: "vegetables",
		title: "Rau hữu cơ",
	},
	{
		description: "Trái cây tươi ngon, giàu vitamin",
		imageUrl: "/fresh_fruits_image.png",
		slug: "fruits",
		title: "Trái cây tươi",
	},
	{
		description: "Nước giải khát mát lạnh",
		imageUrl: "/bottles_image.png",
		slug: "drinks",
		title: "Nước giải khát",
	},
	{
		description: "Đồ ăn nhanh tiện lợi",
		imageUrl: "/maggi_image.png",
		slug: "instant",
		title: "Đồ ăn nhanh",
	},
	{
		description: "Sản phẩm từ sữa tươi nguyên chất",
		imageUrl: "/dairy_product_image.png",
		slug: "dairy",
		title: "Sản phẩm sữa",
	},
	{
		description: "Bánh mì và bánh ngọt mới nướng",
		imageUrl: "/bakery_image.png",
		slug: "bakery",
		title: "Bánh mì & bánh ngọt",
	},
	{
		description: "Ngũ cốc và các loại hạt dinh dưỡng",
		imageUrl: "/grain_image.png",
		slug: "grains",
		title: "Ngũ cốc",
	},
];

const productList = [
	{
		category: "vegetables",
		image: "/potato_image_1.png",
		name: "Khoai tây 500g",
		offerPrice: 20,
		price: 25,
	},
	{
		category: "vegetables",
		image: "/tomato_image.png",
		name: "Cà chua 1 kg",
		offerPrice: 35,
		price: 40,
	},
	{
		category: "vegetables",
		image: "/carrot_image.png",
		name: "Cà rốt 500g",
		offerPrice: 28,
		price: 30,
	},
	{
		category: "vegetables",
		image: "/spinach_image_1.png",
		name: "Rau chân vịt 500g",
		offerPrice: 15,
		price: 18,
	},
	{
		category: "vegetables",
		image: "/onion_image_1.png",
		name: "Hành tây 500g",
		offerPrice: 19,
		price: 22,
	},
	{
		category: "fruits",
		image: "/apple_image.png",
		name: "Táo đỏ 1 kg",
		offerPrice: 110,
		price: 120,
	},
	{
		category: "fruits",
		image: "/orange_image.png",
		name: "Cam sành 1 kg",
		offerPrice: 75,
		price: 80,
	},
	{
		category: "fruits",
		image: "/banana_image_1.png",
		name: "Chuối tiêu 1 kg",
		offerPrice: 45,
		price: 50,
	},
	{
		category: "fruits",
		image: "/mango_image_1.png",
		name: "Xoài cát 1 kg",
		offerPrice: 140,
		price: 150,
	},
	{
		category: "fruits",
		image: "/grapes_image_1.png",
		name: "Nho ngọt 500g",
		offerPrice: 65,
		price: 70,
	},
	{
		category: "dairy",
		image: "/amul_milk_image.png",
		name: "Sữa tươi nguyên chất 1L",
		offerPrice: 55,
		price: 60,
	},
	{
		category: "dairy",
		image: "/paneer_image.png",
		name: "Phô mai tươi 200g",
		offerPrice: 85,
		price: 90,
	},
	{
		category: "dairy",
		image: "/eggs_image.png",
		name: "Trứng gà ta 12 quả",
		offerPrice: 85,
		price: 90,
	},
	{
		category: "dairy",
		image: "/paneer_image_2.png",
		name: "Phô mai tươi 250g",
		offerPrice: 95,
		price: 110,
	},
	{
		category: "dairy",
		image: "/cheese_image.png",
		name: "Phô mai con bò cười 200g",
		offerPrice: 130,
		price: 140,
	},
	{
		category: "drinks",
		image: "/coca_cola_image.png",
		name: "Coca-Cola 1.5L",
		offerPrice: 75,
		price: 80,
	},
	{
		category: "drinks",
		image: "/pepsi_image.png",
		name: "Pepsi 1.5L",
		offerPrice: 73,
		price: 78,
	},
	{
		category: "drinks",
		image: "/sprite_image_1.png",
		name: "Sprite 1.5L",
		offerPrice: 74,
		price: 79,
	},
	{
		category: "drinks",
		image: "/fanta_image_1.png",
		name: "Fanta cam 1.5L",
		offerPrice: 72,
		price: 77,
	},
	{
		category: "drinks",
		image: "/seven_up_image_1.png",
		name: "7 Up 1.5L",
		offerPrice: 71,
		price: 76,
	},
	{
		category: "grains",
		image: "/basmati_rice_image.png",
		name: "Gạo Basmati 5kg",
		offerPrice: 520,
		price: 550,
	},
	{
		category: "grains",
		image: "/wheat_flour_image.png",
		name: "Bột mì nguyên cám 5kg",
		offerPrice: 230,
		price: 250,
	},
	{
		category: "grains",
		image: "/quinoa_image.png",
		name: "Diêm mạch hữu cơ 500g",
		offerPrice: 420,
		price: 450,
	},
	{
		category: "grains",
		image: "/brown_rice_image.png",
		name: "Gạo lứt 1kg",
		offerPrice: 110,
		price: 120,
	},
	{
		category: "grains",
		image: "/barley_image.png",
		name: "Lúa mạch 1kg",
		offerPrice: 140,
		price: 150,
	},
	{
		category: "bakery",
		image: "/brown_bread_image.png",
		name: "Bánh mì nâu 400g",
		offerPrice: 35,
		price: 40,
	},
	{
		category: "bakery",
		image: "/butter_croissant_image.png",
		name: "Bánh sừng bò bơ 100g",
		offerPrice: 45,
		price: 50,
	},
	{
		category: "bakery",
		image: "/chocolate_cake_image.png",
		name: "Bánh sô cô la 500g",
		offerPrice: 325,
		price: 350,
	},
	{
		category: "bakery",
		image: "/whole_wheat_bread_image.png",
		name: "Bánh mì nguyên cám 400g",
		offerPrice: 40,
		price: 45,
	},
	{
		category: "bakery",
		image: "/vanilla_muffins_image.png",
		name: "Bánh nướng vani 6 cái",
		offerPrice: 90,
		price: 100,
	},
	{
		category: "instant",
		image: "/maggi_image.png",
		name: "Mì Maggi 280g",
		offerPrice: 50,
		price: 55,
	},
	{
		category: "instant",
		image: "/top_ramen_image.png",
		name: "Mì Top Ramen 270g",
		offerPrice: 40,
		price: 45,
	},
	{
		category: "instant",
		image: "/knorr_soup_image.png",
		name: "Súp Knorr 70g",
		offerPrice: 30,
		price: 35,
	},
	{
		category: "instant",
		image: "/yippee_image.png",
		name: "Mì Yippee 260g",
		offerPrice: 45,
		price: 50,
	},
	{
		category: "instant",
		image: "/maggi_oats_image.png",
		name: "Mì yến mạch 72g",
		offerPrice: 35,
		price: 40,
	},
];

const farmerList = [
	{
		code: "FRM-001",
		contactPerson: "Nguyễn Văn An",
		contactPersonPhone: "0912345678",
		crops: ["Rau cải", "Cà chua", "Khoai tây", "Cà rốt"],
		email: "an.nguyen@farm.demo",
		landSize: 2.5,
		mainCrop: "Rau củ",
		name: "Nguyễn Văn An",
		phone: "0912345678",
		physicalAddress: "Xã Hòa Bình, huyện Củ Chi, TP.HCM",
		profileImageUrl: "/organic_vegitable_image.png",
	},
	{
		code: "FRM-002",
		contactPerson: "Trần Thị Bình",
		contactPersonPhone: "0987654321",
		crops: ["Xoài", "Cam", "Chuối", "Nho"],
		email: "binh.tran@farm.demo",
		landSize: 4,
		mainCrop: "Trái cây",
		name: "Trần Thị Bình",
		phone: "0987654321",
		physicalAddress: "Xã Minh Đức, huyện Thủ Đức, TP.HCM",
		profileImageUrl: "/fresh_fruits_image.png",
	},
	{
		code: "FRM-003",
		contactPerson: "Lê Văn Cường",
		contactPersonPhone: "0905123456",
		crops: ["Lúa gạo", "Lúa mì", "Yến mạch"],
		email: "cuong.le@farm.demo",
		landSize: 6.8,
		mainCrop: "Ngũ cốc",
		name: "Lê Văn Cường",
		phone: "0905123456",
		physicalAddress: "Xã Tân Phú, huyện Đồng Xoài, Bình Phước",
		profileImageUrl: "/grain_image.png",
	},
];

const marketList = [
	{
		categorySlugs: ["vegetables", "fruits", "grains", "dairy"],
		description: "Chợ đầu mối nông sản lớn nhất khu vực",
		logo: "/main_banner_bg.png",
		slug: "cho-nong-san-trung-uong",
		title: "Chợ Nông Sản Trung Ương",
	},
	{
		categorySlugs: ["instant", "bakery", "drinks"],
		description: "Chợ đêm chuyên đồ ăn nhanh, bánh kẹo",
		logo: "/bottom_banner_image.png",
		slug: "cho-dem-tan-binh",
		title: "Chợ Đêm Tân Bình",
	},
	{
		categorySlugs: ["vegetables", "fruits"],
		description: "Chuyên rau củ quả hữu cơ và sản phẩm sạch",
		logo: "/leaf_icon.svg",
		slug: "cho-huu-co-saigon",
		title: "Chợ Hữu Cơ Sài Gòn",
	},
	{
		categorySlugs: ["vegetables", "fruits", "drinks", "bakery"],
		description: "Chợ hiện đại trong khu đô thị Phú Mỹ Hưng",
		logo: "/bottom_banner_image.png",
		slug: "cho-phu-my-hung",
		title: "Chợ Phú Mỹ Hưng",
	},
	{
		categorySlugs: ["vegetables", "grains", "dairy"],
		description: "Chợ đầu mối rau củ quả tại Hóc Môn",
		logo: "/organic_vegitable_image.png",
		slug: "cho-hoc-mon",
		title: "Chợ Hóc Môn",
	},
	{
		categorySlugs: ["bakery", "instant", "fruits"],
		description: "Chợ truyền thống giữa lòng quận Bình Thạnh",
		logo: "/bakery_image.png",
		slug: "cho-ba-chieu",
		title: "Chợ Bà Chiểu",
	},
];

const bannerList = [
	{
		imageUrl: "/main_banner_bg.png",
		link: "/categories/vegetables",
		title: "Rau củ sạch mỗi ngày",
	},
	{
		imageUrl: "/bottom_banner_image.png",
		link: "/products",
		title: "Nông sản tươi ngon giá tốt",
	},
	{
		imageUrl: "/fresh_fruits_image.png",
		link: "/categories/fruits",
		title: "Ưu đãi trái cây tươi",
	},
	{
		imageUrl: "/dairy_product_image.png",
		link: "/categories/dairy",
		title: "Sản phẩm sữa chất lượng",
	},
	{
		imageUrl: "/bottles_image.png",
		link: "/categories/drinks",
		title: "Nước giải khát mát lạnh",
	},
	{
		imageUrl: "/bakery_image.png",
		link: "/categories/bakery",
		title: "Bánh mì & bánh ngọt mới ra lò",
	},
	{
		imageUrl: "/grain_image.png",
		link: "/categories/grains",
		title: "Ngũ cốc dinh dưỡng",
	},
	{
		imageUrl: "/maggi_image.png",
		link: "/categories/instant",
		title: "Đồ ăn nhanh tiện lợi",
	},
];

const couponList = [
	{ couponCode: "WELCOME10", title: "Ưu đãi đơn hàng đầu tiên" },
	{ couponCode: "SALE50K", title: "Giảm 50k cho đơn từ 500k" },
	{ couponCode: "FREESHIP", title: "Miễn phí giao hàng" },
];

const trainingList = [
	{
		categorySlug: "vegetables",
		content: "Bài đào tạo chi tiết về kỹ thuật trồng rau hữu cơ...",
		description: "Hướng dẫn trồng rau hữu cơ tại nhà",
		imageUrl: "/organic_vegitable_image.png",
		slug: "ky-thuat-trong-rau-huu-co",
		title: "Kỹ thuật trồng rau hữu cơ",
	},
	{
		categorySlug: "fruits",
		content:
			"Hướng dẫn quy trình chăm sóc trái cây từ khi ra hoa đến thu hoạch...",
		description: "Chăm sóc và thu hoạch trái cây đúng chuẩn",
		imageUrl: "/fresh_fruits_image.png",
		slug: "quy-trinh-cham-soc-trai-cay",
		title: "Quy trình chăm sóc trái cây",
	},
	{
		categorySlug: "dairy",
		content: "Hướng dẫn chăn nuôi an toàn sinh học cho gia súc, gia cầm...",
		description: "Chăn nuôi gia súc, gia cầm an toàn sinh học",
		imageUrl: "/eggs_image.png",
		slug: "ky-thuat-chan-nuoi-an-toan",
		title: "Kỹ thuật chăn nuôi an toàn",
	},
	{
		categorySlug: "grains",
		content: "Giới thiệu các công nghệ hỗ trợ canh tác và quản lý nông trại...",
		description: "Ứng dụng công nghệ hiện đại vào canh tác",
		imageUrl: "/grain_image.png",
		slug: "ung-dung-cong-nghe-nong-nghiep",
		title: "Ứng dụng công nghệ trong nông nghiệp",
	},
	{
		categorySlug: "fruits",
		content: "Chia sẻ kinh nghiệm bán nông sản online hiệu quả...",
		description: "Kinh nghiệm bán nông sản online hiệu quả",
		imageUrl: "/maggi_image.png",
		slug: "ky-nang-ban-hang-online",
		title: "Kỹ năng bán hàng online",
	},
];

function slugify(value) {
	return value
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/đ/g, "d")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

function daysFromNow(days) {
	const date = new Date();
	date.setDate(date.getDate() + days);
	return date;
}

async function seed() {
	console.log("Bắt đầu seed dữ liệu...");

	const hashedPassword = await bcrypt.hash("Demo123!", 10);

	const demoUser = await db.user.upsert({
		create: {
			email: "customer@demo.com",
			name: "Khách Hàng Demo",
			password: hashedPassword,
			role: "USER",
		},
		update: {},
		where: { email: "customer@demo.com" },
	});

	const farmerUsers = [];
	for (const farmerData of farmerList) {
		const user = await db.user.upsert({
			create: {
				email: farmerData.email,
				name: farmerData.name,
				password: hashedPassword,
				role: "FARMER",
			},
			update: {},
			where: { email: farmerData.email },
		});
		farmerUsers.push(user);
	}

	const farmers = [];
	for (const [index, farmerData] of farmerList.entries()) {
		const existing = await db.farmer.findFirst({
			where: { code: farmerData.code },
		});
		const payload = {
			...farmerData,
			isActive: true,
			userId: farmerUsers[index].id,
		};
		const farmer = existing
			? await db.farmer.update({ data: payload, where: { id: existing.id } })
			: await db.farmer.create({ data: payload });
		farmers.push(farmer);
		console.log(`Đã tạo nông dân: ${farmer.name}`);
	}

	const categories = [];
	for (const categoryData of categoryList) {
		const category = await db.category.upsert({
			create: {
				...categoryData,
				marketIds: [],
			},
			update: {
				description: categoryData.description,
				imageUrl: categoryData.imageUrl,
				title: categoryData.title,
			},
			where: { slug: categoryData.slug },
		});
		categories.push(category);
		console.log(`Đã tạo danh mục: ${category.title}`);
	}

	const categoryBySlug = Object.fromEntries(
		categories.map((category) => [category.slug, category]),
	);

	const markets = [];
	for (const marketData of marketList) {
		const categoryIds = marketData.categorySlugs.map(
			(slug) => categoryBySlug[slug].id,
		);
		const market = await db.market.upsert({
			create: {
				categoryIds,
				description: marketData.description,
				logo: marketData.logo,
				slug: marketData.slug,
				title: marketData.title,
			},
			update: {
				categoryIds,
				description: marketData.description,
				logo: marketData.logo,
				title: marketData.title,
			},
			where: { slug: marketData.slug },
		});
		markets.push(market);
		console.log(`Đã tạo chợ: ${market.title}`);
	}

	for (const category of categories) {
		const linkedMarketIds = markets
			.filter((market) => market.categoryIds.includes(category.id))
			.map((market) => market.id);
		await db.category.update({
			data: { marketIds: linkedMarketIds },
			where: { id: category.id },
		});
	}

	const seededFarmerIds = farmers.map((farmer) => farmer.id);
	await db.product.deleteMany({ where: { farmerId: { in: seededFarmerIds } } });

	const usedSlugs = new Set();
	for (const productData of productList) {
		let slug = slugify(productData.name);
		if (usedSlugs.has(slug)) {
			slug = `${slug}-${usedSlugs.size}`;
		}
		usedSlugs.add(slug);

		const category = categoryBySlug[productData.category];
		const farmer = farmers[productList.indexOf(productData) % farmers.length];

		await db.product.upsert({
			create: {
				categoryId: category.id,
				farmerId: farmer.id,
				imageUrl: productData.image,
				isActive: true,
				price: productData.price * PRICE_SCALE,
				productStock: 100,
				quantity: 1,
				salePrice: productData.offerPrice * PRICE_SCALE,
				slug,
				tags: [category.title],
				title: productData.name,
				unitOfMeasurement: "kg",
			},
			update: {
				imageUrl: productData.image,
				price: productData.price * PRICE_SCALE,
				salePrice: productData.offerPrice * PRICE_SCALE,
			},
			where: { slug },
		});
	}
	console.log(`Đã tạo ${productList.length} sản phẩm`);

	await db.banner.deleteMany({});
	for (const banner of bannerList) {
		await db.banner.create({ data: banner });
	}
	console.log(`Đã tạo ${bannerList.length} banner`);

	for (const coupon of couponList) {
		const data = { ...coupon, expiryDate: daysFromNow(30) };
		const existing = await db.coupon.findFirst({
			where: { couponCode: coupon.couponCode },
		});
		if (existing) {
			await db.coupon.update({ data, where: { id: existing.id } });
		} else {
			await db.coupon.create({ data });
		}
	}
	console.log(`Đã tạo ${couponList.length} coupon`);

	await db.training.deleteMany({});
	for (const training of trainingList) {
		await db.training.create({
			data: {
				categoryId: categoryBySlug[training.categorySlug].id,
				content: training.content,
				description: training.description,
				imageUrl: training.imageUrl,
				slug: training.slug,
				title: training.title,
			},
		});
	}
	console.log(`Đã tạo ${trainingList.length} bài đào tạo`);

	console.log("Seed dữ liệu hoàn tất!");
	console.log("Tài khoản demo:");
	console.log(`  - Khách hàng: ${demoUser.email} / Demo123!`);
	console.log(
		`  - Nông dân:   ${farmerUsers.map((user) => user.email).join(", ")} / Demo123!`,
	);
}

seed()
	.catch((error) => {
		console.error("Lỗi khi seed dữ liệu:", error);
		process.exit(1);
	})
	.finally(async () => {
		await db.$disconnect();
	});
