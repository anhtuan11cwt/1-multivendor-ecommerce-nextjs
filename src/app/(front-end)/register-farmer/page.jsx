import RegisterForm from "@/components/front-end/register-form";

export default function RegisterFarmerPage() {
	return (
		<div className="mx-auto max-w-md px-4 py-16">
			<h1 className="mb-6 text-center font-bold text-2xl text-slate-900 dark:text-slate-100">
				Đăng ký nông dân
			</h1>
			<RegisterForm userRole="FARMER" />
		</div>
	);
}
