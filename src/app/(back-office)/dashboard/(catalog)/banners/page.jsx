import PageHeader from "@/components/back-office/page-header";

export default function BannersPage() {
	return (
		<div>
			<PageHeader
				heading="Banner"
				href="/dashboard/banners/new"
				linkTitle="Thêm banner"
			/>

			<div className="mt-4 rounded-lg border border-slate-300 border-dashed bg-white p-10 text-center text-slate-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-400">
				Chưa có banner nào. Bấm &quot;Thêm banner&quot; để tạo banner đầu tiên.
			</div>
		</div>
	);
}
