import React, { useEffect, useState } from "react";
import assets from "../assets/assets";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

import  axios from "axios";

function Home() {

  const [cookies,removeCookie]=useCookies([]);

  const [products, setProducts] = useState([]);
  
  const navigate = useNavigate();


  
  useEffect(() => {
    if(!cookies.token){
      navigate('/login');
     }
    axios
      .get("http://localhost:3000/products",{withCredentials:true,})
      .then((result) => {
        console.log("API Result:", result);
        setProducts(result.data.data);
      })
      .catch((err) => console.log("Error fetching products:", err));
  }, [cookies, navigate, removeCookie]);
  const onDeleteHandler = (id) => {
    if (confirm("Are you Sure delete This Product")) {
      axios
        .delete("http://localhost:3000/products/" + id)
        .then((res) => {
          console.log(res);
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };
  const Logout = () => {
    removeCookie("token");
    navigate("/signup");
  }
  return (
    <div
      className={`h-fit bg-gray-950 grid md:grid-cols-2 lg:grid-cols-3 p-4 mx-auto`}
      
    >
      <button onClick={Logout}>logout</button>
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
              <button
                onClick={(e) => {
                  onDeleteHandler(product._id);
                }}
              >
                <img src={assets.delet} alt="delete" className="w-5" />
              </button>
            </div>
          </div>
        ))
      ) : (
        <h1 className="text-white text-center text-2xl">
          No products available
        </h1>
      )}
    </div>
  );
}

export default Home;
