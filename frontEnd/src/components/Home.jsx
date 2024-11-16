import React, { useEffect, useState } from "react";
import assets from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useColor } from "../Context/ColorContextProvider";

function Home() {
  const {color}=useColor();
  const [cookies, removeCookie] = useCookies([]);
  const [products, setProductsLocal] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      // if (!cookies.token) {
      //   navigate("/login");
      // }
      try {
        const result = await axios.get("http://localhost:3000/products/user", {
          withCredentials: true,
        });
        console.log("API Result:", result); // Check API response
        setProductsLocal(result.data.data); // Set products to local state
      } catch (err) {
        console.error("Error fetching products:", err);
        toast.error("Failed to load products. Please try again.");
      }
    };

    fetchData();
  }, [cookies,navigate,removeCookie]);


  // Delete a product
  const onDeleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:3000/products/${id}`, {
          withCredentials: true,
        });
        // Update local state after deletion
        setProductsLocal((prevProducts) => prevProducts.filter((product) => product._id !== id));
        toast.success("Product deleted successfully");
      } catch (err) {
        console.error("Error deleting product:", err);
        toast.error("Failed to delete product. Please try again.");
      }
    }
  };

  // Logout function
  const handleLogout = () => {
    removeCookie("token");
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="h-[90vh]">
    <div className={`h-fit ${color}`}>
     
       <button onClick={handleLogout} className="text-white p-2 m-4 bg-red-500 rounded ">
        Logout
      </button>
      <ToastContainer />
     
    <div className="grid md:grid-cols-2 lg:grid-cols-3 p-4 mx-auto">
   
      {products.length > 0 ? (
        products.map((product) => (
          <div
            key={product._id}
            className="w-[100%] p-4 my-2 mx-auto text-sky-500 text-center font-bold flex flex-col items-center justify-center"
          >
            <img
              src={product.image}
              alt={product.name}
              className="bg-white w-[200px] h-[200px] rounded-lg"
            />
            <div className="flex gap-2 items-center justify-center">
              <p className="p-2">{product.name}</p>
              <p>{product.price} $</p>
            </div>
            <div className="flex gap-2 items-center justify-center my-2">
              <Link to={`/update/${product._id}`}>
                <img src={assets.edit} alt="edit" className="w-5" />
              </Link>
              <button onClick={() => onDeleteHandler(product._id)}>
                <img src={assets.delet} alt="delete" className="w-5" />
              </button>
            </div>
          </div>
        ))
      ) : (
        <h1 className="text-white text-center text-2xl">No products available</h1>
      )}
    </div>
    </div>
    </div>
  );
}

export default Home;
