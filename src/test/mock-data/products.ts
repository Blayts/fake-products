import type { ProductValue } from '../../types/product';

function createProduct(n: number): ProductValue {
    return {
        id: n,
        title: 'Title #' + n,
        image: 'Image #' + n,
        price: 100 * n,
        description: 'Descritpion #' + n,
        brand: 'Brand #' + n,
        model: 'Model #' + n,
        color: 'Color #' + n,
        category: 'Category #' + n,
        discount: 15 + 10 * n
    };
}

export const products = [
    createProduct(1),
    createProduct(2),
    createProduct(3),
    createProduct(4),
    createProduct(5)
];