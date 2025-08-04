import { Outlet } from 'react-router';
import { Col, Layout, Row, theme } from 'antd';
import './App.css';
import { NavigationBreadcrumb } from './components/NavigationBreadcrumb';
import { NavigationMenu } from './components/NavigationMenu';
import { UserInfo } from './components/user/UserInfo';

const { Content, Header, Sider } = Layout;

function App() {
    const { token } = theme.useToken();

    return (
        <Layout>
            <Header style={{ color: token.colorBgContainer }}>
                <Row align="middle" justify="space-between">
                    <Col>Fake products for free</Col>
                    <Col>
                        <UserInfo></UserInfo>
                    </Col>
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
