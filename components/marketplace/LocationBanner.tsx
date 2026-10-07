type LocationBannerProps = { onSetLocation: () => void };

export function LocationBanner({ onSetLocation }: LocationBannerProps) {
	return <div className="location-banner"><div className="banner-map"><span className="map-grid" /><span className="map-pin">⌖</span></div><div><p className="section-kicker">Make it yours</p><h3>See what is available around you</h3><p>Set a precise location to see distance, pickup options, and delivery fees from every shop.</p></div><button onClick={onSetLocation}>Set my location <span>→</span></button></div>;
}
