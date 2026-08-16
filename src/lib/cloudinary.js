import crypto from "node:crypto";

export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

export const CLOUDINARY_UPLOAD_ROOT_FOLDER = "1-multivendor-ecommerce-nextjs";

export const ALLOWED_UPLOAD_FOLDERS = [
	"categories",
	"coupons",
	"banners",
	"markets",
	"products",
];

export function buildUploadSignature(params) {
	if (!CLOUDINARY_API_SECRET) {
		throw new Error("CLOUDINARY_API_SECRET chưa được cấu hình");
	}
	const queryString = Object.keys(params)
		.sort()
		.map((key) => `${key}=${params[key]}`)
		.join("&");
	return crypto
		.createHash("sha1")
		.update(queryString + CLOUDINARY_API_SECRET)
		.digest("hex");
}

export function getSignedUploadParams({ folder }) {
	if (!folder || !ALLOWED_UPLOAD_FOLDERS.includes(folder)) {
		throw new Error("Folder không hợp lệ");
	}
	const uploadFolder = `${CLOUDINARY_UPLOAD_ROOT_FOLDER}/${folder}`;
	const timestamp = Math.round(Date.now() / 1000);
	const params = { folder: uploadFolder, timestamp };
	return {
		apiKey: CLOUDINARY_API_KEY,
		cloudName: CLOUDINARY_CLOUD_NAME,
		folder: uploadFolder,
		signature: buildUploadSignature(params),
		timestamp,
	};
}
