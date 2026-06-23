import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./Components/header"
import Footer from "./Components/Footer"
import Home from "./pages/home"
import Items from "./pages/items"
import Item from "./pages/item"
function App() {
return (
<BrowserRouter>
<Header />
<main className="p-6">
<Routes>
<Route path="/" element={<Home />} />
<Route path="/items" element={<Items />} />
<Route path="/items/:id" element={<Item />} />
</Routes>
</main>
8
<Footer />
</BrowserRouter>
)
}
export default App