import React, { useState, useEffect } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { AiOutlineDashboard, AiOutlineUserSwitch,AiOutlineShoppingCart } from 'react-icons/ai';
import { Outlet } from "react-router-dom";
import { Layout, Menu, theme } from 'antd';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import Logout from './Logout';

const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [clients, setClients] = useState([]);
  // const [token, setToken] = useState('');
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = token;
    console.log(accessToken)
    const baseUrl = `http://216.230.74.17:8013/api/Client`;
    axios
      .get(baseUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setClients(res?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  const clientItems = clients?.map((c) => ({
    value: c?.uniqueid,
    label: c?.clientname,
  }));
  
  

  const menuItems = [
    {
      key: 'clientid',
      label: 'SelectClient',
      children: clientItems,
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
    {
      key: 'user',
      icon: <AiOutlineUserSwitch />,
      label: 'user',
    },
  ];

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
            if (key === 'logout') {
              // handle logout
            } else if (key.startsWith('clientItems-')) {
              // do nothing if client name is clicked
              return;
            } else {
              navigate(key);
            }
          }}
  

          items={menuItems}
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
