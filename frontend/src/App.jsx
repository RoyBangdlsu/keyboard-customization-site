import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Customize from "./pages/Customize";
import Order from "./pages/Order";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";  // ✅ Import Profile page

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/customize" element={<Customize />} />
        <Route path="/order" element={<Order />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />  {/* ✅ Profile Route */}
      </Routes>
    </>
  );
}

export default App;
