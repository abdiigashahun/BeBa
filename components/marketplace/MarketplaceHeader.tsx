import Link from "next/link";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

type MarketplaceHeaderProps = {
	location: string;
	cartCount: number;
	onLocationClick: () => void;
	onCartClick: () => void;
};

export function MarketplaceHeader({ location, cartCount, onLocationClick, onCartClick }: MarketplaceHeaderProps) {
	return (
		<header className="site-header">
			<Link className="brand" href="/" aria-label="BeBa home"><span className="brand-mark">B</span><span>BeBa</span></Link>
			<nav className="desktop-nav" aria-label="Main navigation"><a className="nav-active" href="/discover">Discover</a><a href="/shops">Shops</a><a href="#how-it-works">How it works</a></nav>
			<div className="header-actions">
				<button className="location-button" onClick={onLocationClick} aria-label="Change location"><span className="pin-icon">⌖</span><span>{location}</span><span className="chevron">⌄</span></button>
				<button className="cart-button" onClick={onCartClick} aria-label={`Cart with ${cartCount} items`}><span>Bag</span><span className="cart-count">{cartCount}</span></button>
				<Show when="signed-out">
					<div className="auth-actions">
						<SignInButton mode="modal"><button className="auth-link" type="button">Sign in</button></SignInButton>
						<SignUpButton mode="modal"><button className="auth-button" type="button">Sign up</button></SignUpButton>
					</div>
				</Show>
				<Show when="signed-in"><UserButton /></Show>
			</div>
		</header>
	);
}
