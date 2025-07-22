import { Menu } from 'antd';

export function NavigationMenu() {
    const items = ['menu1', 'menu2', 'menu3'];

    return (
        <Menu 
            items={ items.map((item) => ({ key: item, label: item })) }
            mode="inline" 
            style={{ height: '100%' }}
        >
        </Menu>
    )
}