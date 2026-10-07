"use client";

import { useMemo, useState } from "react";
import { CartDrawer } from "../components/marketplace/CartDrawer";
import { HeroSection } from "../components/marketplace/HeroSection";
import { LocationModal } from "../components/marketplace/LocationModal";
import { MarketplaceCatalog } from "../components/marketplace/MarketplaceCatalog";
import { MarketplaceFooter } from "../components/marketplace/MarketplaceFooter";
import { MarketplaceHeader } from "../components/marketplace/MarketplaceHeader";
import { TrustStrip } from "../components/marketplace/TrustStrip";
import { categories, products, type Product } from "../data/products";

export default function Home() {
	const [query, setQuery] = useState("");
	const [activeCategory, setActiveCategory] = useState("All products");
	const [location, setLocation] = useState("Addis Ababa");
	const [showLocation, setShowLocation] = useState(false);
	const [showCart, setShowCart] = useState(false);
	const [saved, setSaved] = useState<number[]>([]);
	const [cartItems, setCartItems] = useState<Product[]>([]);
	const [deliveryOnly, setDeliveryOnly] = useState(false);
	const [sortOption, setSortOption] = useState("Recommended");

	const filteredProducts = useMemo(() => products.filter((product) => {
		const matchesQuery = `${product.name} ${product.shop} ${product.category}`.toLowerCase().includes(query.toLowerCase());
		const matchesCategory = activeCategory === "All products" || product.category === activeCategory;
		return matchesQuery && matchesCategory && (!deliveryOnly || product.delivery !== "Pickup only");
	}), [activeCategory, deliveryOnly, query]);

	const sortedProducts = useMemo(() => [...filteredProducts].sort((first, second) => {
		if (sortOption === "Price: low to high") return first.price - second.price;
		if (sortOption === "Price: high to low") return second.price - first.price;
		return first.id - second.id;
	}), [filteredProducts, sortOption]);

	const addToBag = (product: Product) => {
		setCartItems((items) => [...items, product]);
		setShowCart(true);
	};

	return <main><MarketplaceHeader location={location} cartCount={cartItems.length} onLocationClick={() => setShowLocation(true)} onCartClick={() => setShowCart(true)} /><HeroSection query={query} onQueryChange={setQuery} /><TrustStrip /><MarketplaceCatalog products={sortedProducts} categories={categories} activeCategory={activeCategory} query={query} deliveryOnly={deliveryOnly} sortOption={sortOption} saved={saved} onCategoryChange={setActiveCategory} onDeliveryChange={() => setDeliveryOnly((value) => !value)} onSortChange={() => setSortOption((current) => current === "Recommended" ? "Price: low to high" : current === "Price: low to high" ? "Price: high to low" : "Recommended")} onToggleSaved={(id) => setSaved((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])} onAddToBag={addToBag} onClear={() => { setQuery(""); setActiveCategory("All products"); setDeliveryOnly(false); setSortOption("Recommended"); }} onSetLocation={() => setShowLocation(true)} /><MarketplaceFooter />{showLocation && <LocationModal onClose={() => setShowLocation(false)} onSelect={(selectedLocation) => { setLocation(selectedLocation); setShowLocation(false); }} />}{showCart && <CartDrawer items={cartItems} onClose={() => setShowCart(false)} />}</main>;
}
