import { Link } from "react-router-dom"
import type { Item } from "../types/item"
const items: Item[] = [
{ id: 1, name: "Laptop", description: "Portable computer", price: 1200 },
{ id: 2, name: "Phone", description: "Smartphone", price: 800 },
{ id: 3, name: "Keyboard", description: "Mechanical keyboard", price: 120 }
]
export default function Items() {
return (
<div>
<h1 className="text-2xl font-bold">Items</h1>
<ul>
{items.map(item => (
<li key={item.id}>
<Link to={`/items/${item.id}`}>
{item.name}
</Link>
</li>
))}
</ul>
</div>
)
}