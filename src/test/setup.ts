import { afterEach, afterAll, beforeAll, vi } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { BASE_API } from '../constants/base';
import { categories } from './mock-data/categories';
import { products } from './mock-data/products';
import type { CategoryResponse } from '../types/category';
import type { ProductResponse, ProductsResponse } from '../types/product';

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn()        
    })),
});

const API = BASE_API + '/products';

export const handlers = [
    http.get(API, () => {
        const response: ProductsResponse = {
            message: 'Message',
            products,
            status: 'Successfully'
        }
        return HttpResponse.json(response)
    }),
    http.get(API + '/category', () => {
        const response: CategoryResponse = {
            message: 'Message',
            categories,
            status: 'Successfully'
        }
        return HttpResponse.json(response)
    }),
    http.get(API + '/:id', () => {
        const response: ProductResponse = {
            message: 'Message',
            product: products[0],
            status: 'Successfully'
        }
        return HttpResponse.json(response);
    }),
]

const server = setupServer(...handlers)

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

// Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test for test isolation
afterEach(() => server.resetHandlers())
