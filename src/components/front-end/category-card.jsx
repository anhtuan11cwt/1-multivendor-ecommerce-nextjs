import Image from "next/image";
import Link from "next/link";

import ProductCard from "@/components/front-end/product-card";
import Slider from "@/components/front-end/slider";

export default function CategoryCard({ category }) {
	if (!category.products || category.products.length === 0) return null;

	return (
		<div className="py-6">
			<div className="mb-5 flex items-center justify-between gap-4">
				<div className="flex items-center gap-3">
					<Image
						alt={category.title}
						className="size-8 shrink-0 rounded-md object-cover"
						height={32}
						src={category.imageUrl || "/box_icon.svg"}
						unoptimized
						width={32}
					/>
					<h3 className="font-bold text-lime-600 text-xl dark:text-lime-400">
						{category.title}
					</h3>
				</div>
				<Link
					className="rounded-md bg-lime-600 px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-lime-700 dark:bg-lime-500 dark:text-slate-950 dark:hover:bg-lime-400"
					href={`/categories/${category.slug}`}
				>
					Xem tất cả
				</Link>
			</div>
			<Slider>
				{category.products.map((product) => (
					<ProductCard
						className="w-[70%] shrink-0 snap-start sm:w-[45%] md:w-[30%] lg:w-[24%] xl:w-[18%]"
						key={product.id}
						product={product}
					/>
				))}
			</Slider>
		</div>
	);
}
