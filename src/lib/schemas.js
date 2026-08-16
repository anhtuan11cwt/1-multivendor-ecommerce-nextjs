import { z } from "zod";

export function getTodayString() {
	const now = new Date();
	return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

const urlOrEmpty = z
	.string()
	.optional()
	.refine((value) => !value || /^(\/|https?:\/\/)/.test(value), {
		message: "Đường dẫn không hợp lệ",
	});

export const categorySchema = z.object({
	description: z
		.string()
		.optional()
		.refine((value) => !value || value.length <= 500, {
			message: "Mô tả tối đa 500 ký tự",
		}),
	imageUrl: z.string().optional(),
	slug: z.string().optional(),
	title: z
		.string()
		.min(1, "Tên danh mục là bắt buộc")
		.max(100, "Tên danh mục tối đa 100 ký tự"),
});

export const couponSchema = z.object({
	couponCode: z
		.string()
		.min(1, "Mã giảm giá là bắt buộc")
		.max(50, "Mã giảm giá tối đa 50 ký tự"),
	expiryDate: z
		.string()
		.min(1, "Ngày hết hạn là bắt buộc")
		.refine((value) => value > getTodayString(), {
			message: "Ngày hết hạn phải lớn hơn ngày hiện tại",
		}),
	title: z
		.string()
		.min(1, "Tiêu đề chiến dịch là bắt buộc")
		.max(100, "Tiêu đề tối đa 100 ký tự"),
});

const bannerFields = {
	description: z
		.string()
		.optional()
		.refine((value) => !value || value.length <= 300, {
			message: "Mô tả tối đa 300 ký tự",
		}),
	url: urlOrEmpty,
};

export const bannerSchema = z.object({
	...bannerFields,
	imageUrl: z.string().min(1, "Hình ảnh banner là bắt buộc"),
});

export const bannerFormSchema = z.object(bannerFields);
