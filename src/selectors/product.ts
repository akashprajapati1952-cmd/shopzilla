import { createSelector } from "@reduxjs/toolkit";
import type { State } from "../store";


const productsMapSelector=(state:State)=>state.products.products

export const productsSelector=createSelector(productsMapSelector,(productsMap)=>Object.values(productsMap || {}))

export const responseDetailSelector=(state:State)=>state.products.responseDetail

export const loadingSelector=(state: State)=>state.products.loading

export const errorSelector=(state:State)=>state.products.error

export const productSelector=(state: State, productId: number)=>state.products.products[productId]
    
export const productLoadingSelector=(state: State, productId: number)=>state.products.productLoading[productId] ?? false

export const productErrorSelector=(state: State, productId: number)=>state.products.productError[productId]