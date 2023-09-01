import { Breadcrumb, Layout, Menu, message,Dropdown,Space, Avatar} from 'antd';
import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    TeamOutlined,
    UserOutlined,
    ExceptionOutlined,DollarCircleOutlined,DownOutlined,HeartTwoTone
} from '@ant-design/icons';
import { Link ,useNavigate,Outlet} from 'react-router-dom';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import "./layout.scss";
import { callLogout } from '../../services/api';
import { doLogoutAction } from '../../redux/account/accountSlice';
const {Sider,Content,Footer} = Layout
const items = [
    {
        label: <Link to="/admin">Dashboard</Link>,
        key: 'dashboard',
        icon: <AppstoreOutlined />
    },
    {
        label:<span>Manage Users</span>,
        key: 'user',
        icon:<UserOutlined />,
        children: [
            {
                label: <Link to='/admin/user'>CRUD</Link>,
                key: 'crud',
                icon:<TeamOutlined />,
            },
            {
                label: "Files1",
                key: 'files1',
                icon:<TeamOutlined />,
            },
        ]

    },
    {
        label: <Link to="/admin/book">Manage Book</Link>,
        key: 'book',
        icon: <ExceptionOutlined />
    },
    {
        label: <Link to="/admin/order">Manage Orders</Link>,
        key: 'order',
        icon: <DollarCircleOutlined />
    },
];

const LayoutAdmin = () => {
    const [collapsed,setCollapsed] = useState(false);
    const [activeMenu,setActiveMenu] = useState('dashboard');
    const user = useSelector(state => state.account.user);
    const navigate =useNavigate();
    const dispatch = useDispatch();
    const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user.avatar}`;

    const itemsDropdown = [
        {
            label: <Link to="/">Trang Client</Link>,
            key: 'home '
        },
        {
            label: <label style={{cursor:'pointer'}}>Quản lý tài khoản</label>,
            key: 'account '
        },
        {
            label: <label style={{cursor:'pointer'}}
                onClick={() => handleLogout()}
            >Đăng Xuất</label>,
            key: 'logout '
        },
        
    ];

    const handleLogout = async() => {
        const res = await callLogout();
        if(res && res.data) {
            dispatch(doLogoutAction());
            message.success('Đăng Xuất Thành Công');
            navigate('/')
        }
    }
    return (
        <Layout style={{ minHeight: '100vh' }} className='layout-admin'>
            <Sider 
            collapsible collapsed={collapsed} 
            onCollapse={(value) => setCollapsed(value)} 
            theme='light'
            className='layout-admin__slider'
            >
                <div style={{height: 32, margin: 16,textAlign: 'center'}}>Admin</div>
                <Menu  defaultSelectedKeys={[activeMenu]} mode="inline" items={items} onClick={(e) => setActiveMenu(e.key)}/>
            </Sider>
            <Layout className='layout-admin__layout' >
                <div className='admin-header'>
                    
                        <span>
                            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                className: 'trigger',
                                onClick: () => setCollapsed(!collapsed),
                            })}
                        </span>
                        <Dropdown menu={{ items: itemsDropdown }} trigger={['click']}>
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    <Avatar size="large" src={urlAvatar}/>{user.fullName}
                                    <DownOutlined />
                                </Space>
                            </a>
                        </Dropdown>
                    
                </div>
                <Content className='admin-layout__content'>
                    <Outlet/>
                </Content>
                {/* <Footer className='admin-layout__footer'>
                    React Test Fresher &copy; Hỏi Dân IT - Made with <HeartTwoTone />
                </Footer> */}
            </Layout>
        </Layout>
    )
}

export default LayoutAdmin;