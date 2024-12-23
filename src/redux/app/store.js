import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // This uses localStorage by default

import registrationReducer from "../features/registration/registrationSlice";
import loginReducer from "../features/login/loginSlice";
import addProductReducer from "../features/addProduct/addProductSlice";
import allProductReducer from "../features/product/productSlice";
import deleteProductReducer from "../features/product/deleteProductSlice";
import singleProductReducer from "../features/singleProductDetail/singleProductDetailSlice";
import updateProductReducer from "../features/updateProduct/updateProductSlice";
import uploadProfileReducer from "../features/uploadProfilePic/uploadProfileSlice";
import userDetailSlice from "../features/uploadProfilePic/fetchUserDetaiSlice";

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'], // Only persist 'token' slice, not the entire auth state
};

const persistedAuthReducer = persistReducer(persistConfig, loginReducer);

const Store = configureStore({
  reducer: {
    loginData: persistedAuthReducer,
    registeredData: registrationReducer,
    addedProduct: addProductReducer,
    allProduct: allProductReducer,
    deletedProduct: deleteProductReducer,
    singlePoductDeatil: singleProductReducer,
    updatedData: updateProductReducer,
    profilePicData: uploadProfileReducer,
    userDetails: userDetailSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

const persistor = persistStore(Store);

export { Store, persistor };
