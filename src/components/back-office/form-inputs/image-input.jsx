"use client";

import { ImageUp, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";

export default function ImageInput({
	label,
	file,
	setFile,
	disabled = false,
	className,
}) {
	const inputRef = useRef(null);
	const previewUrl = useMemo(
		() => (file ? URL.createObjectURL(file) : null),
		[file],
	);

	useEffect(() => {
		return () => {
			if (previewUrl) URL.revokeObjectURL(previewUrl);
		};
	}, [previewUrl]);

	function openFilePicker() {
		if (disabled) return;
		inputRef.current?.click();
	}

	function handleFileChange(event) {
		const selected = event.target.files?.[0];
		event.target.value = "";
		if (selected) setFile(selected);
	}

	return (
		<div className={className}>
			<label
				className="mb-1 block font-medium text-slate-700 text-sm dark:text-slate-300"
				htmlFor={label}
			>
				{label}
			</label>

			<input
				accept="image/*"
				className="hidden"
				id={label}
				onChange={handleFileChange}
				ref={inputRef}
				type="file"
			/>

			{previewUrl ? (
				<div className="overflow-hidden rounded-lg border border-slate-300 dark:border-slate-600">
					<div
						className={`relative flex aspect-video w-full items-center justify-center bg-slate-100 dark:bg-slate-700 ${disabled ? "opacity-60" : ""}`}
					>
						<Image
							alt={label}
							className={`max-h-full max-w-full object-contain transition ${disabled ? "blur-[2px]" : ""}`}
							fill
							priority
							sizes="(max-width: 768px) 100vw, 640px"
							src={previewUrl}
							unoptimized
						/>
					</div>
					<div className="flex items-center justify-end gap-2 border-slate-200 border-t px-3 py-2 dark:border-slate-600">
						<button
							className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 font-medium text-slate-700 text-sm shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:bg-transparent dark:text-slate-300 dark:hover:bg-slate-700"
							disabled={disabled}
							onClick={openFilePicker}
							type="button"
						>
							Đổi ảnh
						</button>
						<button
							className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 font-medium text-red-600 text-sm transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 dark:text-red-400 dark:hover:bg-red-900/20"
							disabled={disabled}
							onClick={() => setFile(null)}
							type="button"
						>
							<X size={14} />
							Xóa
						</button>
					</div>
				</div>
			) : (
				<button
					className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-slate-300 border-dashed bg-slate-50 text-slate-500 transition hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-400 dark:hover:border-emerald-500 dark:hover:bg-slate-600"
					disabled={disabled}
					onClick={openFilePicker}
					type="button"
				>
					<ImageUp size={24} />
					<span className="text-sm">Bấm để chọn ảnh</span>
					<span className="text-slate-400 text-xs dark:text-slate-500">
						PNG, JPG, WebP
					</span>
				</button>
			)}
		</div>
	);
}
