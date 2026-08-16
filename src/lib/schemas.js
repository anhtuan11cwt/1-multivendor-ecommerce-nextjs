import { z } from "zod";

export function getTodayString() {
	const now = new Date();
	return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

const vietnameseNamePattern =
	/^[\p{Script=Latin}]+(?:[\s'-][\p{Script=Latin}]+)*$/u;

function normalizeName(value) {
	return value.normalize("NFC").replace(/\s+/g, " ").trim();
}

export const vietnameseNameSchema = z
	.string()
	.min(1, "Tên là bắt buộc")
	.refine((value) => !/[\t\n\r]/.test(value), {
		message: "Tên không được chứa tab hoặc xuống dòng",
	})
	.transform(normalizeName)
	.refine((value) => value.length >= 1, "Tên là bắt buộc")
	.refine((value) => value.length >= 2, "Tên phải có ít nhất 2 ký tự")
	.refine((value) => value.length <= 100, "Tên tối đa 100 ký tự")
	.refine((value) => vietnameseNamePattern.test(value), {
		message:
			"Tên chỉ được chứa chữ cái, khoảng trắng, dấu gạch nối và dấu nháy đơn",
	});

export const optionalVietnameseNameSchema = z
	.string()
	.optional()
	.refine((value) => !value || vietnameseNameSchema.safeParse(value).success, {
		message:
			"Tên chỉ được chứa chữ cái, khoảng trắng, dấu gạch nối và dấu nháy đơn",
	});

export const vietnamPhoneSchema = z
	.string()
	.trim()
	.min(1, "Số điện thoại là bắt buộc")
	.refine((value) => /^0[0-9]{9}$/.test(value), {
		message: "Số điện thoại phải gồm 10 chữ số và bắt đầu bằng số 0",
	});

export const optionalVietnamPhoneSchema = z
	.string()
	.optional()
	.refine((value) => !value || vietnamPhoneSchema.safeParse(value).success, {
		message: "Số điện thoại phải gồm 10 chữ số và bắt đầu bằng số 0",
	});

export const categorySchema = z.object({
	description: z
		.string()
		.optional()
		.refine((value) => !value || value.length <= 500, {
			message: "Mô tả tối đa 500 ký tự",
		}),
	imageUrl: z.string().optional(),
	marketIds: z.array(z.string()).optional(),
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
	link: z
		.string()
		.optional()
		.refine((value) => !value || value.length <= 300, {
			message: "Link tối đa 300 ký tự",
		}),
	title: z
		.string()
		.min(1, "Tiêu đề banner là bắt buộc")
		.max(100, "Tiêu đề tối đa 100 ký tự"),
};

export const bannerSchema = z.object({
	...bannerFields,
	imageUrl: z.string().min(1, "Hình ảnh banner là bắt buộc"),
});

export const bannerFormSchema = z.object(bannerFields);

export const farmerSchema = z.object({
	contactPerson: optionalVietnameseNameSchema,
	contactPersonPhone: optionalVietnamPhoneSchema,
	email: z.string().email("Email không hợp lệ").min(1, "Email là bắt buộc"),
	name: vietnameseNameSchema,
	notes: z.string().optional(),
	paymentTerms: z.string().optional(),
	phone: vietnamPhoneSchema,
	physicalAddress: z.string().optional(),
});

export const marketSchema = z.object({
	description: z
		.string()
		.optional()
		.refine((value) => !value || value.length <= 500, {
			message: "Mô tả tối đa 500 ký tự",
		}),
	logo: z.string().optional(),
	slug: z.string().min(1, "Slug là bắt buộc"),
	title: z
		.string()
		.min(1, "Tên chợ là bắt buộc")
		.max(100, "Tên chợ tối đa 100 ký tự"),
});

export const marketFormSchema = marketSchema.omit({ slug: true });

const optionalTag = z
	.string()
	.trim()
	.min(1, "Tag không được để trống")
	.max(20, "Tag tối đa 20 ký tự");

export const productSchema = z.object({
	barcode: z.string().optional(),
	categoryId: z.string().min(1, "Vui lòng chọn danh mục"),
	description: z
		.string()
		.optional()
		.refine((value) => !value || value.length <= 1000, {
			message: "Mô tả tối đa 1000 ký tự",
		}),
	farmerId: z.string().min(1, "Vui lòng chọn nông dân"),
	imageUrl: z.string().optional(),
	price: z.preprocess(
		(value) => {
			if (value === "" || value === null || value === undefined) return 0;
			return Number(value);
		},
		z
			.number({ message: "Giá phải là số" })
			.refine((value) => !Number.isNaN(value), "Giá phải là số")
			.min(15000, "Giá gốc tối thiểu 15.000đ"),
	),
	salePrice: z.preprocess(
		(value) => {
			if (value === "" || value === null || value === undefined) {
				return undefined;
			}
			return Number(value);
		},
		z
			.number({ message: "Giá khuyến mãi phải là số" })
			.refine((value) => !Number.isNaN(value), "Giá khuyến mãi phải là số")
			.min(0, "Giá khuyến mãi không được âm")
			.optional(),
	),
	sku: z.string().optional(),
	slug: z.string().min(1, "Slug là bắt buộc"),
	tags: z.array(optionalTag).optional(),
	title: z
		.string()
		.min(1, "Tên sản phẩm là bắt buộc")
		.max(100, "Tên sản phẩm tối đa 100 ký tự"),
});

export const productFormSchema = productSchema.omit({
	imageUrl: true,
	slug: true,
});
