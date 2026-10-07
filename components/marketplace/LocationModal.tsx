import { useState } from "react";

type LocationModalProps = { onClose: () => void; onSelect: (location: string) => void };

export function LocationModal({ onClose, onSelect }: LocationModalProps) {
	const [search, setSearch] = useState("");
	const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (search.trim()) onSelect(search.trim());
	};

	return <div className="modal-backdrop" onClick={onClose}><div className="location-modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={onClose}>×</button><span className="modal-icon">⌖</span><p className="section-kicker">Your shopping area</p><h2>Where should we look?</h2><p>We will show nearby sellers, stock, and delivery options for your area.</p><form className="location-input" onSubmit={submitSearch}><span>⌕</span><input autoFocus value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search a city or neighborhood" /><button type="button" onClick={() => onSelect("Addis Ababa")}>Use current</button></form><div className="recent-location"><span>⌖</span><div><strong>Addis Ababa</strong><small>Capital city, Ethiopia</small></div><button onClick={() => onSelect("Addis Ababa")}>Select</button></div></div></div>;
}
