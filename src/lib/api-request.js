import toast from "react-hot-toast";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

export async function makeRequest({
	setLoading,
	endpoint,
	data,
	resourceName,
	reset,
	method = "POST",
	successMessage,
	redirect,
}) {
	try {
		setLoading(true);
		const res = await fetch(`${BASE_URL}/${endpoint}`, {
			body: JSON.stringify(data),
			headers: { "Content-Type": "application/json" },
			method,
		});
		if (!res.ok) {
			const errorData = await res.json().catch(() => ({}));
			throw new Error(errorData.message || "Có lỗi xảy ra, vui lòng thử lại");
		}
		const result = await res.json();
		toast.success(successMessage || `${resourceName} đã được lưu thành công!`);
		reset?.();
		redirect?.();
		return result;
	} catch (error) {
		toast.error(error.message || "Có lỗi xảy ra, vui lòng thử lại");
		return null;
	} finally {
		setLoading(false);
	}
}

export function makePostRequest(props) {
	return makeRequest({ ...props, method: "POST" });
}

export function makePutRequest(props) {
	return makeRequest({ ...props, method: "PUT" });
}
