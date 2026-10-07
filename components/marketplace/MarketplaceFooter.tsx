import Link from "next/link";

export function MarketplaceFooter() {
	return <footer className="site-footer"><div className="footer-brand"><Link className="brand" href="/"><span className="brand-mark">B</span><span>BeBa</span></Link><p>Find what you need.<br />Right where you need it.</p></div><div className="footer-links"><div><strong>Discover</strong><a href="/discover">All products</a><a href="/discover">Categories</a><a href="/shops">Nearby shops</a></div><div><strong>For sellers</strong><a href="/account">List your shop</a><a href="/account">Seller sign in</a><a href="#top">Seller guide</a></div><div><strong>Need help?</strong><a href="#how-it-works">How BeBa works</a><a href="#top">Contact us</a><a href="#top">Safety & trust</a></div></div><div className="footer-bottom"><span>© 2025 BeBa Marketplace</span><span>Addis Ababa · Ethiopia</span></div></footer>;
}
