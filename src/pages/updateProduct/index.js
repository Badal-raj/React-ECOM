import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { UpdateProductPage } from "./updateProduct";
import { emptyFields } from "../../constants/messages";
import { handleSingleProductDetail } from "../../redux/features/singleProductDetail/singleProductDetailSlice";
import { handleProductUpdate } from "../../redux/features/updateProduct/updateProductSlice";

export const UpdateProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { loginData } = useSelector((state)=>state);
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

  const handleProductData = async () => {
    const details = await dispatch(handleSingleProductDetail({productId: id, authToken: token}));
    if (details.meta.requestStatus === "fulfilled") {
         const {name,price, catogry , company} = details.payload.result
      setFields({
        name: name,
        price: price,
        catogry: catogry,
        company: company,
      });
    } else {
      toast.error(details.payload.message);
      handleResetFields();
    }
  };

  useEffect(() => {
    if (id !== ":id") {
      handleProductData();
    }
  }, [id]);

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

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (formValidation()) {
        if(id !== ":id"){
          let updateProductData = {id: id, productData: fields, authToken: token}
          try{
              const result = await dispatch(handleProductUpdate(updateProductData));
           if (result && result.meta.requestStatus === "fulfilled") {
               toast.success(result.payload.message);
             }else{
                toast.error(result.payload.message);
             }
          }catch(err){
           console.log(err);
           
          }
        }else{
            toast.error("Incorrect User Id");
        }
    }
  };

  return (
    <UpdateProductPage
      fields={fields}
      errors={errors}
      handleChange={handleChange}
      handleUpdateProduct={handleUpdateProduct}
    />
  );
};
