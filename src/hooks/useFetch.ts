import { useEffect, useState } from 'react';

export function useFetch<T>(loader: () => Promise<Response>) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetching() {
            setError('');
            setLoading(true);

            try {
                const response = await loader();
                const json = await response.json();
                setData(json);
            }
            catch(e: any) {
                setError(e.message);
            }
            finally {
                setLoading(false);
            }
        }
        fetching();
    }, [loader]);    

    return { data, error, loading };
}