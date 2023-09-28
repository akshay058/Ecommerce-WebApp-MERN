import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet"; // for SEO in react
import { ToastContainer } from "react-toastify"; // FOR NOTIFICATION
import "react-toastify/dist/ReactToastify.css";

export default function Layout({
  children,
  title,
  description,
  keywords,
  author,
}) {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh" }}>{children}</main>
      <Footer />
      <ToastContainer />
    </>
  );
}

Layout.defaultProps = {
  title: "Ecommerce app - shop now",
  description: "mern stack project",
  keywords: "mern,react,node,mongodb",
  author: "Techinfoyt",
};
