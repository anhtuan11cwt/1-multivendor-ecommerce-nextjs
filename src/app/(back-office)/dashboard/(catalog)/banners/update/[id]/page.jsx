"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import FormHeader from "@/components/back-office/form-inputs/form-header";
import ImageInput from "@/components/back-office/form-inputs/image-input";
import SubmitButton from "@/components/back-office/form-inputs/submit-button";
import TextInput from "@/components/back-office/form-inputs/text-input";
import ToggleInput from "@/components/back-office/form-inputs/toggle-input";
import { makePutRequest } from "@/lib/api-request";
import { bannerFormSchema } from "@/lib/schemas";
import { uploadImageToCloudinary } from "@/lib/upload-image";

const mockData = {
	1: {
		isActive: true,
		link: "/dashboard/categories/rau-cu-huu-co",
		title: "Khuyến mãi rau hữu cơ",
	},
	2: {
		isActive: true,
		link: "/dashboard/products/1",
		title: "Trái cây nhập khẩu",
	},
};

export default function UpdateBannerPage() {
	const params = useParams();
	const router = useRouter();
	const id = params?.id;

	const banner = mockData[id] || { isActive: true, link: "", title: "" };

	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			isActive: banner.isActive,
			link: banner.link,
			title: banner.title,
		},
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
			const payload = { id, ...data, imageUrl };
			const result = await makePutRequest({
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
			<FormHeader
				isLoading={loading}
				title={`Chỉnh sửa banner - ${banner.title}`}
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
