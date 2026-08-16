"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import FormHeader from "@/components/back-office/form-inputs/form-header";
import SubmitButton from "@/components/back-office/form-inputs/submit-button";
import TextAreaInput from "@/components/back-office/form-inputs/text-area-input";
import TextInput from "@/components/back-office/form-inputs/text-input";
import { generateSlug } from "@/lib/generate-slug";

export default function NewCategoryPage() {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm();

	async function onSubmit(data) {
		const slug = generateSlug(data.title);
		const payload = { ...data, slug };
		await new Promise((r) => setTimeout(r, 2000));
		console.log("New category:", payload);
		toast.success("Tạo danh mục thành công!");
		router.push("/dashboard/categories");
	}

	return (
		<div className="mx-auto max-w-3xl">
			<FormHeader isLoading={isSubmitting} title="Tạo danh mục mới" />

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

				<div className="mt-6 flex justify-end">
					<SubmitButton
						buttonTitle="Tạo danh mục"
						isLoading={isSubmitting}
						loadingButtonTitle="Đang tạo..."
					/>
				</div>
			</form>
		</div>
	);
}
