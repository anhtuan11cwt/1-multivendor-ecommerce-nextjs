import HeroCarousel from "@/components/front-end/hero-carousel";
import Sidebar from "@/components/front-end/sidebar";
import UtilitySidebar from "@/components/front-end/utility-sidebar";
import { getBanners, getCategories } from "@/lib/frontend-data";

export default async function Hero() {
	const categories = await getCategories();
	const banners = await getBanners();

	return (
		<section className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
				<div className="hidden lg:col-span-3 lg:block">
					<Sidebar categories={categories} />
				</div>
				<div className="lg:col-span-6">
					<HeroCarousel banners={banners} />
				</div>
				<div className="hidden lg:col-span-3 lg:block">
					<UtilitySidebar />
				</div>
			</div>
		</section>
	);
}
