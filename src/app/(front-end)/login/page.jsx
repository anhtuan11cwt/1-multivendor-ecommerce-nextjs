import LoginForm from "@/components/front-end/login-form";

export default function LoginPage() {
	return (
		<div className="mx-auto max-w-md px-4 py-16">
			<h1 className="mb-6 text-center font-bold text-2xl text-slate-900 dark:text-slate-100">
				Đăng nhập vào tài khoản của bạn
			</h1>
			<LoginForm />
		</div>
	);
}
