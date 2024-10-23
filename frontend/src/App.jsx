import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Time from "./pages/Time/Time";
import Review from "./pages/Review/Review";
import AdminDashboard from "./pages/DashBoard/AdminDashboard";
import Services from "./pages/Services/Services";
import Success from "./pages/Success/Success";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Testimonials from "./pages/Testimonials/Testimonials";

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/businesses" element={<Time />} />
        <Route path="/review" element={<Review />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/services" element={<Services />} />
        <Route path="/success" element={<Success />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/testimonials" element={<Testimonials />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
