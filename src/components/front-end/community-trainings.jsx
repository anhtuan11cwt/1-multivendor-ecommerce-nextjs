import Link from "next/link";

import Slider from "@/components/front-end/slider";
import TrainingCard from "@/components/front-end/training-card";
import { getTrainings } from "@/lib/frontend-data";

export default async function CommunityTrainings() {
	const trainings = await getTrainings();

	return (
		<section className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
			<div className="mb-5 flex items-center justify-between">
				<h2 className="font-bold text-lime-600 text-xl dark:text-lime-400">
					Đào tạo cộng đồng
				</h2>
				<Link
					className="rounded-md bg-lime-600 px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-lime-700 dark:bg-lime-500 dark:text-slate-950 dark:hover:bg-lime-400"
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
