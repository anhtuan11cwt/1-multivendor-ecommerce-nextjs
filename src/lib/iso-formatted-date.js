export function generateISOFormattedDate(dateString) {
	const date = new Date(dateString);
	if (Number.isNaN(date.getTime())) {
		throw new Error("Ngày tháng không hợp lệ");
	}
	return date.toISOString();
}
