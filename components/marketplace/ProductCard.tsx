import type { Product } from "../../data/products";
import { formatPrice } from "../../data/products";

type ProductCardProps = { product: Product; isSaved: boolean; onToggleSaved: (id: number) => void; onAddToBag: (product: Product) => void };

export function ProductCard({ product, isSaved, onToggleSaved, onAddToBag }: ProductCardProps) {
	return <article className="product-card"><div className="product-image" style={{ backgroundColor: product.accent, backgroundImage: `url(${product.image})` }}><button className={`save-button ${isSaved ? "saved" : ""}`} onClick={() => onToggleSaved(product.id)} aria-label={isSaved ? "Remove from saved" : "Save product"}>{isSaved ? "♥" : "♡"}</button><span className="distance-badge">⌖ {product.distance}</span></div><div className="product-info"><div className="product-title-row"><div><h3>{product.name}</h3><p className="shop-name">{product.shop} {product.verified && <span className="verified-badge">✓</span>}</p></div><strong className="product-price">{formatPrice(product.price)}</strong></div><div className="product-meta"><span className="stock"><i />{product.stock}</span><span className={product.delivery === "Pickup only" ? "pickup" : "delivery"}>{product.delivery === "Pickup only" ? "Pickup only" : "↗ " + product.delivery}</span></div><p className="product-location">⌖ {product.location}</p><button className="quick-add" onClick={() => onAddToBag(product)}>Add to bag <span>+</span></button></div></article>;
}
