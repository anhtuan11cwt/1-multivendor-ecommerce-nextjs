import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export function restrictDigits(event) {
	const data = event.data ?? "";
	if (!/^\d*$/.test(data)) {
		event.preventDefault();
	}
}
