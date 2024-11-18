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
    console.log("Token:", cookies.token); // Debugging token value
    if (!cookies.token) {
      console.log("No token found, navigating to login...");
      navigate("/");
      return;
    }
    const fetchData = async () => {
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
  }, [cookies.token, navigate,removeCookie]);
  
  


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
  const handleLogout = () => {
    removeCookie("token");
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="h-[90vh]  ">
    <div className={`h-fit ${color} py-16`}>
     
      
      <ToastContainer />
      <div className="flex justify-end mr-8 items-center mx-auto"><img
            src={assets.add}
            alt="add"
            onClick={() => navigate("/create")}
            className="bg-slate-400 w-6 cursor-pointer "
          />
            <button onClick={handleLogout} className="text-white p-1 m-4 bg-red-500 rounded ">
        Logout
      </button>
          </div>
      
    <div className="grid md:grid-cols-2 lg:grid-cols-3 py-12 mx-auto  gap-3">
   
      {products.length > 0 ? (
        products.map((product) => (
          <div
            key={product._id}
            className="w-[100%] p-4 my-2 mx-auto text-sky-500 text-center font-bold flex flex-col items-center justify-center"
          >
            <img
              src={`http://localhost:3000/uploads/${product.image}`}
              alt={product.name}
              className="bg-white w-[200px] h-[200px] rounded-lg"
            />
            {console.log(product.image)}
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
        <h1 className="text-white text-center text-2xl h-[90vh]">No products available</h1>
      )}
    </div>
    </div>
    </div>
  );
}

export default Home;
