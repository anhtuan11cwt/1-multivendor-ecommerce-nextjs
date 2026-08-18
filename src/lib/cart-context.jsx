"use client";

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import toast from "react-hot-toast";

const CartContext = createContext(null);
const STORAGE_KEY = "cart";

export function CartProvider({ children }) {
	const [items, setItems] = useState([]);
	const [hydrated, setHydrated] = useState(false);
	const hydratedRef = useRef(false);

	useEffect(() => {
		if (hydratedRef.current) return;
		hydratedRef.current = true;
		window.requestAnimationFrame(() => {
			try {
				const raw = window.localStorage.getItem(STORAGE_KEY);
				if (raw) setItems(JSON.parse(raw));
			} catch {
				setItems([]);
			} finally {
				setHydrated(true);
			}
		});
	}, []);

	useEffect(() => {
		if (!hydrated) return;
		try {
			window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
		} catch {
			// bỏ qua lỗi lưu localStorage
		}
	}, [hydrated, items]);

	const addItem = useCallback((product, quantity = 1) => {
		setItems((current) => {
			const existing = current.find((item) => item.id === product.id);
			if (existing) {
				return current.map((item) =>
					item.id === product.id
						? { ...item, quantity: item.quantity + quantity }
						: item,
				);
			}
			return [
				...current,
				{
					categoryTitle: product.categoryTitle || "",
					id: product.id,
					imageUrl: product.imageUrl,
					price: product.salePrice ?? product.price,
					quantity,
					slug: product.slug,
					title: product.title,
				},
			];
		});
		toast.success("Đã thêm vào giỏ hàng!");
	}, []);

	const removeItem = useCallback((id) => {
		setItems((current) => current.filter((item) => item.id !== id));
		toast.success("Đã xóa khỏi giỏ hàng!");
	}, []);

	const updateQuantity = useCallback((id, quantity) => {
		if (quantity < 1) return;
		setItems((current) =>
			current.map((item) => (item.id === id ? { ...item, quantity } : item)),
		);
	}, []);

	const value = useMemo(() => {
		const subtotal = items.reduce(
			(sum, item) => sum + item.price * item.quantity,
			0,
		);
		const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
		return {
			addItem,
			hydrated,
			items,
			removeItem,
			subtotal,
			totalCount,
			updateQuantity,
		};
	}, [addItem, hydrated, items, removeItem, updateQuantity]);

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error("useCart phải được dùng bên trong CartProvider");
	}
	return context;
}
