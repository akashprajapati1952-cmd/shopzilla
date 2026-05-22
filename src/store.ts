import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./sagas";
import userReducer from "./reducers/userDetails";
import productReducer from "./reducers/product";
import couponReducer from "./reducers/coupons";

const sagaMiddleware = createSagaMiddleware();

const store=configureStore ({
    reducer:{
        user: userReducer,
        products: productReducer,
        coupon: couponReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
    devTools: import.meta.env.DEV,
})

sagaMiddleware.run(rootSaga);

export type State = ReturnType<typeof store.getState>;

export default store;