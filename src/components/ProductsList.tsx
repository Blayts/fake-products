import { useNavigate } from 'react-router';
import { List } from 'antd';
import { ProductItem } from './ProductItem';
import { useProducts } from '../hooks/useProducts';

export function ProductsList() {
    const { products, loading } = useProducts();
    const navigate = useNavigate();

    function handleClick(id: number) {
        navigate('/product/' + id);
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
