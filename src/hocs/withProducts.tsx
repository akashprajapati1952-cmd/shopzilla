import { useDispatch, useSelector } from "react-redux";
import type { Product } from "../types";
import { cartSelector } from "../selectors/user";
import { productsSelector } from "../selectors/product";
import { productDetail } from "../apis_&_contexts/Api";
import React, { useDebugValue, useEffect, useState } from "react";
import { loadProductsAction } from "../reducers/product";

export interface WithProductsProps {
    products: Product[];
    loading: boolean
}

const withProducts = <Props extends WithProductsProps>(
    Component: React.ComponentType<Props>
) => {
    return (props: Omit<Props, keyof WithProductsProps>): React.JSX.Element => {
        const cart = useSelector(cartSelector);
        const products = useSelector(productsSelector);
        const dispatch= useDispatch()
        
        // 1. Create a local state to hold the resolved array of products
        const [resolvedProducts, setResolvedProducts] = useState<Product[]>([]);
        const [isLoading, setIsLoading]=useState(true)

        // 2. Isolate the async operations inside a useEffect hook
        useEffect(() => {
            const fetchCartProducts = async () => {
                try {
                    if(products.length < 5){
                        dispatch(loadProductsAction(""))
                    }
                    const cartProductsPromises = Object.keys(cart ?? {}).map(async (id) => {
                        const product = products.find((p: Product) => p.id === +id);
                        if (!product) {
                            const product2 = await productDetail(+id);
                            return product2;
                        }
                        return product;
                    });
                

                    const finalProducts = await Promise.all(cartProductsPromises);
                    setResolvedProducts(finalProducts);
                }catch(error){console.log(error)
                }finally{ setIsLoading(false)};

            }
            fetchCartProducts();
        }, [cart, products]); // Re-run whenever cart or cached products change

        // 3. Cast the combined properties safely to the expected Props type
        const componentProps = {
            ...props,
            products: resolvedProducts,
            loading: isLoading
        } as unknown as Props;

        // 4. Always return a valid JSX element synchronously
        return <Component {...componentProps} />;
    };
};

export default withProducts;
