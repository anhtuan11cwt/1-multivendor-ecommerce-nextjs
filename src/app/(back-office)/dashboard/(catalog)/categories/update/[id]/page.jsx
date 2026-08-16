"use client";

import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import FormHeader from "@/components/back-office/form-inputs/form-header";
import SubmitButton from "@/components/back-office/form-inputs/submit-button";
import TextAreaInput from "@/components/back-office/form-inputs/text-area-input";
import TextInput from "@/components/back-office/form-inputs/text-input";
import { generateSlug } from "@/lib/generate-slug";

const mockData = {
	1: {
		description: "Các loại rau củ được trồng theo phương pháp hữu cơ",
		title: "Rau củ hữu cơ",
	},
	2: {
		description: "Trái cây tươi từ các vùng miền nhiệt đới",
		title: "Trái cây nhiệt đới",
	},
};

export default function UpdateCategoryPage() {
	const params = useParams();
	const router = useRouter();
	const id = params?.id;

	const category = mockData[id] || { description: "", title: "" };

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		defaultValues: {
			description: category.description,
			title: category.title,
		},
	});

	async function onSubmit(data) {
		const slug = generateSlug(data.title);
		const payload = { id, ...data, slug };
		await new Promise((r) => setTimeout(r, 2000));
		console.log("Update category:", payload);
		toast.success("Cập nhật danh mục thành công!");
		router.push("/dashboard/categories");
	}

	return (
		<div className="mx-auto max-w-3xl">
			<FormHeader
				isLoading={isSubmitting}
				title={`Chỉnh sửa danh mục - ${category.title}`}
			/>

			<form
				className="rounded-lg bg-white p-6 shadow dark:bg-slate-800"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="grid grid-cols-2 gap-6">
					<TextInput
						className="col-span-2"
						disabled={isSubmitting}
						errors={errors}
						isRequired
						label="Tên danh mục"
						name="title"
						register={register}
					/>
					<TextAreaInput
						className="col-span-2"
						disabled={isSubmitting}
						errors={errors}
						label="Mô tả"
						name="description"
						register={register}
					/>
				</div>

				<div className="mt-6 flex justify-end gap-3">
					<SubmitButton
						buttonTitle="Cập nhật"
						isLoading={isSubmitting}
						loadingButtonTitle="Đang cập nhật..."
					/>
					<button
						className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-2.5 font-medium text-slate-700 text-sm shadow-sm transition hover:bg-slate-50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:bg-transparent dark:text-slate-300 dark:hover:bg-slate-700"
						disabled={isSubmitting}
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
