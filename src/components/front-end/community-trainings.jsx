import Link from "next/link";

import Slider from "@/components/front-end/slider";
import TrainingCard from "@/components/front-end/training-card";
import { getTrainings } from "@/lib/frontend-data";

export default async function CommunityTrainings() {
	const trainings = await getTrainings();

	return (
		<section className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
			<div className="mb-5 flex items-center justify-between">
				<h2 className="font-bold text-slate-900 text-xl dark:text-slate-100">
					Đào tạo cộng đồng
				</h2>
				<Link
					className="rounded-md bg-slate-900 px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
					href="/trainings"
				>
					Xem tất cả
				</Link>
			</div>
			<Slider>
				{trainings.map((training) => (
					<TrainingCard
						className="w-[85%] shrink-0 snap-start sm:w-[48%] lg:w-[31%]"
						key={training.id}
						training={training}
					/>
				))}
			</Slider>
		</section>
	);
}
