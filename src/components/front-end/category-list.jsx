import Image from "next/image";
import Link from "next/link";

import Slider from "@/components/front-end/slider";
import { getCategories } from "@/lib/frontend-data";

const pastelClasses = [
	"bg-amber-50",
	"bg-rose-50",
	"bg-lime-50",
	"bg-emerald-50",
	"bg-orange-50",
	"bg-sky-50",
	"bg-purple-50",
];

export default async function CategoryList() {
	const categories = await getCategories();

	return (
		<section className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
			<div className="mb-5 flex items-center justify-between">
				<h2 className="font-bold text-slate-900 text-xl dark:text-slate-100">
					Danh mục sản phẩm
				</h2>
				<Link
					className="rounded-md bg-slate-900 px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
					href="/products"
				>
					Xem tất cả
				</Link>
			</div>
			<Slider>
				{categories.map((category, index) => (
					<Link
						className={`${pastelClasses[index % pastelClasses.length]} w-[45%] shrink-0 snap-start rounded-lg p-5 text-center transition hover:shadow-md sm:w-[30%] lg:w-[22%] xl:w-[15%] dark:bg-slate-800`}
						href={`/categories/${category.slug}`}
						key={category.id}
					>
						<div className="relative mx-auto size-20 overflow-hidden rounded-full bg-white/70">
							<Image
								alt={category.title}
								className="object-cover"
								fill
								sizes="80px"
								src={category.imageUrl || "/box_icon.svg"}
								unoptimized
							/>
						</div>
						<p className="mt-3 truncate font-medium text-slate-800 text-sm dark:text-slate-100">
							{category.title}
						</p>
					</Link>
				))}
			</Slider>
		</section>
	);
}
