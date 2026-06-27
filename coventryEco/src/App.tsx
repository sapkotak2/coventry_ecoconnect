import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Amplify } from "aws-amplify"
import { Authenticator } from "@aws-amplify/ui-react"
import '@aws-amplify/ui-react/styles.css'
import { Navbar } from "./Components/Navbar"
import Footer from "./Components/Footer"
import Home from "./pages/home"
import Businesses from "./pages/businesses"
import Business from "./pages/business"
import Reviews from "./pages/Review"
import BusinessAdmin from "./pages/admin"

// connect to AWS Cognito
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "us-east-1_Tl9Y95Jda",
      userPoolClientId: "6ss73u77f81vl0t17hqhra9v6k",
    }
  }
})

function App() {
  return (
    <Authenticator.Provider>
      <BrowserRouter>
              <Authenticator loginMechanisms={['email']} signUpAttributes={['name']}>
        {/* show navbar on every page */}
        <Navbar />
        {/* require login before showing any page */}

          <main>
            {/* page routes */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/businesses" element={<Businesses />} />
              <Route path="/businesses/:id" element={<Business />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/admin" element={<BusinessAdmin />} />
            </Routes>
          </main>

        {/* show footer on every page */}
        <Footer />
        </Authenticator>
      </BrowserRouter>
    </Authenticator.Provider>
     
 
  )
}

export default App