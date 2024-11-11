import React, { useEffect, useState, useContext } from "react";
import assets from "../assets/assets";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../Context/UserContext";


function Home() {
  const [cookies, removeCookie] = useCookies([]);
  const { user, setUser } =useContext(UserContext);// Access user from context
  const [products, setProductsLocal] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.token) {
      navigate("/login");
    } else if (user) {
      // Fetch products using the user's ID
      axios
        .get(`http://localhost:3000/products/user/${user._id}`, { withCredentials: true })
        .then((result) => {
          console.log("API Result:", result);
          setProductsLocal(result.data.data); // Set products to local state
        })
        .catch((err) => console.log("Error fetching products:", err));
    }
  }, [cookies, navigate, user]);

  const onDeleteHandler = (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      axios
        .delete(`http://localhost:3000/products/${id}`, { withCredentials: true })
        .then(() => {
          setProductsLocal(products.filter((product) => product._id !== id)); // Update local state
        })
        .catch((err) => console.log(err));
    }
  };

  const Logout = () => {
    removeCookie("token");
    navigate("/signup");
  };

  return (
    <div className={`h-fit bg-gray-950 grid md:grid-cols-2 lg:grid-cols-3 p-4 mx-auto`}>
      <button onClick={Logout}>Logout</button>
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
  );
}

export default Home;