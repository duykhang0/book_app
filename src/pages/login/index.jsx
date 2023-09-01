import { Button, Form, Input,Divider ,message,notification} from 'antd';
import { useNavigate,Link  } from 'react-router-dom';
import { useState } from 'react';
import { callLogin } from '../../services/api';
import './login.scss';
import { doLoginAction } from '../../redux/account/accountSlice';
import { useDispatch } from 'react-redux';



const LoginPage = () => {

    const [isSubmit,setIsSubmit] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const onFinish = async (values) => {
        const {username,password} = values;
        // console.log(username,password);
        let res = await callLogin(username,password);
        if(res && res?.data){
            
            localStorage.setItem('access_token',res.data.access_token);
            dispatch(doLoginAction(res.data.user));
            message.success("Đăng nhập thành công");
            navigate('/')
        }else{
            notification.error({
                message:'Có biến',
                description: res.message && Array.isArray(res.message) ? res.message[0] : res.message,
                duration: 5
            })
        }
        
    };
    

    
    
    return (
        <div className="login-page">
            <main className="main">
                <div className="container">
                    <section className="wrapper">
                        <div className="heading">
                            <h2 className="text text-large">Đăng Nhập</h2>
                            <Divider />

                        </div>
                        <Form
                            name="basic"
                            // style={{ maxWidth: 600, margin: '0 auto' }}
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Form.Item
                                labelCol={{ span: 24 }} //whole column
                                label="Email"
                                name="username"
                                rules={[{ required: true, message: 'Email không được để trống!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                labelCol={{ span: 24 }} //whole column
                                label="Mật khẩu"
                                name="password"
                                rules={[{ required: true, message: 'Mật khẩu không được để trống!' }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                            // wrapperCol={{ offset: 6, span: 16 }}
                            >
                                <Button type="primary" htmlType="submit" loading={isSubmit}>
                                    Đăng nhập
                                </Button>
                            </Form.Item>
                            <Divider>Or</Divider>
                            <p className="text text-normal">Chưa có tài khoản ?
                                <span>
                                    <Link to='/register' > Đăng Ký </Link>
                                </span>
                            </p>
                        </Form>
                    </section>
                </div>
            </main>
        </div>
    )
}

export default LoginPage;