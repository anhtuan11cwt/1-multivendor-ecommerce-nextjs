import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { productSchema } from "@/lib/schemas";

export async function GET() {
	try {
		const products = await db.product.findMany({
			orderBy: { createdAt: "desc" },
		});
		return NextResponse.json({ data: products }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: error.message || "Lỗi lấy danh sách sản phẩm" },
			{ status: 500 },
		);
	}
}

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
		const existing = await db.product.findUnique({ where: { slug } });
		if (existing) {
			return NextResponse.json(
				{ message: "Sản phẩm đã tồn tại" },
				{ status: 409 },
			);
		}
		const newProduct = await db.product.create({
			data: {
				barcode: barcode || "",
				categoryId,
				description: description || "",
				farmerId,
				imageUrl: imageUrl || "",
				isActive,
				price,
				salePrice: salePrice ?? null,
				sku: sku || "",
				slug,
				tags: tags || [],
				title,
			},
		});
		console.log("Đã tạo sản phẩm:", newProduct);
		return NextResponse.json({ data: newProduct }, { status: 201 });
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
		const updatedProduct = await db.product.update({
			data: {
				barcode: barcode || "",
				categoryId,
				description: description || "",
				farmerId,
				imageUrl: imageUrl || "",
				isActive,
				price,
				salePrice: salePrice ?? null,
				sku: sku || "",
				slug,
				tags: tags || [],
				title,
			},
			where: { id },
		});
		console.log("Đã cập nhật sản phẩm:", updatedProduct);
		return NextResponse.json({ data: updatedProduct }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: error.message || "Lỗi cập nhật sản phẩm" },
			{ status: 500 },
		);
	}
}
