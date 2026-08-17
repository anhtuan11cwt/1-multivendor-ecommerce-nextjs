"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Slider({
	autoplay = false,
	autoplayInterval = 4000,
	children,
}) {
	const trackRef = useRef(null);
	const pausedRef = useRef(false);
	const [canPrev, setCanPrev] = useState(false);
	const [canNext, setCanNext] = useState(true);

	function scrollByDirection(direction) {
		const el = trackRef.current;
		if (!el) return;
		el.scrollBy({
			behavior: "smooth",
			left: direction * el.clientWidth * 0.8,
		});
	}

	useEffect(() => {
		const el = trackRef.current;
		if (!el) return;
		function updateArrows() {
			setCanPrev(el.scrollLeft > 4);
			setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
		}
		updateArrows();
		el.addEventListener("scroll", updateArrows, { passive: true });
		return () => el.removeEventListener("scroll", updateArrows);
	}, []);

	useEffect(() => {
		if (!autoplay) return;
		const id = setInterval(() => {
			if (pausedRef.current) return;
			const el = trackRef.current;
			if (!el) return;
			const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
			if (atEnd) {
				el.scrollTo({ behavior: "smooth", left: 0 });
			} else {
				el.scrollBy({ behavior: "smooth", left: el.clientWidth });
			}
		}, autoplayInterval);
		return () => clearInterval(id);
	}, [autoplay, autoplayInterval]);

	const arrowClassName =
		"absolute top-1/2 z-10 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full bg-slate-800/70 text-white shadow transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-lime-500/50 sm:flex";

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: hover dùng để tạm dừng autoplay, không phải thao tác chính
		<div
			className="relative"
			onMouseEnter={() => {
				pausedRef.current = true;
			}}
			onMouseLeave={() => {
				pausedRef.current = false;
			}}
		>
			<div
				className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2"
				ref={trackRef}
			>
				{children}
			</div>
			{canPrev && (
				<button
					aria-label="Cuộn sang trái"
					className={`${arrowClassName} left-0`}
					onClick={() => scrollByDirection(-1)}
					type="button"
				>
					<ChevronLeft className="size-5" />
				</button>
			)}
			{canNext && (
				<button
					aria-label="Cuộn sang phải"
					className={`${arrowClassName} right-0`}
					onClick={() => scrollByDirection(1)}
					type="button"
				>
					<ChevronRight className="size-5" />
				</button>
			)}
		</div>
	);
}
