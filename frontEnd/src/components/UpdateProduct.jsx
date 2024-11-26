import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useColor } from "../Context/ColorContextProvider";


function UpdateProduct() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productURL, setProductURL] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { color } = useColor();

  // Validate the id before making the API request
  useEffect(() => {
   console.log("id",id)

    const fetchProduct = async () => {
      try {
        const result = await axios.get(`https://product-store-with-mern-back2.onrender.com/products/${id}`, {
          withCredentials: true,
        });
        console.log("API Result:", result.data);
        setProductName(result.data.data.name);
        setProductPrice(result.data.data.price);
        setProductURL(result.data.data.image);
      } catch (err) {
        console.log("Error fetching product:", err);
        toast.error("Failed to fetch product details.");
      }
    };

    fetchProduct();
  }, [id, navigate]); // Include navigate as a dependency

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", productName);
    formData.append("price", productPrice);
    if (productURL) {
      formData.append("image", productURL);
    }

    try {
      const result = await axios.put(
        `https://product-store-with-mern-back2.onrender.com/products/${id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
      );
      console.log("Update result:", result);
      toast.success("Product Updated Successfully!");
      setProductName("");
        setProductPrice(0);
        setProductURL("");
      navigate("/home");
    } catch (err) {
      console.log("Error updating product:", err);
      toast.error("Failed to update the product. Please try again.");
    }
  };

  return (
    <div className={`${color} h-[90vh] flex flex-col items-center justify-center p-4 mx-auto`}>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
      <h2 className="text-sky-500 py-2 px-auto text-sm md:text-xl mt-8">Update Product</h2>
      <div className="bg-cyan-400 flex justify-start mx-auto p-2 rounded text-sm md:text-xl">
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
      <div className="w-[90%] flex items-center justify-center mx-auto ">
        <form
          onSubmit={onSubmitHandler}
          className="text-black flex flex-col justify-center py-10 my-4 mx-auto bg-slate-600 p-4 w-[50%] text-sm md:text-xl  "
        >
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            className="p-2 m-2  outline-sky-600 w-[90%]"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Product Price"
            name="price"
            className="p-2 m-2  outline-sky-600 w-[90%]"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
          <input
            type="file"
            name="image"
            className="p-2 m-2 outline-sky-600 w-[90%]"
            onChange={(e) => setProductURL(e.target.files[0])}
          />
          <div className="felx justify-center items-center mx-auto  w-[40%]">
          <button type="submit" className="p-2 m-2 rounded-md bg-sky-900">
            Update
          </button>
          </div>
       
        </form>
      </div>
    </div>
  );
}

export default UpdateProduct;
