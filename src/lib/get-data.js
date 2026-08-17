const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

export async function getData(endpoint) {
	try {
		const res = await fetch(`${BASE_URL}/${endpoint}`, { cache: "no-store" });
		if (!res.ok) return null;
		const json = await res.json();
		return json.data ?? null;
	} catch {
		return null;
	}
}
