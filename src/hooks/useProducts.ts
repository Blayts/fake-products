import { useCallback, useEffect, useState } from 'react';
import { useFetch } from './useFetch';
import { BASE_API, LIMIT_ON_PAGE } from '../constants';

type ProductValue = Record<string, any>;
type ProductResponse = {
    message: string;
    product: ProductValue;
    status: string;
};
type ProductsResponse = {
    message: string;
    products: ProductValue[];
    status: string;
};

const API = BASE_API + '/products';

export function useProduct(id: number | string) {
    const loader = useCallback(() => fetch(API + `/${id}`), [id]);
    const { data, error, loading } = useFetch<ProductResponse>(loader);
    const [product, setProduct] = useState<ProductValue>({});

    useEffect(() => {
        if(data) {
            setProduct(data.product);
        }        
    }, [data]);

    return { error, loading, product };
}

export function useProducts(category: string = '', page: number = 1) {
    const [path, setPath] = useState(getPath);
    const [products, setProducts] = useState<ProductValue[]>([]);

    const loader = useCallback(() => fetch(path), [path]);

    const { data, error, loading } = useFetch<ProductsResponse>(loader);

    function getPath() {
        const path = API + (category ? '/category': '');
        const params = new URLSearchParams({ 
            limit: LIMIT_ON_PAGE.toString(), 
            page: page.toString()
        });

        if(category) {
            params.append('type', category);
        }
        return path + '?' + params;
    }

    useEffect(() => {
        const tout = setTimeout(() => setPath(getPath()), 100);

        return () => clearTimeout(tout);
    }, [category, page]);

    useEffect(() => {
        if(data) {
            setProducts(data.products);
        }        
    }, [data]);
    
    return { error, loading, products };
}