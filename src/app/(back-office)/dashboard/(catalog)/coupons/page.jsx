import PageHeader from "@/components/back-office/page-header";

export default function CouponsPage() {
	return (
		<div>
			<PageHeader
				heading="Mã giảm giá"
				href="/dashboard/coupons/new"
				linkTitle="Thêm mã giảm giá"
			/>

			<div className="mt-4 rounded-lg border border-slate-300 border-dashed bg-white p-10 text-center text-slate-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-400">
				Chưa có mã giảm giá nào. Bấm &quot;Thêm mã giảm giá&quot; để tạo mã đầu
				tiên.
			</div>
		</div>
	);
}
