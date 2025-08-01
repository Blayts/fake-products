import { useCallback, useEffect, useState } from 'react';
import type { UIEvent } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router';
import { Alert, List } from 'antd';
import { ProductItem } from './ProductItem';
import { LIMIT_PAGES } from '../constants';
import { useProducts } from '../hooks/useProducts';
import { debounce } from '../utils';

export function ProductsList() {
    const { category } = useParams();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    
    const [scrollValue, setScrollValue] = useState(1);
    const [page, setPage] = useState(1);
    const { products, loading } = useProducts(category, page);

    const [listProducts, setListProducts] = useState<any[]>([]);
    const productsById = listProducts.reduce((acc, p) => ({ ...acc, [p.id]: p }), {});

    const changePage = useCallback(
        debounce(() => {
            console.log("LOAD")
            setPage((page) => page + 1)
        }, 500),
        []
    );

    function handleClick(id: number) {
        navigate(pathname + '/product/' + id);
    }

    function handleScroll(e: UIEvent<HTMLDivElement>) {
        if (loading || page >= LIMIT_PAGES || category) {
            return;
        }

        const div = e.target as HTMLDivElement;
        const toBottom = div.scrollHeight - div.scrollTop - div.scrollWidth;

        if (scrollValue !== toBottom && toBottom < 300) {
            setScrollValue(toBottom);
            changePage();
        }
    }

    useEffect(() => {
        setListProducts([]);
        setPage(1);
    }, [pathname]);

    useEffect(() => {
        const newProducts = products.filter((p) => !productsById[p.id]);

        if(newProducts.length) {
            setListProducts([...listProducts, ...newProducts]);
        }
    }, [products]);

    return (
        <div className="products-wrapper" onScroll={handleScroll}>
            {category && (
                <Alert
                    message="Pagination not available"
                    showIcon
                    type="warning"
                ></Alert>
            )}
            <List loading={loading}>
                {listProducts.map((product) => (
                    <List.Item
                        key={product.id}
                    >
                        <ProductItem onClick={ () => handleClick(product.id) } product={product}></ProductItem>
                    </List.Item>
                ))}
            </List>
            {page === LIMIT_PAGES && (
                <Alert
                    message="The demo version limit has been reached"
                    showIcon
                    type="warning"
                ></Alert>
            )}
        </div>
    );
}
