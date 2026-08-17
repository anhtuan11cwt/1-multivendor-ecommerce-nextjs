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
import { marketFormSchema } from "@/lib/schemas";
import { uploadImageToCloudinary } from "@/lib/upload-image";

export default function NewMarketForm({ categories = [] }) {
	const router = useRouter();
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: { isActive: true },
		resolver: zodResolver(marketFormSchema),
	});
	const [file, setFile] = useState(null);
	const [loading, setLoading] = useState(false);

	async function onSubmit(data) {
		setLoading(true);
		try {
			await new Promise((r) => setTimeout(r, 2000));
			let logo = "";
			if (file) {
				logo = await uploadImageToCloudinary(file, "markets");
				if (!logo) return;
			}
			const slug = generateSlug(data.title);
			const payload = { ...data, logo, slug };
			await makePostRequest({
				data: payload,
				endpoint: "api/markets",
				redirect: () => router.push("/dashboard/markets"),
				resourceName: "Chợ",
				setLoading,
			});
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="mx-auto max-w-3xl">
			<FormHeader isLoading={loading} title="Tạo chợ mới" />

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
						label="Tên chợ"
						name="title"
						register={register}
					/>
					<SelectInput
						className="col-span-2"
						disabled={loading}
						errors={errors}
						label="Chọn danh mục"
						multiple
						name="categoryIds"
						options={categories}
						register={register}
					/>
					<ImageInput
						className="col-span-2"
						disabled={loading}
						file={file}
						label="Logo chợ"
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
						label="Trạng thái chợ"
						name="isActive"
						register={register}
					/>
				</div>

				<div className="mt-6 flex justify-end">
					<SubmitButton
						buttonTitle="Tạo chợ"
						isLoading={loading}
						loadingButtonTitle="Đang tạo..."
					/>
				</div>
			</form>
		</div>
	);
}
