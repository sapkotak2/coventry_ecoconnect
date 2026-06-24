import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Amplify } from "aws-amplify"
import { Authenticator } from "@aws-amplify/ui-react"
import '@aws-amplify/ui-react/styles.css'
import { Navbar } from "./Components/Navbar"
import Footer from "./Components/Footer"
import Home from "./pages/home"
import Businesses from "./pages/businesses"
import Business from "./pages/business"




function App() {
  return (
    <Authenticator.Provider>
      <BrowserRouter>
        <Navbar />
        <main className="p-6">
            <Authenticator>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/businesses" element={<Businesses />} />
            <Route path="/businesses/:id" element={<Business />} />
          </Routes>
          </Authenticator>
        </main>
        <Footer />
      </BrowserRouter>
    </Authenticator.Provider>
  )
}

export default App