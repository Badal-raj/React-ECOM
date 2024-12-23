import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { AddProductPage } from "./addProduct";
import { emptyFields } from "../../constants/messages";
import { handleaddProduct } from "../../redux/features/addProduct/addProductSlice";

export const AddProduct = () => {
  const userId = sessionStorage.getItem("user-id")
  const dispatch = useDispatch();
 // const { error } = useSelector((state) => state.addedProduct);

  const { addedProduct, loginData} = useSelector((state)=>state);
  const {error} = addedProduct;
  const {token} = loginData;

  const [fields, setFields] = useState({
    name: "",
    price: "",
    catogry: "",
    company: "",
  });
  const [errors, setErrors] = useState({
    name: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setErrors((prev) => ({ ...prev, [name]: !value ? emptyFields : "" }));
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  const formValidation = () => {
    let isFormValid = true;
    if (!fields.name) {
      errors.name = emptyFields;
      isFormValid = false;
    }
    setErrors({ ...errors });
    return isFormValid;
  };

  const handleResetFields = () => {
    setFields({
      name: "",
      price: "",
      catogry: "",
      company: "",
    });
  };

  useEffect(()=>{
    if(error){
        toast.error(error)
    }
  },[error])

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (formValidation()) {
        let addProductdata = {userId: userId, ...fields}
        try{
            const result = await dispatch(handleaddProduct({authToken: token, productData: addProductdata}));
         if (result && result.meta.requestStatus === "fulfilled") {
             handleResetFields();
             toast.success(result.payload.message);
           }
        }catch(err){
            console.log(err)
        }
   
    }
  };

  return (
    <AddProductPage
      fields={fields}
      errors={errors}
      handleChange={handleChange}
      handleAddProduct={handleAddProduct}
    />
  );
};
