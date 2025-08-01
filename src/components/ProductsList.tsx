import { useCallback, useEffect, useRef, useState } from 'react';
import type { UIEvent } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router';
import { Alert, List } from 'antd';
import { ProductItem } from './ProductItem';
import { LIMIT_PAGES } from '../constants';
import { useProducts } from '../hooks/useProducts';
import { debounce } from '../utils';
import './ProductsList.css';

export function ProductsList() {
    const { category } = useParams();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    
    const [scrollValue, setScrollValue] = useState(1);
    const [page, setPage] = useState(1);
    const { products, loading } = useProducts(category, page);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const changePage = useCallback(
        debounce(() => setPage((page) => page + 1), 500),
        []
    );

    function handleClick(id: number) {
        navigate(pathname + '/product/' + id);
    }

    function handleScroll(e: UIEvent<HTMLDivElement>) {
        if (loading || page >= LIMIT_PAGES) {
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
        setPage(1);
        wrapperRef.current?.scrollTo({ top: 0 });
    }, [pathname]);

    return (
        <div className="products-wrapper" onScroll={handleScroll} ref={ wrapperRef }>
            <List loading={loading}>
                {products.map((product) => (
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
