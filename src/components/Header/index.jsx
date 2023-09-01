import { AiOutlineMenu } from "react-icons/ai";
import { FaReact } from 'react-icons/fa'
import { FiShoppingCart } from 'react-icons/fi';
import { VscSearchFuzzy } from 'react-icons/vsc';
import { Badge,Divider,Dropdown,Space, message,Drawer,Avatar} from 'antd';
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./header.scss";
import { callLogout } from "../../services/api";
import { doLogoutAction } from "../../redux/account/accountSlice";
import { useState } from "react";
const Header = () => {
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);
    const user = useSelector(state => state.account.user);
    const [openDrawer,setOpenDrawer] = useState(false); 
    const navigate = useNavigate()
    const dispatch = useDispatch(); 
    const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user.avatar}`;
    const handleLogout = async() => {
        const res = await callLogout();
        if(res && res.data){
            dispatch(doLogoutAction());
            message.success('Đăng xuất Thành Công');
            navigate('/')
            
        }
    }
    let items = [
        {
            label: <label style={{cursor:"pointer"}}> Quản lý tài khoản</label>,
            key: 'account'
        },
        {
            label: <label style={{cursor:"pointer"}} onClick={() => handleLogout()}>Đăng Xuất</label>,
            key: 'logout'
        },
       
    ];

    if(user?.role === "ADMIN"){
        items.unshift({
            label: <Link to="/admin">Trang quản trị</Link>,
            key: 'admin'
        })
        
    }
   
    return(
        <>
            <div className="header-container">
                <header className="page-header">
                    <div className="page-header__top">
                        <div className=" page-header__toggle">
                            <AiOutlineMenu onClick={() => setOpenDrawer(true)}/>
                        </div>
                        <div className="page-header__logo">
                            <span className="logo">
                                <FaReact className="rotate icon-react"/> DyKhan
                                <VscSearchFuzzy className="icon-search"/>
                            </span>
                            <input
                                className="input-search" type={'text'}
                                placeholder="Muốn tìm cái gì thì gõ vô đây..."
                            />
                        </div>
                    </div>
                    <nav className="page-header__bottom">
                        <ul id="navigation" className="navigation">
                            <li className="navigation__item">
                                <Badge count={5} size={"small"}>
                                    <FiShoppingCart className="icon-cart"/>
                                </Badge>
                            </li>
                            <li className="navigation_item mobile"><Divider type="vertical"/> </li>
                            <li className="navigation__item mobile">
                                {
                                    !isAuthenticated ? <span onClick={() => navigate('/login')}>Tài Khoản</span>
                                    :
                                    <Dropdown menu={{ items }} trigger={['click']}>
                                        <a onClick={(e) => e.preventDefault()}>
                                            <Space>
                                               <Avatar size="large" src={urlAvatar}/>
                                               {user.fullName}
                                            </Space>
                                        </a>
                                    </Dropdown>

                                }
                                
                            </li>
                        </ul>
                    </nav>
                </header>
            </div>
            <Drawer
                title="Menu chức năng"
                placement="left"
                onClose={() => setOpenDrawer(false)}
                open={openDrawer}
            >
                <p>Quản lý tài khoản</p>
                <Divider />

                <p>Đăng xuất</p>
                <Divider />
            </Drawer>
        </>    
    )
}

export default Header;