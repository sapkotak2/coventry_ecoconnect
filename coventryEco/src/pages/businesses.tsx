import { Link } from "react-router-dom"
import type { Business } from "../types/Business"
const businesses: Business[] = [
{ businessId: 1, businessName: "Laptop", businessDescription: "Portable computer", businessRating: 4.5 },
{ businessId: 2, businessName: "Phone", businessDescription: "Smartphone", businessRating: 4.2 },
{ businessId: 3, businessName: "Keyboard", businessDescription: "Mechanical keyboard", businessRating: 4.8 }
]
export default function Businesses() {
return (
<div>
<h1 className="text-2xl font-bold">Businesses</h1>
<ul>
{businesses.map(business => (
<li key={business.businessId}>
<Link to={`/Business/${business.businessId}`}>
{business.businessName}
</Link>
</li>
))}
</ul>
</div>
)
}