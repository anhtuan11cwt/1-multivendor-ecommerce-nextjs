"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import ArrayItemsInput from "@/components/back-office/form-inputs/array-items-input";
import FormHeader from "@/components/back-office/form-inputs/form-header";
import ImageInput from "@/components/back-office/form-inputs/image-input";
import SelectInput from "@/components/back-office/form-inputs/select-input";
import SubmitButton from "@/components/back-office/form-inputs/submit-button";
import TextAreaInput from "@/components/back-office/form-inputs/text-area-input";
import TextInput from "@/components/back-office/form-inputs/text-input";
import ToggleInput from "@/components/back-office/form-inputs/toggle-input";
import { makePostRequest } from "@/lib/api-request";
import { generateSlug } from "@/lib/generate-slug";
import { productFormSchema } from "@/lib/schemas";
import { uploadImageToCloudinary } from "@/lib/upload-image";

export default function NewProductForm({ categories = [], farmers = [] }) {
	const router = useRouter();
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: { isActive: true, isWholesale: false, quantity: 1 },
		resolver: zodResolver(productFormSchema),
	});
	const isWholesale = useWatch({ control, name: "isWholesale" });
	const [file, setFile] = useState(null);
	const [tags, setTags] = useState([]);
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
			const payload = { ...data, imageUrl, slug, tags };
			await makePostRequest({
				data: payload,
				endpoint: "api/products",
				redirect: () => router.push("/dashboard/products"),
				resourceName: "Sản phẩm",
				setLoading,
			});
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="mx-auto max-w-4xl">
			<FormHeader isLoading={loading} title="Tạo sản phẩm mới" />

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
						options={categories}
						placeholder="Chọn danh mục..."
						register={register}
					/>
					<SelectInput
						disabled={loading}
						errors={errors}
						isRequired
						label="Chọn nông dân"
						name="farmerId"
						options={farmers}
						placeholder="Chọn nông dân..."
						register={register}
					/>
					<ToggleInput
						className="col-span-2"
						control={control}
						disabled={loading}
						falseTitle="Không bán sỉ"
						label="Bán sỉ"
						name="isWholesale"
						register={register}
						trueTitle="Bán sỉ"
					/>
					{isWholesale && (
						<>
							<TextInput
								disabled={loading}
								errors={errors}
								label="Giá sỉ"
								min="0"
								name="wholesalePrice"
								register={register}
								type="number"
							/>
							<TextInput
								disabled={loading}
								errors={errors}
								label="Số lượng sỉ tối thiểu"
								min="1"
								name="wholesaleQuantity"
								register={register}
								type="number"
							/>
						</>
					)}
					<TextInput
						disabled={loading}
						errors={errors}
						label="Đơn vị đo lường"
						name="unitOfMeasurement"
						placeholder="Ví dụ: Kilograms"
						register={register}
					/>
					<TextInput
						disabled={loading}
						errors={errors}
						label="Tồn kho"
						min="0"
						name="productStock"
						register={register}
						type="number"
					/>
					<TextInput
						disabled={loading}
						errors={errors}
						isRequired
						label="Số lượng"
						min="1"
						name="quantity"
						register={register}
						type="number"
					/>
					<div className="col-span-2">
						<ArrayItemsInput
							disabled={loading}
							items={tags}
							itemTitle="Tag"
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
					<ToggleInput
						className="col-span-2"
						control={control}
						disabled={loading}
						label="Xuất bản sản phẩm"
						name="isActive"
						register={register}
					/>
				</div>

				<div className="mt-6 flex justify-end">
					<SubmitButton
						buttonTitle="Tạo sản phẩm"
						isLoading={loading}
						loadingButtonTitle="Đang tạo..."
					/>
				</div>
			</form>
		</div>
	);
}
