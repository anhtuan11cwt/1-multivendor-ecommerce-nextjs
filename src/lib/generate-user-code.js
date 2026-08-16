export function generateUserCode(prefix, fullName) {
	const initials = fullName
		.split(" ")
		.filter(Boolean)
		.map((word) => word[0])
		.join("")
		.toUpperCase();

	const now = new Date();
	const pad = (value) => String(value).padStart(2, "0");
	const timestamp =
		`${String(now.getFullYear()).slice(-2)}${pad(now.getMonth() + 1)}` +
		`${pad(now.getDate())}${pad(now.getHours())}` +
		`${pad(now.getMinutes())}${pad(now.getSeconds())}`;

	return `${prefix}-${initials}-${timestamp}`;
}
