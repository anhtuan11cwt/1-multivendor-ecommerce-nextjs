import Image from "next/image";
import Link from "next/link";

import Slider from "@/components/front-end/slider";
import { getMarkets } from "@/lib/frontend-data";

export default async function MarketList() {
	const markets = await getMarkets();

	return (
		<section className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
			<div className="mb-5 flex items-center justify-between">
				<h2 className="font-bold text-lime-600 text-xl dark:text-lime-400">
					Chợ nông sản
				</h2>
				<Link
					className="rounded-md bg-lime-600 px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-lime-700 dark:bg-lime-500 dark:text-slate-950 dark:hover:bg-lime-400"
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
						<div className="relative h-24 w-full overflow-hidden rounded-2xl">
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
