import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="bg-dark text-light p-3">
      <h1 className="text-center">All Right Reserverd &copy; Ecommerce App </h1>
      <p className="text-center mt-3">
        <Link to="/about">About</Link>
        <Link to="/about">About</Link>
        <Link to="/about">About</Link>
      </p>
    </div>
  );
}
