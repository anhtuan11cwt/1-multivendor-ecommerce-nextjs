"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import ArrayItemsInput from "@/components/back-office/form-inputs/array-items-input";
import FormHeader from "@/components/back-office/form-inputs/form-header";
import ImageInput from "@/components/back-office/form-inputs/image-input";
import SelectInput from "@/components/back-office/form-inputs/select-input";
import SubmitButton from "@/components/back-office/form-inputs/submit-button";
import TextAreaInput from "@/components/back-office/form-inputs/text-area-input";
import TextInput from "@/components/back-office/form-inputs/text-input";
import { makePutRequest } from "@/lib/api-request";
import { generateSlug } from "@/lib/generate-slug";
import { productFormSchema } from "@/lib/schemas";
import { uploadImageToCloudinary } from "@/lib/upload-image";

const categoryOptions = [
	{ id: "1", title: "Rau củ hữu cơ" },
	{ id: "2", title: "Trái cây nhiệt đới" },
];

const farmerOptions = [
	{ id: "1", title: "Nguyễn Văn An" },
	{ id: "2", title: "Trần Thị Mai" },
];

const mockData = {
	1: {
		barcode: "8934567890123",
		categoryId: "1",
		description: "Rau củ tươi trồng theo phương pháp hữu cơ",
		farmerId: "1",
		price: 45000,
		salePrice: 40000,
		sku: "SKU-001",
		tags: ["Rau sạch", "Hữu cơ"],
		title: "Bó rau muống hữu cơ",
	},
};

export default function UpdateProductPage() {
	const params = useParams();
	const router = useRouter();
	const id = params?.id;

	const product = mockData[id] || {
		barcode: "",
		categoryId: "",
		description: "",
		farmerId: "",
		price: "",
		salePrice: "",
		sku: "",
		tags: [],
		title: "",
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			barcode: product.barcode,
			categoryId: product.categoryId,
			description: product.description,
			farmerId: product.farmerId,
			price: product.price,
			salePrice: product.salePrice,
			sku: product.sku,
			title: product.title,
		},
		resolver: zodResolver(productFormSchema),
	});
	const [file, setFile] = useState(null);
	const [tags, setTags] = useState(product.tags);
	const [loading, setLoading] = useState(false);

	async function onSubmit(data) {
		setLoading(true);
		try {
			await new Promise((r) => setTimeout(r, 2000));
			let imageUrl = "";
			if (file) {
				imageUrl = await uploadImageToCloudinary(file, "products");
				if (!imageUrl) return;
			}
			const slug = generateSlug(data.title);
			const payload = { id, ...data, imageUrl, slug, tags };
			const result = await makePutRequest({
				data: payload,
				endpoint: "api/products",
				resourceName: "Sản phẩm",
				setLoading,
			});
			if (result) {
				router.push("/dashboard/products");
			}
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="mx-auto max-w-4xl">
			<FormHeader
				isLoading={loading}
				title={`Chỉnh sửa sản phẩm - ${product.title}`}
			/>

			<form
				className="rounded-lg bg-white p-6 shadow dark:bg-slate-800"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="grid grid-cols-2 gap-6">
					<TextInput
						className="col-span-2"
						disabled={loading}
						errors={errors}
						isRequired
						label="Tên sản phẩm"
						name="title"
						register={register}
					/>
					<TextInput
						disabled={loading}
						errors={errors}
						label="SKU"
						name="sku"
						register={register}
					/>
					<TextInput
						disabled={loading}
						errors={errors}
						label="Mã vạch"
						name="barcode"
						register={register}
					/>
					<TextInput
						disabled={loading}
						errors={errors}
						isRequired
						label="Giá gốc"
						min="15000"
						name="price"
						register={register}
						type="number"
					/>
					<TextInput
						disabled={loading}
						errors={errors}
						label="Giá khuyến mãi (trước giảm giá)"
						min="0"
						name="salePrice"
						register={register}
						type="number"
					/>
					<SelectInput
						disabled={loading}
						errors={errors}
						isRequired
						label="Chọn danh mục"
						name="categoryId"
						options={categoryOptions}
						placeholder="Chọn danh mục..."
						register={register}
					/>
					<SelectInput
						disabled={loading}
						errors={errors}
						isRequired
						label="Chọn nông dân"
						name="farmerId"
						options={farmerOptions}
						placeholder="Chọn nông dân..."
						register={register}
					/>
					<div className="col-span-2">
						<ArrayItemsInput
							disabled={loading}
							items={tags}
							itemTitle="Thẻ"
							setItems={setTags}
						/>
					</div>
					<TextAreaInput
						className="col-span-2"
						disabled={loading}
						errors={errors}
						label="Mô tả"
						name="description"
						register={register}
					/>
					<ImageInput
						className="col-span-2"
						disabled={loading}
						file={file}
						label="Ảnh sản phẩm"
						setFile={setFile}
					/>
				</div>

				<div className="mt-6 flex justify-end gap-3">
					<SubmitButton
						buttonTitle="Cập nhật"
						isLoading={loading}
						loadingButtonTitle="Đang cập nhật..."
					/>
					<button
						className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-2.5 font-medium text-slate-700 text-sm shadow-sm transition hover:bg-slate-50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:bg-transparent dark:text-slate-300 dark:hover:bg-slate-700"
						disabled={loading}
						onClick={() => router.back()}
						type="button"
					>
						Hủy
					</button>
				</div>
			</form>
		</div>
	);
}
