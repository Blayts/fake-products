import { useCallback, useEffect, useState } from 'react';
import { useFetch } from './useFetch';
import { BASE_API } from '../constants';

type CategoryValue = string;
type CategoryResponse = {
    message: string;
    categories: CategoryValue[];
    status: string;
};

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