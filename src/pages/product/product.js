import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { TextBox } from "../../components/common";

export const ProductPage = ({fields, productList, handleDeleteProduct, handleChange }) => {

  return (
    <div className="product-list">
      <h5>Product List</h5>
      <div className="d-flex justify-content-center">
      <div className="my-3 ms-4 w-50">
              <TextBox
                name="search"
                type="text"
                id="search_id"
                className="form-control"
                placeholder="search product"
                label=""
                value={fields?.search}
                onChange={handleChange}
              />
            </div>
            </div>
      <ul>
        <li>S. No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Catogry</li>
        <li>Action</li>
      </ul>
      {
      productList && productList.length > 0 ?
        productList.map((item, index) => 
          <ul className="product-item-list" key={item._id}>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>${item?.price ? item?.price : 0}</li>
            <li>{item.catogry ? item.catogry : "NA"}</li>
            <li>
              <span className="custom-button" onClick={()=>handleDeleteProduct(item._id)}>Delete</span>
              <Link className="ms-3" to={`/dashboard/update/${item._id}`}>Edit</Link>
            </li>
          </ul>
        ) : <h6>No Result Found</h6>
        }
      {/* */}
    </div>
  );
};
