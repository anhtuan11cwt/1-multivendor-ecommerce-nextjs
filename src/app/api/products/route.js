import { NextResponse } from "next/server";

import { productSchema } from "@/lib/schemas";

export async function POST(request) {
	try {
		const body = await request.json();
		const parsed = productSchema.safeParse(body);
		if (!parsed.success) {
			return NextResponse.json(
				{
					errors: parsed.error.flatten().fieldErrors,
					message: "Dữ liệu không hợp lệ",
				},
				{ status: 400 },
			);
		}
		const {
			title,
			slug,
			description,
			imageUrl,
			sku,
			barcode,
			price,
			salePrice,
			categoryId,
			farmerId,
			tags,
			isActive,
		} = parsed.data;
		const productData = {
			barcode: barcode || "",
			categoryId,
			createdAt: new Date().toLocaleDateString("vi-VN"),
			description: description || "",
			farmerId,
			id: crypto.randomUUID(),
			imageUrl: imageUrl || "",
			isActive,
			price,
			salePrice: salePrice ?? null,
			sku: sku || "",
			slug,
			tags: tags || [],
			title,
		};
		console.log("Đã tạo sản phẩm:", productData);
		return NextResponse.json({ data: productData }, { status: 201 });
	} catch (error) {
		return NextResponse.json(
			{ message: error.message || "Lỗi tạo sản phẩm" },
			{ status: 500 },
		);
	}
}

export async function PUT(request) {
	try {
		const body = await request.json();
		const { id } = body;
		if (!id) {
			return NextResponse.json({ message: "ID là bắt buộc" }, { status: 400 });
		}
		const parsed = productSchema.safeParse(body);
		if (!parsed.success) {
			return NextResponse.json(
				{
					errors: parsed.error.flatten().fieldErrors,
					message: "Dữ liệu không hợp lệ",
				},
				{ status: 400 },
			);
		}
		const {
			title,
			slug,
			description,
			imageUrl,
			sku,
			barcode,
			price,
			salePrice,
			categoryId,
			farmerId,
			tags,
			isActive,
		} = parsed.data;
		const productData = {
			barcode: barcode || "",
			categoryId,
			description: description || "",
			farmerId,
			id,
			imageUrl: imageUrl || "",
			isActive,
			price,
			salePrice: salePrice ?? null,
			sku: sku || "",
			slug,
			tags: tags || [],
			title,
		};
		console.log("Đã cập nhật sản phẩm:", productData);
		return NextResponse.json({ data: productData }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: error.message || "Lỗi cập nhật sản phẩm" },
			{ status: 500 },
		);
	}
}
