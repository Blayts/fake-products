import { useParams } from 'react-router';
import { Card, Col, Image, Row } from 'antd';
import { useProduct } from '../hooks/useProducts';

export function CardProduct() {
    const { id } = useParams();
    const { loading, product } = useProduct(id!);

    return (
        <Card loading={loading} style={{ height: '100%' }}>
            <Row>
                <Col span={6}>
                    <Image src={product.image}></Image>
                </Col>
                <Col offset={1} span={17}>
                    <h3>{product.title}</h3>
                    <p>{product.description}</p>
                    <h4>Color: <span>{product.color}</span></h4>
                    <h4>Price: {product.price}cu</h4>
                </Col>
            </Row>
        </Card>
    );
}
