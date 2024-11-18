import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useColor } from "../Context/ColorContextProvider";

function UpdateProduct() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productURL, setProductURL] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  const { color } = useColor();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const result = await axios.get(`http://localhost:3000/products/${id}`, {
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
  }, [id]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", productName);
    formData.append("price", productPrice);
    formData.append("image", productURL);

    try {
      const result = await axios.put(
        `http://localhost:3000/products/${id}`,
        formData,
        { withCredentials: true }
      );
      console.log("Update result:", result);
      toast.success("Product Updated Successfully!");
      navigate("/home");
    } catch (err) {
      console.log("Error updating product:", err);
      toast.error("Failed to update the product. Please try again.");
    }
  };

  return (
    <div className={`${color} h-[100vh] flex flex-col items-center justify-center`}>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
      <h2 className="text-sky-500 py-2 px-auto text-2xl">Update Product</h2>
      <div className="bg-cyan-400 flex justify-start mx-auto p-2 rounded">
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
      <div className="w-[30%] flex items-center justify-center mx-auto ">
        <form
          onSubmit={onSubmitHandler}
          className="text-black flex flex-col justify-center py-10 my-4 mx-auto bg-slate-600 p-4 w-[1240px] h-[40vh] rounded-lg"
        >
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            className="p-2 m-2 rounded-md outline-sky-600"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Product Price"
            name="price"
            className="p-2 m-2 rounded-md outline-sky-600"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
          
          <input
            type="file"
            name="image"
            className="p-2 m-2 rounded-md outline-sky-600"
            onChange={(e) => setProductURL(e.target.files[0])}
          />
          <button type="submit" className="p-2 m-2 rounded-md bg-sky-900">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProduct;
