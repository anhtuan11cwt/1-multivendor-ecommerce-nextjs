import { Loader2 } from "lucide-react";

export default function SubmitButton({
	isLoading = false,
	buttonTitle = "Lưu",
	loadingButtonTitle = "Đang lưu...",
	className,
}) {
	return (
		<button
			className={`inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-6 py-2.5 font-medium text-sm text-white shadow transition disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-slate-900 dark:bg-emerald-600 disabled:dark:hover:bg-emerald-600 ${className || ""}`}
			disabled={isLoading}
			type="submit"
		>
			{isLoading && <Loader2 className="animate-spin" size={16} />}
			{isLoading ? loadingButtonTitle : buttonTitle}
		</button>
	);
}
