import toast from "react-hot-toast";

export async function uploadImageToCloudinary(file, folder) {
	try {
		const signRes = await fetch("/api/cloudinary", {
			body: JSON.stringify({ folder }),
			headers: { "Content-Type": "application/json" },
			method: "POST",
		});
		const params = await signRes.json();
		if (!signRes.ok) {
			throw new Error(params.message || "Lấy tham số upload thất bại");
		}

		const formData = new FormData();
		formData.append("file", file);
		formData.append("api_key", params.apiKey);
		formData.append("timestamp", params.timestamp);
		formData.append("folder", params.folder);
		formData.append("signature", params.signature);

		const uploadRes = await fetch(
			`https://api.cloudinary.com/v1_1/${params.cloudName}/image/upload`,
			{ body: formData, method: "POST" },
		);
		const data = await uploadRes.json();
		if (!uploadRes.ok) {
			throw new Error(data.error?.message || "Upload ảnh thất bại");
		}

		return data.secure_url;
	} catch (error) {
		toast.error(error.message || "Upload ảnh thất bại");
		return null;
	}
}
