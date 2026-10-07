type HeroSectionProps = { query: string; onQueryChange: (query: string) => void };

export function HeroSection({ query, onQueryChange }: HeroSectionProps) {
	return (
		<section className="hero" id="top">
			<div className="hero-copy"><p className="eyebrow"><span className="live-dot" /> Real products. Real places.</p><h1>Find it.<br /><em>Know where.</em></h1><p className="hero-description">Search products from trusted local shops, compare real prices, and choose how you want to get it.</p><div className="search-wrap"><span className="search-icon">⌕</span><input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="What are you looking for?" aria-label="Search products" /><a className="search-submit" href="#discover">Search</a></div><div className="popular-searches"><span>Popular:</span><button onClick={() => onQueryChange("iPhone")}>iPhone 15</button><button onClick={() => onQueryChange("Nike")}>Nike Air Force 1</button><button onClick={() => onQueryChange("laptop")}>laptop</button></div></div>
			<div className="hero-visual" aria-label="A selection of products from BeBa sellers"><div className="hero-image image-one" /><div className="hero-image image-two" /><div className="hero-tag"><span className="tag-check">✓</span><span><strong>Verified sellers</strong><small>Shop with confidence</small></span></div><div className="hero-note"><span>↗</span><strong>2,400+</strong><small>items nearby</small></div></div>
		</section>
	);
}
