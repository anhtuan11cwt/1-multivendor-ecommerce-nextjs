import Image from "next/image";
import Link from "next/link";

import Slider from "@/components/front-end/slider";
import { getMarkets } from "@/lib/frontend-data";

export default async function MarketList() {
	const markets = await getMarkets();

	return (
		<section className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
			<div className="mb-5 flex items-center justify-between">
				<h2 className="font-bold text-slate-900 text-xl dark:text-slate-100">
					Chợ nông sản
				</h2>
				<Link
					className="rounded-md bg-slate-900 px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
					href="/markets"
				>
					Xem tất cả
				</Link>
			</div>
			<Slider autoplay>
				{markets.map((market) => (
					<Link
						className="w-[80%] shrink-0 snap-start rounded-lg bg-white p-4 text-center shadow-sm transition hover:shadow-md sm:w-[45%] lg:w-[30%] xl:w-[19%] dark:bg-slate-900"
						href={`/markets/${market.slug}`}
						key={market.id}
					>
						<div className="relative h-24 w-full overflow-hidden rounded-md">
							<Image
								alt={market.title}
								className="object-cover"
								fill
								sizes="(max-width: 640px) 80vw, (max-width: 1024px) 30vw, 19vw"
								src={market.logo || "/leaf_icon.svg"}
								unoptimized
							/>
						</div>
						<p className="mt-3 truncate font-medium text-slate-900 text-sm dark:text-slate-100">
							{market.title}
						</p>
					</Link>
				))}
			</Slider>
		</section>
	);
}
