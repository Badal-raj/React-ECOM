import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { ProductPage } from "./product";
import { handlefetchAllProduct } from "../../redux/features/product/productSlice";
import { deleteProduct } from "../../redux/features/product/deleteProductSlice";
import { searchProduct } from "../../redux/features/searchProduct/searchProductSlice";

export const Product = () => {
  const dispatch = useDispatch();

  const { allProduct, loginData} = useSelector((state)=>state);
  const {error} = allProduct;
  const {token} = loginData;

  const [fields, setFields] = useState({
    search: "",
  });

  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const getProduct = async() => {
   const resultantData  = await dispatch(handlefetchAllProduct(token));
   if (resultantData && resultantData.meta.requestStatus === "fulfilled") {
    setAllProducts(resultantData.payload.result);
    setFilteredProducts(resultantData.payload.result);
  } else {
   // toast.error(resultantData.payload);
  }
  };

  useEffect(() => {
    getProduct();
  }, []);

  // useEffect(() => {
  //   if (error) {
  //     toast.error(error);
  //   }
  // }, [error]);

  const handleDeleteProduct = async (id) => {
    try {
      const dataresult = await dispatch(deleteProduct({productId: id, authToken: token}));
      //here we are handling the success case
      if (dataresult && dataresult.meta.requestStatus === "fulfilled") {
        toast.success(dataresult.payload.message);
        getProduct();
      } else {
        toast.error(dataresult.payload);
      }
    } catch (error) {
      console.error(error);
    }
  };


  //***********handle search using search api

  // const handleSearch = async (event) => {
  //   const { name, value } = event.target;
  //   if(fields[name]){
  //     const resultData = await dispatch(searchProduct({searchCriteria: value, authToken: token}))
  //     if (resultData && resultData.meta.requestStatus === "fulfilled") {
  //       setAllProducts(resultData.payload.result);
  //     }
  //   }else{
  //     getProduct();
  //   }
  //   setFields((prev) => ({ ...prev, [name]: value }));
  // };

  //*********handle search widthout api call only stored data

  const handleSearch = (event) => {
    const { name, value } = event.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (value) {
      // Filter products based on search term (search by name or price)
      const filteredProduct = filteredProducts.filter((data) =>
        data.name.toLowerCase().includes(value.toLowerCase()) ||
        data.price.toString().includes(value)
      );
      setAllProducts(filteredProduct); // Update the filtered list
    } else {
      // If search field is cleared, reset to the original list
      setAllProducts(filteredProducts); // Reset the filtered products to the full list
    }
  };

  return (
    <>
      <ProductPage
        fields={fields}
        productList={allProducts}
        handleDeleteProduct={handleDeleteProduct}
        handleChange={handleSearch}
      />
    </>
  );
};
