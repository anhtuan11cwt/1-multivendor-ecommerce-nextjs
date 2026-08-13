"use client";

import { useEffect, useSyncExternalStore } from "react";

function subscribeTheme(callback) {
	const observer = new MutationObserver(callback);
	observer.observe(document.documentElement, {
		attributeFilter: ["class"],
		attributes: true,
	});
	return () => observer.disconnect();
}

function getThemeSnapshot() {
	return document.documentElement.classList.contains("dark");
}

function getThemeServerSnapshot() {
	return false;
}

const THEME_COOKIE = (value) =>
	`theme=${value}; path=/; max-age=31536000; samesite=lax`;

export function useTheme() {
	const dark = useSyncExternalStore(
		subscribeTheme,
		getThemeSnapshot,
		getThemeServerSnapshot,
	);

	useEffect(() => {
		if (document.cookie.includes("theme=")) return;
		const prefersDark = window.matchMedia(
			"(prefers-color-scheme: dark)",
		).matches;
		document.documentElement.classList.toggle("dark", prefersDark);
		// biome-ignore lint/suspicious/noDocumentCookie: theme phải lưu trong cookie để SSR đọc được
		document.cookie = THEME_COOKIE(prefersDark ? "dark" : "light");
	}, []);

	function toggleTheme() {
		const next = !dark;
		document.documentElement.classList.toggle("dark", next);
		// biome-ignore lint/suspicious/noDocumentCookie: theme phải lưu trong cookie để SSR đọc được
		document.cookie = THEME_COOKIE(next ? "dark" : "light");
	}

	return { dark, toggleTheme };
}
