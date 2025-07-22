import { } from 'react';
import { RouterProvider } from 'react-router';
import { Button, Col, Layout, Row, theme } from 'antd';
import { MehOutlined } from '@ant-design/icons';
import './App.css';
import { NavigationMenu } from './components/NavigationMenu';
import router from './routes';

const { Content, Footer, Header, Sider } = Layout;

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
                <Sider>
                    <NavigationMenu></NavigationMenu>
                </Sider>
                <Content style={{ overflowY: 'auto' }}>
                    <RouterProvider router={ router }></RouterProvider>
                </Content>
            </Layout>
        </Layout>
    );
}

export default App;
