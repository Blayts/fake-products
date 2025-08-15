import { MemoryRouter } from 'react-router';
import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { products } from '../../mock-data/products';
import { ProductsList } from '../../../components/products/ProductsList';

describe('Render product list', () => {    
    test('Snapshot test', async () => {        
        const component = render(
            <MemoryRouter>
                <ProductsList />
            </MemoryRouter>
        );

        await screen.findByText(products[0].title);

        expect(component.container).toMatchSnapshot();
    })
})