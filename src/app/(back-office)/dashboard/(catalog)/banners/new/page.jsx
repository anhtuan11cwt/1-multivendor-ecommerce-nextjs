"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import FormHeader from "@/components/back-office/form-inputs/form-header";
import ImageInput from "@/components/back-office/form-inputs/image-input";
import SubmitButton from "@/components/back-office/form-inputs/submit-button";
import TextInput from "@/components/back-office/form-inputs/text-input";
import ToggleInput from "@/components/back-office/form-inputs/toggle-input";
import { makePostRequest } from "@/lib/api-request";
import { bannerFormSchema } from "@/lib/schemas";
import { uploadImageToCloudinary } from "@/lib/upload-image";

export default function NewBannerPage() {
	const router = useRouter();
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: { isActive: true },
		resolver: zodResolver(bannerFormSchema),
	});
	const [file, setFile] = useState(null);
	const [loading, setLoading] = useState(false);

	async function onSubmit(data) {
		if (!file) {
			toast.error("Vui lòng chọn hình ảnh banner");
			return;
		}
		setLoading(true);
		try {
			await new Promise((r) => setTimeout(r, 2000));
			const imageUrl = await uploadImageToCloudinary(file, "banners");
			if (!imageUrl) return;
			const payload = { ...data, imageUrl };
			const result = await makePostRequest({
				data: payload,
				endpoint: "api/banners",
				resourceName: "Banner",
				setLoading,
			});
			if (result) {
				router.push("/dashboard/banners");
			}
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="mx-auto max-w-3xl">
			<FormHeader isLoading={loading} title="Tạo banner mới" />

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
						label="Tiêu đề banner"
						name="title"
						register={register}
					/>
					<TextInput
						className="col-span-2"
						disabled={loading}
						errors={errors}
						label="Link"
						name="link"
						placeholder="https://... hoặc /dashboard/categories/slug"
						register={register}
					/>
					<ImageInput
						className="col-span-2"
						disabled={loading}
						file={file}
						label="Hình ảnh banner"
						setFile={setFile}
					/>
					<ToggleInput
						className="col-span-2"
						control={control}
						disabled={loading}
						label="Xuất bản banner"
						name="isActive"
						register={register}
					/>
				</div>

				<div className="mt-6 flex justify-end">
					<SubmitButton
						buttonTitle="Tạo banner"
						isLoading={loading}
						loadingButtonTitle="Đang tạo..."
					/>
				</div>
			</form>
		</div>
	);
}
