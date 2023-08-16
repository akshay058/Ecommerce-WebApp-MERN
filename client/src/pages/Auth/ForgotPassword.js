import React, { useState } from "react";
import "../../styles/AuthStyles.css";
import Layout from "../../components/layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // using axios for api fetching
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
        {
          email,
          newPassword,
          answer,
        }
      );
      //   console.log(res.data);
      if (res && res.data.success) {
        toast.success(res.data && res.data.message, {
          autoClose: 1000,
          position: toast.POSITION.TOP_RIGHT,
        });
        // setAuth({ ...auth, user: res.data.user, token: res.data.token });
        // localStorage.setItem("auth", JSON.stringify(res.data));
        setTimeout(() => {
          navigate("/login"); // Redirect to the home page
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
    <Layout title={"Forgot Password - Ecommerce App"}>
      <div className="form-container ">
        <form onSubmit={handleSubmit}>
          <h4 className="title">RESET PASSWORD</h4>

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
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputAnswer"
              placeholder="What is Favorite Movie name"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Reset
          </button>
        </form>
      </div>{" "}
    </Layout>
  );
};

export default ForgotPassword;
