import { createBrowserRouter, redirect } from "react-router";
import App from "./App";
import { ProductsList } from './components/ProductsList';
import { CardProduct } from './components/CardProduct';

export default createBrowserRouter([    
    {
        path: '/',
        Component: App,
        children: [
            {
                path: 'categories/:category',
                Component: ProductsList
            },
            {
                path: 'product/:id',
                Component: CardProduct
            },
            {
                path: 'products',
                Component: ProductsList
            },
            {
                path: '*',
                loader() {
                    return redirect('/products');
                }
            }
        ]
    },    
])