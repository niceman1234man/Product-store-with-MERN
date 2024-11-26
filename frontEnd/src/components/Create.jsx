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

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("price", productPrice);
    formData.append("image", productURL);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    try {
      console.log("Product creation result:", formData);
      const result = await axios.post(
        "https://product-store-with-mern-back2.onrender.com/products/create",
        formData, 
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, 
        }
      );
      console.log("Product creation result:", result);
      toast.success("New Product Added Successfully!");
      setProductName("");
        setProductPrice(0);
        setProductURL("");
      navigate("/home");
    } catch (err) {
      console.error("Error creating product:", err);
      toast.error("Failed to add the product. Please try again.");
      setErrorMessage("Failed to add the product. Please try again.");
    }
  };

  return (
    <div className={`${color}  flex flex-col items-center justify-center h-[90vh]`}>
      <ToastContainer position="top-center" autoClose={3000}/>
    
      <div className="w-[90%] flex items-center justify-center mx-auto ">
        <form
          onSubmit={onSubmitHandler}
          className="text-black flex flex-col justify-center p-10  mx-auto bg-slate-600  w-[50%] "
        >
            <h2 className="text-sky-500 py-2 text-sm md:text-xl lg:text-2xl mx-auto">Create New Product</h2>
            <div className="bg-cyan-400 flex justify-start mx-auto p-2 rounded md:text-xl">   <button onClick={()=>navigate(-1)}>Back</button></div>

          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <input
            onChange={(e) => setProductName(e.target.value)}
            type="text"
            name="name"
            placeholder="Product Name"
            className="p-2 m-2 outline-sky-600 w-[90%]"
            required
          />
          <input
            onChange={(e) => setProductPrice(e.target.value)}
            type="number"
            placeholder="Product Price"
            name="price"
            className="p-2 m-2 outline-sky-600 w-[90%]"
            min="0"
            required
          />
        <input
  onChange={(e) => setProductURL(e.target.files[0])}
  type="file"
  name="image"
  className="p-2 m-2 outline-sky-600 w-[90%]"
  required
/>

          <button type="submit" className="p-2 m-2 rounded-md bg-sky-900 w-[50%] mx-auto text-sm md:text-xl">
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default Create;
