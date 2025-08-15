import { MemoryRouter, useLocation } from 'react-router';
import { describe, expect, test } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { NavigationMenu } from '../../components/NavigationMenu';

function RoutePathDisplay() {
    const location = useLocation();
    return <span data-testid="display-path">{location.pathname}</span>
}

describe('Render navigation menu', () => {
    test('Default render', async () => {
        render(
            <MemoryRouter>
                <NavigationMenu />
                <RoutePathDisplay />
            </MemoryRouter>
        );

        await screen.findByText('audio');

        const pathDisplay = screen.getByTestId("display-path");
        const items = screen.getAllByRole('menuitem');

        expect(items).toHaveLength(6);
        expect(pathDisplay.textContent).toBe('/products');

        for(const item of items) {
            fireEvent.click(item);
            const path = item.textContent === 'all' ? '/products': '/categories/' + item.textContent;
            expect(pathDisplay.textContent).toBe(path);
        }
    });    
});
