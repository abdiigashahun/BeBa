import type { Product } from "../../data/products";
import { ProductCard } from "./ProductCard";

type ProductGridProps = { products: Product[]; saved: number[]; onToggleSaved: (id: number) => void; onAddToBag: (product: Product) => void; onClear: () => void };

export function ProductGrid({ products, saved, onToggleSaved, onAddToBag, onClear }: ProductGridProps) {
	if (products.length === 0) return <div className="empty-state"><span>⌕</span><h3>No products found</h3><p>Try a different search or browse another category.</p><button onClick={onClear}>Clear filters</button></div>;
	return <div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} isSaved={saved.includes(product.id)} onToggleSaved={onToggleSaved} onAddToBag={onAddToBag} />)}</div>;
}
