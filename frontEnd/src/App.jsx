import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Create from "./components/Create";
import UpdateProduct from "./components/UpdateProduct";
import Home from "./components/Home";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/update/:id" element={<UpdateProduct />} />
      </Routes>
    </>
  );
}


export default App;
