import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./Components/header"
import { Navbar } from "./Components/Navbar"
import Footer from "./Components/Footer"
import Home from "./pages/home"
import Items from "./pages/businesses"
import Item from "./pages/business"
import DocumentationPortal from "./Components/Documentation";
import Businesses from "./pages/businesses"
function App() {
return (
<BrowserRouter>
<Navbar />
<main className="p-6">
<Routes>
<Route path="/" element={<Home />} />
<Route path="/businesses" element={<Businesses />} />
<Route path="/items/:id" element={<Item />} />
</Routes>
</main>
<Footer />
</BrowserRouter>
)
}
export default App