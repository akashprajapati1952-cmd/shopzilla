import { createSelector } from "@reduxjs/toolkit";
import type { State } from "../store";

export const userSelector=(state: State)=>state.user;

export const cartSelector=createSelector(userSelector,(user)=>user.cart)

export const usernameSelector=createSelector(userSelector,(user)=>user.username)

export const userEmailSelector=createSelector(userSelector,(user)=>user.userEmail)

export const axiosAlertSelector=(state: State)=>state.user.error

export const userLoadingSelector=(state: State)=>state.user.loading