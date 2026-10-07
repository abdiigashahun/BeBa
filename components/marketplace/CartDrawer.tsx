import { useState } from "react";
import type { Product } from "../../data/products";
import { formatPrice } from "../../data/products";

type CartDrawerProps = { items: Product[]; onClose: () => void };

export function CartDrawer({ items, onClose }: CartDrawerProps) {
	const [checkoutStarted, setCheckoutStarted] = useState(false);
	const subtotal = items.reduce((total, item) => total + item.price, 0);

	return <div className="modal-backdrop cart-backdrop" onClick={onClose}><aside className="cart-drawer" onClick={(event) => event.stopPropagation()}><div className="drawer-heading"><div><p className="section-kicker">Your selection</p><h2>Your bag <span>{items.length}</span></h2></div><button className="modal-close" onClick={onClose}>×</button></div>{items.length === 0 ? <div className="cart-empty"><span>◌</span><h3>Your bag is empty</h3><p>Add products you like and they will appear here.</p><button onClick={onClose}>Continue browsing</button></div> : checkoutStarted ? <div className="cart-empty"><span>✓</span><h3>Checkout is ready</h3><p>This mock checkout is ready for delivery details and payment.</p><button onClick={onClose}>Back to browsing</button></div> : <><div className="cart-item"><div className="cart-thumb" style={{ backgroundImage: `url(${items[0].image})` }} /><div><strong>{items[0].name}</strong><p>{items.length} item{items.length > 1 ? "s" : ""} from nearby shops</p></div><strong>{formatPrice(subtotal)}</strong></div><div className="cart-note"><span>⌖</span> Choose pickup or delivery at checkout.</div><button className="checkout-button" onClick={() => setCheckoutStarted(true)}>Continue to checkout <span>→</span></button></>}</aside></div>;
}
