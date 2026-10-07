type CategoryNavProps = { categories: string[]; activeCategory: string; onCategoryChange: (category: string) => void };

export function CategoryNav({ categories, activeCategory, onCategoryChange }: CategoryNavProps) {
	return <div className="category-row">{categories.map((category) => <button key={category} className={`category-pill ${activeCategory === category ? "selected" : ""}`} onClick={() => onCategoryChange(category)}><span>{category === "All products" ? "◈" : category === "Phones" ? "▣" : category === "Shoes" ? "⌁" : "✧"}</span>{category}</button>)}</div>;
}
