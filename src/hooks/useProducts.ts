import { useCallback, useEffect, useState } from 'react';
import { useFetch } from './useFetch';
import { BASE_API, LIMIT_ON_PAGE } from '../constants/base';
import type { ProductResponse, ProductValue, ProductsResponse } from '../types/product';

const API = BASE_API + '/products';

export function useProduct(id: number | string) {
    const loader = useCallback(() => fetch(API + `/${id}`), [id]);
    const { data, error, loading } = useFetch<ProductResponse>(loader);
    const [product, setProduct] = useState<ProductValue | Record<string, any>>({});

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
        const params = new URLSearchParams({ 
            limit: LIMIT_ON_PAGE.toString(),
        });

        let path = API;

        if(category) {
            path += '/category';
            params.set('limit', (LIMIT_ON_PAGE * page).toString());
            params.set('type', category);
        }
        else {
            params.append('page', page.toString());
        }

        return path + '?' + params;
    }

    useEffect(() => {
        const tout = setTimeout(() => setPath(getPath()), 100);

        return () => clearTimeout(tout);
    }, [category, page]);

    useEffect(() => {
        if(!data) {
            return;
        }
        
        if(category || page === 1) {
            setProducts(data.products);
        }
        else {
            setProducts([...products, ...data.products]);
        }
    }, [data]);
    
    return { error, loading, products };
}