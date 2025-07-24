import { Menu, Skeleton } from 'antd';
import type { MenuProps } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { 
    AudioOutlined, 
    DesktopOutlined,
    QuestionOutlined,
    LaptopOutlined,
    MobileOutlined,
    ProductOutlined,
    RocketOutlined,
    ThunderboltOutlined
} from '@ant-design/icons';
import { useCategories } from '../hooks/useCategories';
import './NavigationMenu.css';

const itemAll = {
    key: 'all',
    label: 'all',
    icon: <ProductOutlined />,
};
const iconsCategory: Record<string, any> = {
    all: <ProductOutlined />,
    appliances: <ThunderboltOutlined />,
    audio: <AudioOutlined />,
    gaming: <RocketOutlined />,
    mobile: <MobileOutlined />,
    laptop: <LaptopOutlined />,
    tv: <DesktopOutlined />
};

export function NavigationMenu() {    
    const [items, setItems] = useState<MenuProps['items']>([]);    
    const [current, setCurrent]  = useState(itemAll.key);
    const navigate = useNavigate();
    const { categories, loading } = useCategories();

    const handleClickItem: MenuProps['onClick'] = ({ key }) => {
        setCurrent(key);
        toNextRoute(key);
    };

    function toNextRoute(key: string) {
        const nextPath = key === itemAll.key ? '/products': '/categories/' + key;
        navigate(nextPath);
    }

    useEffect(() => {
        const itemsCategory = categories.map((category) => ({
            key: category,
            label: category,
            icon: iconsCategory[category] ?? <QuestionOutlined />
        }));
        setItems([itemAll, ...itemsCategory]);
        toNextRoute(current);
    }, [categories]);

    return (
        <Skeleton 
            active            
            loading={ loading } 
            paragraph={{ rows: 6, width: '100%' }} 
            title={ false }
        >
            <Menu items={ items } onClick={ handleClickItem } selectedKeys={ [current] }></Menu>
        </Skeleton>
    );
}