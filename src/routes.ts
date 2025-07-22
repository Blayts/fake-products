import { createBrowserRouter } from "react-router";
import { ProductsList } from './components/ProductsList';
import { CardProduct } from './components/CardProduct';
import { NotFound } from './components/NotFound';

export default createBrowserRouter([    
    {
        index: true,
        path: '/',
        Component: ProductsList,
    },
    {
        path: 'product/:id',
        Component: CardProduct
    },
    {
        path: '*',
        Component: NotFound
    }
])