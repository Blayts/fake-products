import * as Router from 'react-router';
import { MemoryRouter } from 'react-router';
import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { products } from '../../mock-data/products';
import { CardProduct } from '../../../components/products/CardProduct';

describe('Render card product', () => {    
    test('Snapshot test', async () => {        
        vi.spyOn(Router, 'useParams').mockReturnValue({ id: '1' });
        const component = render(
            <MemoryRouter>
                <CardProduct />
            </MemoryRouter>
        );

        await screen.findByText(products[0].title);

        expect(component.container).toMatchSnapshot();
    })
})