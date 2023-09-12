import React, { useState } from "react";
import "../../styles/AuthStyles.css";
import Layout from "../../components/layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // using axios for api fetching
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      console.log(res.data);
      if (res && res.data.success) {
        toast.success(res.data && res.data.message, {
          autoClose: 1000,
          position: toast.POSITION.TOP_RIGHT,
        });
        setAuth({ ...auth, user: res.data.user, token: res.data.token });
        localStorage.setItem("auth", JSON.stringify(res.data));
        setTimeout(() => {
          navigate(location.state || "/"); // Redirect to the home page
        }, 1000);
      } else {
        toast.error(res.data.message, {
          autoClose: 1000,
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      // toast.success("hello");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", {
        autoClose: 1000,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  return (
    <Layout title="Login - Ecommer App">
      <div className="form-container ">
        <form onSubmit={handleSubmit}>
          <h4 className="title">LOGIN FORM</h4>

          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <div className="mb-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot Password
            </button>
          </div>
          <button type="submit" className="btn btn-primary">
            LOGIN
          </button>
        </form>
      </div>
    </Layout>
  );
}
