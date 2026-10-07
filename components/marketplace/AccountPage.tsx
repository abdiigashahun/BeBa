import Link from "next/link";

export function AccountPage() {
	return <main><section className="account-page"><p className="section-kicker">Your BeBa account</p><h1>Everything you need, in one place.</h1><p>Sign in to manage saved products, orders, delivery locations, and your seller profile.</p><div className="account-options"><Link href="/login"><strong>Customer account</strong><span>Orders, saved items, and locations →</span></Link><a href="#seller"><strong>Seller workspace</strong><span>Products, inventory, and orders →</span></a><Link href="/admin"><strong>Admin console</strong><span>Verification, shops, and categories →</span></Link></div></section></main>;
}
