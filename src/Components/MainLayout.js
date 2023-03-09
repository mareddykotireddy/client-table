import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { AiOutlineDashboard, AiOutlineUserSwitch,AiOutlineShoppingCart } from 'react-icons/ai';
import { Outlet } from "react-router-dom";
import { Layout, Menu, theme } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logout from './Logout';
// import Logout from './Components/Logout';



const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" >
          <h2>EARBOR</h2>
          
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['']}
          onClick={({ key }) => {
            if (key === "logout") {
            } else {
              navigate(key);
            }
            
          }}
          items={[
            {
              key: "SelectClient",
              label: "SelectClient",
            },
            
            {
              key: '',
              icon: <AiOutlineDashboard />,
              label: 'Dashboard',
            
            },
            {
              key: 'sku',
              icon: <VideoCameraOutlined />,
              label: 'sku',
            },
              // {
              //   key: 'cart',
              //   icon: <AiOutlineShoppingCart/>,
              //   label: 'cart',
              //   children:[
              //       {
              //       key: "Add product",
              //       icon:<AiOutlineShoppingCart/>,
              //       label:"product"
              //       }
              //   ]
              // },
            {
              key: 'user',
              icon: <AiOutlineUserSwitch />,
              label: 'user',
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
          <Logout />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;