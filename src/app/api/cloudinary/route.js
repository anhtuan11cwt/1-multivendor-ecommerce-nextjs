import { NextResponse } from "next/server";

import { getSignedUploadParams } from "@/lib/cloudinary";

export async function POST(request) {
	try {
		const { folder } = await request.json();
		const params = getSignedUploadParams({ folder });
		return NextResponse.json(params, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: error.message || "Không tạo được tham số upload" },
			{ status: 500 },
		);
	}
}
