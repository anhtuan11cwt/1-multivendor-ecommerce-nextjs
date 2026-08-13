import { Loader2 } from "lucide-react";

export default function Loading() {
	return (
		<div className="flex min-h-[60vh] items-center justify-center">
			<Loader2 className="size-8 animate-spin text-emerald-600 dark:text-emerald-400" />
		</div>
	);
}
