import NewFarmerForm from "@/components/front-end/new-farmer-form";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

async function getUser(id) {
	try {
		const res = await fetch(`${BASE_URL}/api/users/${id}`, {
			cache: "no-store",
		});
		if (!res.ok) return null;
		const json = await res.json();
		return json.data || null;
	} catch {
		return null;
	}
}

export default async function OnboardingPage({ params }) {
	const { id } = await params;
	const user = await getUser(id);

	if (!user) {
		return (
			<div className="mx-auto max-w-xl px-4 py-16 text-center text-slate-500 dark:text-slate-400">
				Không tìm thấy người dùng.
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-2xl px-4 py-16">
			<h1 className="text-center font-bold text-2xl text-slate-900 dark:text-slate-100">
				Hello {user.name}
			</h1>
			<p className="mt-2 mb-8 text-center text-slate-600 dark:text-slate-400">
				Hãy cho chúng tôi biết thêm về bạn
			</p>
			<NewFarmerForm user={user} />
		</div>
	);
}
