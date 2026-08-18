import ProductDetailClient from "@/components/front-end/product-detail-client";
import { getCategoryById, getProductBySlug } from "@/lib/frontend-data";

export default async function ProductDetailPage({ params }) {
	const { slug } = await params;
	const product = await getProductBySlug(slug);

	if (!product) {
		return (
			<div className="mx-auto max-w-7xl px-4 py-16 text-center text-slate-500 lg:px-8 dark:text-slate-400">
				Không tìm thấy sản phẩm.
			</div>
		);
	}

	const category = product.category
		? await getCategoryById(product.category.id)
		: null;

	return (
		<ProductDetailClient
			category={category}
			product={product}
			relatedProducts={(category?.products || []).filter(
				(item) => item.id !== product.id,
			)}
		/>
	);
}
