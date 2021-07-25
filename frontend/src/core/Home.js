import React , { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";

export default function Home() {
  //console.log("API IS", API);

  //products to get in cards on home page
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  //loads all products to state
  const loadAllProduct = () => {
    getProducts().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProduct();
  }, []);
  
  return (
    <Base title="Home Page" description="Welcome to the Book Store">
      <div className="row text-center">
        <h1 className="text-white">All of Books</h1>
        <div className="row">
          {products.map((product, index) => {
            return (
              <div key={index} className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                <Card product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
}


