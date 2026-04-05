import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import Authlayout from "./components/Layout/Authlayout";
import ProfileLayout from "./components/Layout/ProfileLayout";
import CustomerDashboard from "./components/Layout/CustomerDashboard";
import PhotographerLayout from "./components/Layout/PhotographerLayout";

// Auth Pages
import Welcome from "./pages/Authentication/Welcome";
import Signin from "./pages/Authentication/Signin";
import Signup from "./pages/Authentication/Signup";
import Forgotpassword from "./pages/Authentication/Forgotpassword";

// Customer Pages
import ChooseLocation from "./pages/Customer/Chooselocation";
import FindPhotographers from "./pages/Customer/Findphotographer";
import Photographerswork from "./pages/Customer/Photographerswork";
import Paymentdetails from "./pages/Customer/Paymentdetails";
import ChatPage from "./pages/Customer/ChatPage";
import ProfilePage from "./pages/Customer/Profilepage";
import Rating from "./pages/Customer/Rating";

// Photographer Pages
import Createprofile from "./pages/Photographer/Createprofile";
import Home from "./pages/Photographer/Home";
import Uploadportfolio from "./pages/Photographer/Uploadportfolio";
import Uploadpackage from "./pages/Photographer/Uploadpackage";
import Booking from "./pages/Photographer/Booking";
import PhotographerChat from "./pages/Photographer/PhotpgrapherChat";
import PhotographerProfile from "./pages/Photographer/PhotographerProfile";
import Transaction from "./pages/Photographer/Transaction";

// Main Landing
import Landingpage from "./pages/Landing/Landingpage";
import Verification from "./pages/Authentication/Verification";
import Reset from "./pages/Authentication/Reset";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ----------------- Auth Routes ----------------- */}
        <Route path="/auth" element={<Authlayout />}>
          <Route index element={<Welcome />} />
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="forgotpassword" element={<Forgotpassword />} />
          <Route path="verification" element={<Verification />} />
          <Route path="reset" element={<Reset />} />
        </Route>

        {/* ----------------- Landing Page ----------------- */}
        <Route path="/" element={<Landingpage />} />

        {/* ----------------- Customer Routes ----------------- */}
        <Route path="/customer" element={<ProfileLayout />}>
          <Route index element={<ChooseLocation />} />
        </Route>

        <Route path="/customerDashboard" element={<CustomerDashboard />}>
          <Route index element={<FindPhotographers />} />
          <Route path="photographerswork/:id" element={<Photographerswork />} />
          <Route path="paymentdetails" element={<Paymentdetails />} />
          <Route path="chat" element={<ChatPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="rating" element={<Rating />} />
        </Route>

        {/* ----------------- Photographer Routes ----------------- */}
        <Route path="/photographer" element={<ProfileLayout />}>
          <Route index element={<Createprofile />} />
        </Route>

        <Route path="/photographerdashboard" element={<PhotographerLayout />}>
          <Route index element={<Home />} />
          <Route path="uploadportfolio" element={<Uploadportfolio />} />
          <Route path="uploadpackage" element={<Uploadpackage />} />
          <Route path="booking" element={<Booking />} />
          <Route path="photographerchat" element={<PhotographerChat />} />
          <Route path="photographerprofile" element={<PhotographerProfile />} />
          <Route path="transaction" element={<Transaction />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;