import * as Router from 'react-router';
import { MemoryRouter } from 'react-router';
import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NavigationBreadcrumb } from '../../components/NavigationBreadcrumb';

function renderComponent(routeParams?: Record<string, any>) {
    if(routeParams) {
        vi.spyOn(Router, 'useParams').mockReturnValue(routeParams);
    }

    render(
        <MemoryRouter>
            <NavigationBreadcrumb />
        </MemoryRouter>
    );
}

describe('Render navigation breadcrumb', () => {
    test('Without parameters', () => {
        renderComponent();

        const href = screen.getByRole('link').getAttribute('href');

        expect(href).toBe('/products');
    });
    test('With id', async () => {
        renderComponent({ id: '1' });

        const links = screen.getAllByRole('link');
        const href = links[links.length - 1].getAttribute('href');

        expect(href).toBe('/products/product/1');
    });
    test('With category', async () => {
        renderComponent({ category: 'audio' });

        const links = screen.getAllByRole('link');
        const href = links[links.length - 1].getAttribute('href');

        expect(href).toBe('/categories/audio');
    });
    test('With category and id', async () => {
        vi.spyOn(Router, 'useParams').mockReturnValue({
            category: 'audio',
            id: '1',
        });

        renderComponent({ category: 'audio', id: '1' });

        const links = screen.getAllByRole('link');
        const href = links[links.length - 1].getAttribute('href');

        expect(href).toBe('/categories/audio/product/1');
    });
});
