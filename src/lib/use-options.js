"use client";

import { useEffect, useState } from "react";

export function useOptions(endpoint) {
	const [options, setOptions] = useState([]);

	useEffect(() => {
		const base = process.env.NEXT_PUBLIC_BASE_URL || "";
		fetch(`${base}/${endpoint}`, { cache: "no-store" })
			.then((res) => res.json())
			.then((json) =>
				setOptions(
					(json.data || []).map((item) => ({
						id: item.id,
						title: item.title || item.name,
					})),
				),
			)
			.catch(() => setOptions([]));
	}, [endpoint]);

	return options;
}
