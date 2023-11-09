import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PersonalFeed from "./pages/PersonalFeed";
import SearchPage from "./pages/SearchPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./styles/index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Header />
      <Routes>
        <Route exact path="/" element={<PersonalFeed />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
