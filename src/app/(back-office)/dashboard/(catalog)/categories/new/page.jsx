"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import FormHeader from "@/components/back-office/form-inputs/form-header";
import ImageInput from "@/components/back-office/form-inputs/image-input";
import SelectInput from "@/components/back-office/form-inputs/select-input";
import SubmitButton from "@/components/back-office/form-inputs/submit-button";
import TextAreaInput from "@/components/back-office/form-inputs/text-area-input";
import TextInput from "@/components/back-office/form-inputs/text-input";
import ToggleInput from "@/components/back-office/form-inputs/toggle-input";
import { makePostRequest } from "@/lib/api-request";
import { generateSlug } from "@/lib/generate-slug";
import { categorySchema } from "@/lib/schemas";
import { uploadImageToCloudinary } from "@/lib/upload-image";

const marketOptions = [
	{ id: "1", title: "Chợ Sprouts Farmers" },
	{ id: "2", title: "Chợ Long An" },
];

export default function NewCategoryPage() {
	const router = useRouter();
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: { isActive: true },
		resolver: zodResolver(categorySchema),
	});
	const [file, setFile] = useState(null);
	const [loading, setLoading] = useState(false);

	async function onSubmit(data) {
		setLoading(true);
		try {
			await new Promise((r) => setTimeout(r, 2000));
			let imageUrl = "";
			if (file) {
				imageUrl = await uploadImageToCloudinary(file, "categories");
				if (!imageUrl) return;
			}
			const slug = generateSlug(data.title);
			const payload = { ...data, imageUrl, slug };
			const result = await makePostRequest({
				data: payload,
				endpoint: "api/categories",
				resourceName: "Danh mục",
				setLoading,
			});
			if (result) {
				router.push("/dashboard/categories");
			}
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="mx-auto max-w-3xl">
			<FormHeader isLoading={loading} title="Tạo danh mục mới" />

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
						label="Tên danh mục"
						name="title"
						register={register}
					/>
					<ImageInput
						disabled={loading}
						file={file}
						label="Hình ảnh danh mục"
						setFile={setFile}
					/>
					<SelectInput
						disabled={loading}
						errors={errors}
						label="Chợ liên kết"
						multiple
						name="marketIds"
						options={marketOptions}
						register={register}
					/>
					<TextAreaInput
						className="col-span-2"
						disabled={loading}
						errors={errors}
						label="Mô tả"
						name="description"
						register={register}
					/>
					<ToggleInput
						className="col-span-2"
						control={control}
						disabled={loading}
						label="Xuất bản danh mục"
						name="isActive"
						register={register}
					/>
				</div>

				<div className="mt-6 flex justify-end">
					<SubmitButton
						buttonTitle="Tạo danh mục"
						isLoading={loading}
						loadingButtonTitle="Đang tạo..."
					/>
				</div>
			</form>
		</div>
	);
}
