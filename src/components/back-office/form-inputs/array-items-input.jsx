"use client";

import { Plus, X } from "lucide-react";
import { useMemo, useState } from "react";

export default function ArrayItemsInput({
	items = [],
	setItems,
	itemTitle = "Thẻ",
	disabled = false,
	maxLength = 20,
}) {
	const [showForm, setShowForm] = useState(false);
	const [item, setItem] = useState("");

	const itemKeys = useMemo(() => {
		const counters = new Map();
		return items.map((value) => {
			const count = counters.get(value) ?? 0;
			counters.set(value, count + 1);
			return `${value}-${count}`;
		});
	}, [items]);

	function addItem() {
		const trimmed = item.trim().slice(0, maxLength);
		if (!trimmed) return;
		setItems([...items, trimmed]);
		setItem("");
	}

	function removeItem(index) {
		const newItems = [...items];
		newItems.splice(index, 1);
		setItems(newItems);
	}

	return (
		<div
			className={`transition ${disabled ? "pointer-events-none opacity-60" : ""}`}
		>
			{!showForm ? (
				<button
					className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-2 font-medium text-slate-700 text-sm shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:bg-transparent dark:text-slate-300 dark:hover:bg-slate-700"
					disabled={disabled}
					onClick={() => setShowForm(true)}
					type="button"
				>
					<Plus size={16} />
					Thêm {itemTitle.toLowerCase()}
				</button>
			) : (
				<div className="flex items-center gap-2">
					<input
						className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 text-sm outline-none ring-slate-500 transition focus:border-slate-500 focus:ring-2 dark:border-slate-600 dark:bg-transparent dark:text-slate-100 dark:ring-slate-500 dark:focus:border-slate-500"
						maxLength={maxLength}
						onChange={(event) => setItem(event.target.value)}
						onKeyDown={(event) => {
							if (event.key === "Enter") {
								event.preventDefault();
								addItem();
							}
						}}
						placeholder={`Nhập ${itemTitle.toLowerCase()}...`}
						value={item}
					/>
					<button
						className="inline-flex items-center gap-1 rounded-lg bg-slate-900 px-3 py-2 font-medium text-sm text-white shadow transition hover:bg-slate-700 disabled:opacity-50 dark:bg-emerald-600 dark:hover:bg-emerald-700"
						disabled={disabled}
						onClick={addItem}
						type="button"
					>
						<Plus size={16} />
						Thêm
					</button>
					<button
						aria-label="Đóng"
						className="shrink-0 rounded p-1.5 text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
						onClick={() => {
							setShowForm(false);
							setItem("");
						}}
						type="button"
					>
						<X size={18} />
					</button>
				</div>
			)}

			{items.length > 0 && (
				<div className="mt-2 flex flex-wrap gap-2">
					{items.map((tag, index) => (
						<button
							className="inline-flex items-center gap-1 rounded-full bg-slate-600 px-3 py-1 text-sm text-white transition hover:bg-slate-700 dark:bg-slate-500"
							key={itemKeys[index]}
							onClick={() => removeItem(index)}
							type="button"
						>
							{tag}
							<X size={14} />
						</button>
					))}
				</div>
			)}
		</div>
	);
}
