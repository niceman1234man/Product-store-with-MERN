import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Create from "./components/Create";
import UpdateProduct from "./components/UpdateProduct";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import UserContextProvider from "./Context/UserContextProvider";

function App() {
  return (
    <UserContextProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/update/:id" element={<UpdateProduct />} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </UserContextProvider>
  );
}


export default App;
