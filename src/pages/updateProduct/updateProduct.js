import React from "react";

import { TextBox, Button } from "../../components/common";

export const UpdateProductPage = ({
    fields,
    errors,
    handleChange,
    handleUpdateProduct
}) => {
  return (
    <>
      <div className="product-container d-flex">
        <div className="body-container no-overflow bg-white">
          <h5 className="d-flex ms-3 py-2 mt-3 e-comm-style">
           Update Product
          </h5>
          <div className="form-container">
            <div className="my-2 mx-3">
              <TextBox
                name="name"
                type="text"
                id="name_id"
                className="form-control"
                placeholder="Name"
                label="Product Name*"
                value={fields.name}
                error={errors?.name}
                onChange={handleChange}
              />
            </div>
            <div className="my-2 mx-3">
              <TextBox
                name="price"
                type="text"
                id="price_id"
                className="form-control"
                placeholder="Price"
                label="Price"
                value={fields.price}
                onChange={handleChange}
              />
            </div>
            <div className="my-2 mx-3">
              <TextBox
                name="catogry"
                type="text"
                id="catogry_id"
                className="form-control"
                placeholder="Catogry"
                label="Catogry"
                value={fields.catogry}
                onChange={handleChange}
              />
            </div>
            <div className="my-2 mx-3">
            <TextBox
                name="company"
                type="text"
                id="company_id"
                className="form-control"
                placeholder="Company"
                label="Company"
                value={fields.company}
                onChange={handleChange}
              />
            </div>
            <div className="my-2 mx-3">
              <Button
                className="button-style w-100 my-2"
                onClick={handleUpdateProduct}
              >
                Update Product
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
