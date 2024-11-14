import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useColor } from "../Context/ColorContextProvider";

function Create() {
  const navigate = useNavigate();
  const {color}=useColor();
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productURL, setProductURL] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // Reset error message before making the request
    setErrorMessage("");

    try {
      const result = await axios.post(
        "http://localhost:3000/products/create",
        {
          name: productName,
          price: productPrice,
          image: productURL,
        },
        { withCredentials: true } // Include cookies for auth
      );

      console.log("Product creation result:", result);
      toast.success("New Product Added Successfully!");
      navigate("/");
    } catch (err) {
      console.error("Error creating product:", err);
      toast.error("Failed to add the product. Please try again.");
      setErrorMessage("Failed to add the product. Please try again.");
    }
  };

  return (
    <div className={`${color} h-screen flex flex-col items-center justify-center`}>
      <ToastContainer position="top-center" autoClose={3000}/>
    
      <div className="w-[30%] flex items-center justify-center mx-auto ">
        <form
          onSubmit={onSubmitHandler}
          className="text-black flex flex-col justify-center p-10  mx-auto bg-slate-600  w-full max-w-md "
        >
            <h2 className="text-sky-500 py-2 text-2xl mx-auto">Create New Product</h2>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <input
            onChange={(e) => setProductName(e.target.value)}
            type="text"
            placeholder="Product Name"
            className="p-2 m-2 outline-sky-600"
            required
          />
          <input
            onChange={(e) => setProductPrice(e.target.value)}
            type="number"
            placeholder="Product Price"
            className="p-2 m-2 outline-sky-600"
            min="0"
            required
          />
          <input
            onChange={(e) => setProductURL(e.target.value)}
            type="text"
            placeholder="Image URL"
            className="p-2 m-2  outline-sky-600"
            required
          />
          <button type="submit" className="p-2 m-2 rounded-md bg-sky-900 w-[40%] mx-auto">
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default Create;
