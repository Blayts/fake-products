import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { products } from '../../mock-data/products';
import { ProductItem } from '../../../components/products/ProductItem';

describe('Render product item', () => {    
    test('Snapshot test', async () => {        
        const component = render(
            <ProductItem onClick={() => {}} product={products[0]}></ProductItem>
        );

        await screen.findByText(products[0].title);

        expect(component.container).toMatchSnapshot();
    })
})