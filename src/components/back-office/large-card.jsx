export function formatCompactNumber(value) {
	if (value >= 1_000_000) {
		return `${Number.parseFloat((value / 1_000_000).toFixed(1))}M`;
	}
	if (value >= 1_000) {
		return `${Number.parseFloat((value / 1_000).toFixed(1))}K`;
	}
	return String(value);
}

export default function LargeCard({ icon: Icon, title, number, color }) {
	return (
		<div
			className={`flex flex-col items-center gap-2 rounded-lg p-8 text-white shadow-lg ${color}`}
		>
			<Icon className="size-8" />
			<h4 className="font-medium text-sm uppercase tracking-wide opacity-90">
				{title}
			</h4>
			<h2 className="font-bold text-2xl">{formatCompactNumber(number)} ₫</h2>
		</div>
	);
}
