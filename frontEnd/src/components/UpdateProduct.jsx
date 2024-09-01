import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateProduct() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productURL, setProductURL] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const result = await axios.get(`http://localhost3000/products/${id}`);
        console.log("API Result:", result.data);
        setProductName(result.data.data.name);
        setProductPrice(result.data.data.price);
        setProductURL(result.data.data.image);
      } catch (err) {
        console.log("Error fetching product:", err);
      }
    };

    fetchProduct();
  }, [id]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.put(`http://localhost:3000/products/${id}`, {
        name: productName,
        price: productPrice,
        image: productURL,
      });
      console.log(result);
      alert("Product Updated Successfully!!!");
      navigate("/home");
    } catch (err) {
      console.log("Error updating product:", err);
    }
  };

  return (
    <div className="bg-gray-950 h-[100vh] flex flex-col items-center justify-center ">
      <h2 className="text-sky-500 py-2 px-auto text-2xl">Update Product</h2>
      <div className="w-[30%] flex items-center justify-center mx-auto">
        <form
          onSubmit={onSubmitHandler}
          className="text-black flex flex-col justify-center py-10 my-4 mx-auto bg-slate-600 p-4 w-[1240px] h-[40vh] rounded-lg"
        >
          <input
            type="text"
            placeholder="Product Name"
            className="p-2 m-2 rounded-md outline-sky-600"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Product Price"
            className="p-2 m-2 rounded-md outline-sky-600"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
          <input
            type="url"
            placeholder="Image URL"
            className="p-2 m-2 rounded-md outline-sky-600"
            value={productURL}
            onChange={(e) => setProductURL(e.target.value)}
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
