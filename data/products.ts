export type Product = {
	id: number;
	name: string;
	shop: string;
	category: string;
	price: number;
	location: string;
	distance: string;
	image: string;
	stock: string;
	delivery: string;
	verified: boolean;
	accent: string;
};

export const categories = ["All products", "Clothes", "Shoes", "Phones", "Electronics", "Bags", "Accessories"];

export const products: Product[] = [
	{ id: 1, name: "Air Force 1 '07", shop: "Sole District", category: "Shoes", price: 4850, location: "Bole, Addis Ababa", distance: "1.8 km", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85", stock: "In stock", delivery: "Delivers in 2-4 hrs", verified: true, accent: "#e5eef3" },
	{ id: 2, name: "iPhone 15 128GB", shop: "Ethio Gadget", category: "Phones", price: 74900, location: "Piazza, Addis Ababa", distance: "4.2 km", image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=900&q=85", stock: "Only 2 left", delivery: "Delivery available", verified: true, accent: "#e9e8e3" },
	{ id: 3, name: "Everyday linen shirt", shop: "Mela Studio", category: "Clothes", price: 1850, location: "Kazanchis, Addis Ababa", distance: "3.1 km", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=85", stock: "In stock", delivery: "Pickup only", verified: true, accent: "#f0ece4" },
	{ id: 4, name: "Leather crossbody bag", shop: "Kibreab Leather", category: "Bags", price: 3200, location: "Mercato, Addis Ababa", distance: "5.6 km", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85", stock: "In stock", delivery: "Delivers tomorrow", verified: true, accent: "#e9e1d8" },
	{ id: 5, name: "Sony WH-1000XM5", shop: "Sound & Vision", category: "Accessories", price: 16900, location: "Hayahulet, Addis Ababa", distance: "6.4 km", image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=85", stock: "In stock", delivery: "Delivers in 2-4 hrs", verified: true, accent: "#e5e6e7" },
	{ id: 6, name: "MacBook Air M2", shop: "iCentre Ethiopia", category: "Electronics", price: 108500, location: "Bole Atlas, Addis Ababa", distance: "2.5 km", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=85", stock: "Only 1 left", delivery: "Delivery available", verified: true, accent: "#e5e8eb" },
];

export const formatPrice = (price: number) => `ETB ${price.toLocaleString("en-US")}`;
