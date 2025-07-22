import { Card } from 'antd';

export function ProductItem({ product }: any) {
    return (
        <Card 
            cover={ <img src={ product.image } /> } 
            hoverable
            style={{ width: 240 }}
        >
            <Card.Meta title={ product.model } description={ product.title }></Card.Meta>
        </Card>
    )
}