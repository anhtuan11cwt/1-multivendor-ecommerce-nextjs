"use client";

import { Send, Share2, Tag } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import Breadcrumb from "@/components/front-end/breadcrumb";
import ProductCard from "@/components/front-end/product-card";
import QuantitySelector from "@/components/front-end/quantity-selector";
import Slider from "@/components/front-end/slider";
import { useCart } from "@/lib/cart-context";
import { formatVND } from "@/lib/frontend-data";

const deliveryTypes = [
	{ label: "Khu vực", value: "TP. Hồ Chí Minh" },
	{ label: "Quận", value: "Quận 1" },
];

export default function ProductDetailClient({
	category,
	product,
	relatedProducts,
}) {
	const [quantity, setQuantity] = useState(1);
	const { addItem } = useCart();

	const hasSale =
		product.salePrice != null && product.salePrice < product.price;
	const discountPercent = hasSale
		? Math.round(((product.price - product.salePrice) / product.price) * 100)
		: 0;

	return (
		<div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
			<Breadcrumb
				items={[
					{
						href: `/categories/${category?.slug || ""}`,
						label: category?.title || "Sản phẩm",
					},
					{ label: product.title },
				]}
			/>

			<div className="grid grid-cols-1 gap-8 lg:grid-cols-10">
				<div className="lg:col-span-4">
					<div className="relative aspect-square w-full overflow-hidden rounded-xl bg-white dark:bg-slate-900">
						<Image
							alt={product.title}
							className="object-cover"
							fill
							sizes="(max-width: 1024px) 100vw, 25vw"
							src={product.imageUrl || "/box_icon.svg"}
							unoptimized
						/>
					</div>
				</div>

				<div className="lg:col-span-4">
					<div className="flex items-start justify-between gap-4">
						<h1 className="font-bold text-2xl text-slate-900 dark:text-slate-100">
							{product.title}
						</h1>
						<button
							aria-label="Chia sẻ sản phẩm"
							className="inline-flex size-10 shrink-0 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
							type="button"
						>
							<Share2 className="size-5" />
						</button>
					</div>
					<p className="mt-3 border-slate-200 border-b pb-4 text-base text-slate-500 dark:border-slate-700 dark:text-slate-400">
						{product.description ||
							"Sản phẩm tươi ngon từ nông trại, đảm bảo chất lượng và vệ sinh an toàn thực phẩm."}
					</p>

					<div className="mt-4 flex items-center gap-4">
						<span className="rounded-full bg-slate-200 px-4 py-2 font-medium text-slate-700 text-sm dark:bg-slate-700 dark:text-slate-200">
							SKU: {product.sku || product.productCode || "N/A"}
						</span>
						<span className="rounded-full bg-lime-100 px-4 py-2 font-medium text-lime-800 text-sm dark:bg-lime-500/20 dark:text-lime-400">
							{product.productStock != null && product.productStock > 0
								? `Còn ${product.productStock} sản phẩm`
								: "Còn hàng"}
						</span>
					</div>

					<div className="mt-6 flex items-end justify-between gap-4">
						<div>
							<div className="flex items-center gap-3">
								{hasSale && (
									<span className="text-lg text-slate-400 line-through">
										{formatVND(product.price)}
									</span>
								)}
								<span className="font-bold text-3xl text-slate-900 dark:text-slate-100">
									{formatVND(product.salePrice ?? product.price)}
								</span>
							</div>
							{hasSale && (
								<span className="mt-2 inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 font-semibold text-red-600 text-xs dark:bg-red-500/20 dark:text-red-400">
									<Tag className="size-3.5" />
									Tiết kiệm {discountPercent}%
								</span>
							)}
						</div>
					</div>

					<div className="mt-6 flex items-center justify-between gap-4">
						<QuantitySelector onChange={setQuantity} quantity={quantity} />
						<button
							className="inline-flex flex-1 items-center justify-center rounded-xl bg-lime-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-lime-700 dark:bg-lime-500 dark:text-slate-950 dark:hover:bg-lime-400"
							onClick={() =>
								addItem(
									{
										categoryTitle: category?.title || "",
										id: product.id,
										imageUrl: product.imageUrl,
										price: product.salePrice ?? product.price,
										slug: product.slug,
										title: product.title,
									},
									quantity,
								)
							}
							type="button"
						>
							Thêm vào giỏ
						</button>
					</div>
				</div>

				<div className="lg:col-span-2">
					<aside className="rounded-xl border border-slate-200 bg-white px-6 py-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
						<h2 className="font-bold text-slate-900 dark:text-slate-100">
							Giao hàng & Hoàn trả
						</h2>
						<div className="mt-4 flex items-center gap-3 border-slate-200 border-b pb-4 dark:border-slate-700">
							<div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-lime-100 text-lime-800 dark:bg-lime-500/20 dark:text-lime-400">
								<Send className="size-5" />
							</div>
							<p className="text-slate-600 text-sm dark:text-slate-300">
								Đủ điều kiện miễn phí giao hàng
							</p>
						</div>
						<div className="pt-4">
							<h3 className="mb-3 font-semibold text-slate-900 text-sm dark:text-slate-100">
								Chọn vị trí giao hàng
							</h3>
							{deliveryTypes.map((field) => (
								<select
									className="w-full border-slate-200 border-b bg-transparent py-2.5 text-slate-700 text-sm outline-none dark:border-slate-700 dark:text-slate-200"
									defaultValue={field.value}
									key={field.label}
								>
									<option value={field.value}>{field.label}</option>
								</select>
							))}
						</div>
					</aside>
				</div>
			</div>

			{relatedProducts.length > 0 && (
				<section className="my-8">
					<h2 className="mb-5 font-bold text-2xl text-slate-900 dark:text-slate-100">
						Sản phẩm tương tự
					</h2>
					<Slider>
						{relatedProducts.map((related) => (
							<ProductCard
								className="w-[70%] shrink-0 snap-start sm:w-[45%] md:w-[30%] lg:w-[24%] xl:w-[18%]"
								key={related.id}
								product={related}
							/>
						))}
					</Slider>
				</section>
			)}
		</div>
	);
}
