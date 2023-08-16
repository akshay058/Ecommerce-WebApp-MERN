import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
// import PrivateRoute from "./components/Routes/private";
import PrivateRoute from "./components/Routes/Private";
import ForgotPassword from "./pages/Auth/ForgotPassword";
// import { ToastContainer, toast } from "react-toastify"; // FOR NOTIFICATION
// import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="" element={<Dashboard />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route exact path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        {/* If any route not found then execute * path component */}
        <Route path="/*" element={<Pagenotfound />} />
      </Routes>
      {/* <ToastContainer /> */}
    </>
  );
}

export default App;
