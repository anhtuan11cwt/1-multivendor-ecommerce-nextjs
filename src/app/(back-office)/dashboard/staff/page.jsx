import PageHeader from "@/components/back-office/page-header";

export default function StaffPage() {
	return (
		<div>
			<PageHeader
				heading="Nhân viên"
				href="/dashboard/staff/new"
				linkTitle="Thêm nhân viên"
			/>

			<div className="mt-4 rounded-lg border border-slate-300 border-dashed bg-white p-10 text-center text-slate-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-400">
				Chưa có nhân viên nào. Bấm &quot;Thêm nhân viên&quot; để tạo nhân viên
				đầu tiên.
			</div>
		</div>
	);
}
