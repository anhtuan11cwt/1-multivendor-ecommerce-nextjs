export function generateCouponCode(title, expiryDate) {
	if (!title || !expiryDate) return "";

	const formattedTitle = title
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/đ/g, "d")
		.replace(/Đ/g, "D")
		.toUpperCase()
		.replace(/\s+/g, "");

	const [year, month, day] = expiryDate.split("-");
	const formattedDate = `${day}${month}${year}`;

	return `${formattedTitle}-${formattedDate}`;
}
