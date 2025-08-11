import { useCallback, useEffect, useState } from 'react';
import { useFetch } from './useFetch';
import { BASE_API } from '../constants/base';
import type { CategoryResponse, CategoryValue } from '../types/category';

const API = BASE_API + '/products/category';

export function useCategories() {
    const loader = useCallback(() => fetch(API), []);
    const { data, error, loading } = useFetch<CategoryResponse>(loader);
    const [categories, setCategories] = useState<CategoryValue[]>([]);

    useEffect(() => {
        if(data) {
            setCategories(data.categories);
        }        
    }, [data]);
    
    return { error, loading, categories };
}