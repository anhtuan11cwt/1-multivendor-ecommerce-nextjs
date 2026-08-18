"use client";

import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { useCart } from "@/lib/cart-context";
import { formatVND } from "@/lib/frontend-data";

export default function ProductCard({ className, product }) {
	const { addItem } = useCart();
	const hasSale =
		product.salePrice != null && product.salePrice < product.price;

	return (
		<div
			className={`flex flex-col overflow-hidden rounded-lg bg-white shadow-sm transition hover:shadow-md dark:bg-slate-900 ${className || ""}`}
		>
			<Link
				className="relative block h-48 w-full overflow-hidden"
				href={`/products/${product.slug}`}
			>
				<Image
					alt={product.title}
					className="object-cover"
					fill
					sizes="(max-width: 640px) 70vw, (max-width: 1024px) 30vw, 18vw"
					src={product.imageUrl || "/box_icon.svg"}
					unoptimized
				/>
			</Link>
			<div className="flex flex-1 flex-col p-4">
				<Link
					className="line-clamp-2 font-medium text-slate-900 text-sm hover:text-lime-600 dark:text-slate-200 dark:hover:text-lime-400"
					href={`/products/${product.slug}`}
				>
					{product.title}
				</Link>
				<div className="mt-auto flex items-center justify-between gap-2 pt-3">
					<div className="flex flex-col">
						{hasSale && (
							<span className="text-slate-400 text-xs line-through">
								{formatVND(product.price)}
							</span>
						)}
						<span className="font-bold text-lime-600 dark:text-lime-400">
							{formatVND(product.salePrice ?? product.price)}
						</span>
					</div>
					<button
						aria-label={`Thêm ${product.title} vào giỏ`}
						className="inline-flex size-10 shrink-0 items-center justify-center rounded-md bg-lime-600 text-white transition-colors hover:bg-lime-700 dark:bg-lime-500 dark:text-slate-950 dark:hover:bg-lime-400"
						onClick={() => addItem(product)}
						type="button"
					>
						<ShoppingCart className="size-5" />
					</button>
				</div>
			</div>
		</div>
	);
}
