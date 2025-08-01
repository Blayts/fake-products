import { Breadcrumb } from 'antd';
import { useParams, Link } from 'react-router';

export function NavigationBreadcrumb() {
    const { category, id } = useParams();
    const baseLink = category ? '/categories/' + category : '/products';
    const items = [
        {
            title: <Link to="/products">Products</Link>,
        },
    ];

    if (category) {
        items.push({
            title: (
                <Link to={baseLink} style={{ textTransform: 'capitalize' }}>
                    {category}
                </Link>
            ),
        });
    }

    if (id) {
        items.push({
            title: <Link to={baseLink + '/product/' + id}>Product</Link>,
        });
    }

    return <Breadcrumb items={items}></Breadcrumb>;
}
