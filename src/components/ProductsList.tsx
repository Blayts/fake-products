import { useNavigate, useLocation, useParams } from 'react-router';
import { List } from 'antd';
import { ProductItem } from './ProductItem';
import { useProducts } from '../hooks/useProducts';

export function ProductsList() {
    const { category } = useParams();
    const { products, loading } = useProducts(category);
    const navigate = useNavigate();
    const { pathname } = useLocation();

    function handleClick(id: number) {
        navigate(pathname + '/product/' + id);
    }

    return (
        <List loading={ loading }>
            {products.map((product) => (
                <List.Item key={product.id} onClick={ () => handleClick(product.id) } style={{ justifyContent: 'center' }}>
                    <ProductItem product={ product }></ProductItem>
                </List.Item>
            ))}
        </List>
    );
}
