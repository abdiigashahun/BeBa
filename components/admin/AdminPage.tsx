"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { products } from "../../data/products";

type SellerStatus = "Pending" | "Approved" | "Suspended";
type Seller = { id: number; name: string; owner: string; location: string; category: string; products: number; status: SellerStatus; joined: string };

const initialSellers: Seller[] = [
	{ id: 1, name: "Sole District", owner: "Dawit Bekele", location: "Bole, Addis Ababa", category: "Footwear", products: 24, status: "Approved", joined: "Oct 02, 2026" },
	{ id: 2, name: "Ethio Gadget", owner: "Mimi Tesfaye", location: "Piazza, Addis Ababa", category: "Electronics", products: 18, status: "Pending", joined: "Oct 05, 2026" },
	{ id: 3, name: "Mela Studio", owner: "Mekdes Alemu", location: "Kazanchis, Addis Ababa", category: "Clothing", products: 31, status: "Approved", joined: "Sep 28, 2026" },
	{ id: 4, name: "Kibreab Leather", owner: "Kibreab Hailu", location: "Mercato, Addis Ababa", category: "Accessories", products: 12, status: "Suspended", joined: "Sep 21, 2026" },
	{ id: 5, name: "Sound & Vision", owner: "Samuel Girma", location: "Hayahulet, Addis Ababa", category: "Audio", products: 9, status: "Pending", joined: "Oct 06, 2026" },
];

const statusFilters = ["All sellers", "Pending", "Approved", "Suspended"] as const;

export function AdminPage() {
	const [sellers, setSellers] = useState(initialSellers);
	const [selectedId, setSelectedId] = useState(2);
	const [filter, setFilter] = useState<(typeof statusFilters)[number]>("All sellers");
	const [query, setQuery] = useState("");
	const selectedSeller = sellers.find((seller) => seller.id === selectedId) ?? sellers[0];
	const filteredSellers = useMemo(() => sellers.filter((seller) => {
		const matchesFilter = filter === "All sellers" || seller.status === filter;
		const matchesQuery = `${seller.name} ${seller.owner} ${seller.location}`.toLowerCase().includes(query.toLowerCase());
		return matchesFilter && matchesQuery;
	}), [filter, query, sellers]);
	const updateStatus = (id: number, status: SellerStatus) => setSellers((current) => current.map((seller) => seller.id === id ? { ...seller, status } : seller));
	const productCount = products.length + 88;

	return <main className="admin-shell"><header className="admin-header"><div className="admin-brand"><Link className="brand" href="/"><span className="brand-mark">B</span><span>BeBa</span></Link><span className="admin-divider" /> <span className="admin-label">Admin console</span></div><Link className="admin-back" href="/">Back to marketplace <span>↗</span></Link></header><div className="admin-content"><div className="admin-heading"><div><p className="section-kicker">Operations overview</p><h1>Seller management</h1><p>Review seller accounts, verify businesses, and keep the marketplace healthy.</p></div><button className="admin-primary-button" type="button" onClick={() => setFilter("Pending")}>Review pending <span>{sellers.filter((seller) => seller.status === "Pending").length}</span></button></div><section className="admin-metrics"><div><span className="metric-label">Total sellers</span><strong>{sellers.length}</strong><small>Across Addis Ababa</small></div><div><span className="metric-label">Pending review</span><strong className="metric-warning">{sellers.filter((seller) => seller.status === "Pending").length}</strong><small>Need your attention</small></div><div><span className="metric-label">Live products</span><strong>{productCount}</strong><small>Currently listed</small></div><div><span className="metric-label">Approved rate</span><strong>{Math.round((sellers.filter((seller) => seller.status === "Approved").length / sellers.length) * 100)}%</strong><small>Seller approval rate</small></div></section><div className="admin-workspace"><section className="seller-panel"><div className="seller-toolbar"><div><h2>Seller accounts</h2><span>{filteredSellers.length} accounts shown</span></div><input aria-label="Search sellers" placeholder="Search sellers..." value={query} onChange={(event) => setQuery(event.target.value)} /></div><div className="status-tabs">{statusFilters.map((status) => <button className={filter === status ? "active" : ""} key={status} type="button" onClick={() => setFilter(status)}>{status}</button>)}</div><div className="seller-table"><div className="seller-table-head"><span>Seller</span><span>Category</span><span>Products</span><span>Status</span><span /></div>{filteredSellers.map((seller) => <button className={`seller-row ${selectedSeller?.id === seller.id ? "selected" : ""}`} key={seller.id} type="button" onClick={() => setSelectedId(seller.id)}><span><strong>{seller.name}</strong><small>{seller.owner} · {seller.location}</small></span><span>{seller.category}</span><span>{seller.products}</span><span className={`status status-${seller.status.toLowerCase()}`}>{seller.status}</span><span className="row-arrow">→</span></button>)}</div></section><aside className="seller-detail"><p className="section-kicker">Seller profile</p><div className="seller-detail-title"><div className="seller-avatar">{selectedSeller?.name.slice(0, 1)}</div><div><h2>{selectedSeller?.name}</h2><span>{selectedSeller?.owner}</span></div></div><div className="detail-status"><span className={`status status-${selectedSeller?.status.toLowerCase()}`}>{selectedSeller?.status}</span><span>Joined {selectedSeller?.joined}</span></div><dl><div><dt>Location</dt><dd>{selectedSeller?.location}</dd></div><div><dt>Category</dt><dd>{selectedSeller?.category}</dd></div><div><dt>Listed products</dt><dd>{selectedSeller?.products} products</dd></div></dl><div className="detail-actions">{selectedSeller?.status !== "Approved" && <button className="approve-button" type="button" onClick={() => updateStatus(selectedSeller.id, "Approved")}>Approve seller</button>}{selectedSeller?.status !== "Suspended" && <button className="suspend-button" type="button" onClick={() => updateStatus(selectedSeller.id, "Suspended")}>Suspend account</button>}{selectedSeller?.status === "Suspended" && <button className="approve-button" type="button" onClick={() => updateStatus(selectedSeller.id, "Approved")}>Restore account</button>}</div><button className="view-products-button" type="button">View seller products <span>↗</span></button></aside></div></div></main>;
}
