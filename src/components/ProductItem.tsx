import { Card, Col, Row } from 'antd';

type ProductItemProps = {
    onClick(): void;
    product: any;    
};

export function ProductItem({ onClick, product }: ProductItemProps) {
    return (
        <Card 
            hoverable
            onClick={ onClick }
            style={{ width: '50%' }}
            title={ product.title }
        >
            <Row>
                <Col span={ 8 }>
                    <Row>
                        <img src={ product.image } style={{ width: '100%'}}></img>
                    </Row>                    
                </Col>
                <Col offset={ 1 } span={15} style={{ padding: '20px' }}>
                    <Row>
                        <b>Model: { product.model }</b>
                    </Row>
                    <Row>
                        <b>Color: { product.color }</b>
                    </Row>
                    <Row>
                        <b>Price: { product.price }cu</b>
                    </Row>
                </Col>
            </Row>
        </Card>
    )
}