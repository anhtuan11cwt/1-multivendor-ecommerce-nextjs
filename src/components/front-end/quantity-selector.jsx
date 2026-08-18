"use client";

import { Minus, Plus } from "lucide-react";

export default function QuantitySelector({ onChange, quantity, size = "md" }) {
	const buttonClassName =
		size === "sm"
			? "inline-flex size-8 items-center justify-center text-slate-500 transition-colors hover:text-slate-900 disabled:opacity-40 dark:text-slate-300 dark:hover:text-white"
			: "inline-flex size-10 items-center justify-center text-slate-500 transition-colors hover:text-slate-900 disabled:opacity-40 dark:text-slate-300 dark:hover:text-white";

	return (
		<div className="inline-flex items-center rounded-xl border border-slate-300 dark:border-slate-600">
			<button
				aria-label="Giảm số lượng"
				className={buttonClassName}
				disabled={quantity <= 1}
				onClick={() => onChange(quantity - 1)}
				type="button"
			>
				<Minus className="size-4" />
			</button>
			<span
				aria-live="polite"
				className="min-w-8 text-center font-medium text-slate-900 text-sm dark:text-slate-100"
			>
				{quantity}
			</span>
			<button
				aria-label="Tăng số lượng"
				className={buttonClassName}
				onClick={() => onChange(quantity + 1)}
				type="button"
			>
				<Plus className="size-4" />
			</button>
		</div>
	);
}
