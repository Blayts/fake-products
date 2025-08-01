import { } from 'react';
import { Outlet } from 'react-router';
import { Col, Layout, Row, theme } from 'antd';
import { MehOutlined } from '@ant-design/icons';
import './App.css';
import { NavigationBreadcrumb } from './components/NavigationBreadcrumb';
import { NavigationMenu } from './components/NavigationMenu';

const { Content, Header, Sider } = Layout;

function App() {
    const { token } = theme.useToken();

    return (
        <Layout>
            <Header style={{ color: token.colorBgContainer }}>
                <Row align="middle" justify="space-between">
                    <Col>App Products for free</Col>
                    <MehOutlined style={{ cursor: 'pointer', fontSize: '1.5rem' }} />
                </Row>
            </Header>
            <Layout style={{ flex: 1 }}>
                <Sider collapsible>
                    <NavigationMenu></NavigationMenu>
                </Sider>
                <Content>
                    <NavigationBreadcrumb></NavigationBreadcrumb>             
                    <Outlet></Outlet>
                </Content>
            </Layout>
        </Layout>
    );
}

export default App;
