import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Alert, Product } from "../types";
import type { AllData } from "../types/index";
import { schema, normalize } from "normalizr";

type ProductsState = {
  products: Record<number, Product>;
  responseDetail: {
    total: number;
    skip: number;
    limit: number;
  };
  productLoading: Record<number, boolean>;
  productError: Record<number, Alert | null>;
  loading: boolean;
  error: Alert | null;
};

const loadProducts=(state: ProductsState, action: PayloadAction<string>)=>{
    state.loading= true;
    state.error= null
}

const setProducts=(state: ProductsState, action: PayloadAction<AllData>)=>{
    state.loading= false;
    const products= action.payload.products
    const productSchema= new schema.Entity("products");
    const normalized= normalize(products, [productSchema]);
    state.products= normalized.entities.products!;
    state.responseDetail= {
        total: action.payload.total,
        skip: action.payload.skip,
        limit: action.payload.limit,
    };
}

const loadProductDetail=(state: ProductsState, action: PayloadAction<number>)=>{
    state.productLoading[action.payload]= true;
    state.productError[action.payload]= null;
}

const setProductDetail=(state: ProductsState, action: PayloadAction<Product>)=>{
    state.productLoading[action.payload.id]= false;
    state.products[action.payload.id]=action.payload
}

const setProductDetailError = (
  state: ProductsState,
  action: PayloadAction<{id: number; error: Alert}>
) => {
  state.productLoading[action.payload.id] = false;
  state.productError[action.payload.id] = action.payload.error;
};

const setError= (state: ProductsState, action: PayloadAction<Alert>)=>{
    state.loading= false;
    state.error= action.payload;
}

const initialState: ProductsState = {
    products: {} ,
    responseDetail: {total: 0, skip: 0, limit: 0} ,
    productLoading: {} ,
    loading: true,
    error: null,
    productError: {}
}
const productSlice= createSlice({
    name: "products",
    initialState,
    reducers: {
        loadProductDetail,
        loadProducts,
        setProductDetail,
        setProducts,
        setProductDetailError,
        setError
    },

})

const {actions, reducer: productReducer}= productSlice;
export const {
    loadProductDetail: loadProductDetailAction,
    loadProducts: loadProductsAction,
    setProductDetail: setProductDetailAction,
    setProducts: setProductsAction,
    setProductDetailError: setProductDetailErrorAction,
    setError: setErrorAction
}= actions;

export default productReducer;