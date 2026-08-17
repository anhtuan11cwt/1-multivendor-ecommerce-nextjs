"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import FormHeader from "@/components/back-office/form-inputs/form-header";
import ImageInput from "@/components/back-office/form-inputs/image-input";
import SubmitButton from "@/components/back-office/form-inputs/submit-button";
import TextAreaInput from "@/components/back-office/form-inputs/text-area-input";
import TextInput from "@/components/back-office/form-inputs/text-input";
import ToggleInput from "@/components/back-office/form-inputs/toggle-input";
import { makePutRequest } from "@/lib/api-request";
import { generateSlug } from "@/lib/generate-slug";
import { categorySchema } from "@/lib/schemas";
import { uploadImageToCloudinary } from "@/lib/upload-image";

const mockData = {
	1: {
		description: "Các loại rau củ được trồng theo phương pháp hữu cơ",
		isActive: true,
		title: "Rau củ hữu cơ",
	},
	2: {
		description: "Trái cây tươi từ các vùng miền nhiệt đới",
		isActive: true,
		title: "Trái cây nhiệt đới",
	},
};

export default function UpdateCategoryPage() {
	const params = useParams();
	const router = useRouter();
	const id = params?.id;

	const category = mockData[id] || {
		description: "",
		isActive: true,
		title: "",
	};

	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			description: category.description,
			isActive: category.isActive,
			title: category.title,
		},
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
			const payload = { id, ...data, imageUrl, slug };
			const result = await makePutRequest({
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
			<FormHeader
				isLoading={loading}
				title={`Chỉnh sửa danh mục - ${category.title}`}
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
