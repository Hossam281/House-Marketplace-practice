import { BrowserRouter as Router ,Route,Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Explore from "./pages/Explore"
import ForgotPassword from "./pages/ForgotPassword"
import Offers from "./pages/Offers"
import Profile from "./pages/Profile"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Navbar from "./components/Navbar"
import PrivateRoutes from "./components/PrivateRoutes";
import Category from "./pages/Category";
import CreateListing from "./pages/CreateListing";
import Lisitng from "./pages/Lisitng";
import Contact from "./pages/Contact";
import EditListing from "./pages/EditListing";
function App() {

  return (
    <>
<Router>
        <Routes>
          <Route path="/" element={<Explore/>}/>
          <Route path="/offers" element={<Offers/>}/>
          <Route path="/category/:categoryName" element={<Category/>}/>
          <Route path="/profile" element={<PrivateRoutes/>}>
          <Route path="/profile" element={<Profile/>}/>
          </Route>
          <Route path="/sign-in" element={<SignIn/>}/>
          <Route path="/sign-up" element={<SignUp/>}/>
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/create-listing" element={<CreateListing/>}/>
          <Route path="/edit-listing/:listingId" element={<EditListing/>}/>
          <Route path="//category/:categoryName/:listingId" element={<Lisitng/>}/>
          <Route path="/contact/:landlordId" element={<Contact/>}/>
        </Routes>
        <Navbar/>
      </Router>
      <ToastContainer/>
    </>
  )
}

export default App
