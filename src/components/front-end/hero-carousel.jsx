"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Carousel, useCarousel } from "nuka-carousel";

const banners = [
	{
		alt: "Banner rau củ sạch",
		href: "/categories/vegetables",
		src: "/main_banner_bg.png",
	},
	{
		alt: "Banner nông sản tươi",
		href: "/products",
		src: "/bottom_banner_image.png",
	},
	{
		alt: "Trái cây tươi ngon",
		href: "/categories/fruits",
		src: "/fresh_fruits_image.png",
	},
	{
		alt: "Rau hữu cơ",
		href: "/categories/vegetables",
		src: "/organic_vegitable_image.png",
	},
	{
		alt: "Sản phẩm sữa",
		href: "/categories/dairy",
		src: "/dairy_product_image.png",
	},
];

function CarouselArrows() {
	const { goBack, goForward } = useCarousel();
	const buttonClassName =
		"absolute top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-slate-800/70 text-white shadow transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-lime-500/50";

	return (
		<>
			<button
				aria-label="Ảnh trước"
				className={`${buttonClassName} left-2`}
				onClick={goBack}
				type="button"
			>
				<ChevronLeft className="size-5" />
			</button>
			<button
				aria-label="Ảnh tiếp theo"
				className={`${buttonClassName} right-2`}
				onClick={goForward}
				type="button"
			>
				<ChevronRight className="size-5" />
			</button>
		</>
	);
}

function CarouselDots() {
	const { currentPage, goToPage, totalPages } = useCarousel();

	return (
		<div className="flex items-center justify-center gap-2 py-3">
			{[...Array(totalPages)].map((_, index) => (
				<button
					aria-label={`Chuyển đến ảnh ${index + 1}`}
					className={`size-2.5 rounded-full transition-colors ${
						currentPage === index
							? "bg-lime-600 dark:bg-lime-400"
							: "bg-slate-300 hover:bg-slate-400 dark:bg-slate-600"
					}`}
					// biome-ignore lint/suspicious/noArrayIndexKey: dots không có id ổn định
					key={index}
					onClick={() => goToPage(index)}
					type="button"
				/>
			))}
		</div>
	);
}

export default function HeroCarousel() {
	return (
		<div className="overflow-hidden rounded-md shadow-md">
			<Carousel
				arrows={<CarouselArrows />}
				autoplay
				autoplayInterval={3000}
				dots={<CarouselDots />}
				showArrows="always"
				showDots
				wrapMode="wrap"
			>
				{banners.map((banner) => (
					<Link
						className="relative block h-48 sm:h-56 md:h-64 lg:h-72"
						href={banner.href}
						key={banner.src}
					>
						<Image
							alt={banner.alt}
							className="object-cover"
							fill
							sizes="(max-width: 1024px) 100vw, 66vw"
							src={banner.src}
						/>
					</Link>
				))}
			</Carousel>
		</div>
	);
}
