import { useNavigate, useParams } from 'react-router';
import { Button, Card, Col, Image, Row } from 'antd';
import { useProduct } from '../hooks/useProducts';

export function CardProduct() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { loading, product } = useProduct(id!);

    function goBack() {
        navigate(-1);
    }

    return (
        <Card loading={ loading } style={{ height: '100%' }}>
            <Row>
                <Col span={ 6 }>
                    <Image src={ product.image }></Image>
                </Col>
                <Col offset={ 1 } span={ 17 }>
                    <h3>{ product.title }</h3>
                    <p>
                        { product.description }
                    </p>
                    <h4>Color: { product.color }</h4>
                    <h4>Price: { product.price }cu</h4>
                </Col>
            </Row>
            <Row>
                <Button onClick={ goBack }>Go back</Button>
            </Row>
        </Card>
    )
}