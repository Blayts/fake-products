export type ProductValue = {
    id: number;
    title: string;
    image: string;
    price: number;
    description: string;
    brand: string;
    model: string;
    color: string;
    category: string;
    discount: number;
};
export type ProductResponse = {
    message: string;
    product: ProductValue;
    status: string;
};
export type ProductsResponse = {
    message: string;
    products: ProductValue[];
    status: string;
};
