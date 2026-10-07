"use client";

import { products } from "../../data/products";
import { ProductGrid } from "./ProductGrid";

export function MarketplaceDirectory() {
	return <main><section className="directory-hero"><p className="section-kicker">BeBa directory</p><h1>Discover trusted shops near you.</h1><p>Compare products, prices, availability, and delivery from local sellers.</p></section><section className="results-section directory-results"><div className="results-toolbar"><div><p className="section-kicker">All products</p><h2>Available from local sellers</h2><span className="result-count">{products.length} products</span></div></div><ProductGrid products={products} saved={[]} onToggleSaved={() => undefined} onAddToBag={() => undefined} onClear={() => undefined} /></section></main>;
}
