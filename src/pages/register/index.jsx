import { Button, Form, Input,Divider ,message,notification} from 'antd';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { callRegister } from '../../services/api';


const RegisterPage = () => {
    const [isSubmit,setIsSubmit] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {

        const {fullName,email,password,phone} = values
        setIsSubmit(true);
        let res = await callRegister(fullName,email,password,phone);
        setIsSubmit(false);
        if(res && res?.data?._id){
            message.success('Đăng Ký Tài Khoản Thành Công');
            navigate('/login');
        }else{
            notification.error({
                message: 'Có biến',
                description: 
                    res.message && Array.isArray(res.message) ? res.message[0] : res.message,
                    duration: 5
            })
        }
        
    };
    

    
    
    return (
        <>

            <div>
                <h2 style={{textAlign:"center"}}>Đăng Ký Người Dùng Mới</h2>
                <Divider/>
                <Form
                    name="basic"
                    style={{ maxWidth: 600 ,margin:'0 auto' }}
                    onFinish={onFinish}
                    autoComplete="off"
                    
                >
                    <Form.Item
                    label="Họ Và Tên"
                    name="fullName"
                    labelCol={{span: 24}}
                    rules={[{ required: true, message: 'Họ và tên không được bỏ trống' }]}
                    >
                    <Input />
                    </Form.Item>

                    <Form.Item
                    label="Email"
                    name="email"
                    labelCol={{span: 24}}
                    rules={[{ required: true, message: 'Email không được bỏ trống' }]}
                    >
                    <Input />
                    </Form.Item>
    
                    <Form.Item
                    label="Mật Khẩu"
                    name="password"
                    labelCol={{span: 24}}
                    rules={[{ required: true, message: 'Mật khẩu không được bỏ trống' }]}
                    >
                    <Input.Password />
                    </Form.Item>

                    <Form.Item
                    label="Phone"
                    name="phone"
                    labelCol={{span: 24}}
                    rules={[{ required: true, message: 'Phone không được bỏ trống' }]}
                    >
                    <Input />
                    </Form.Item>
                    
    
                    <Form.Item 
                        // wrapperCol={{ offset: 10, span: 16 }}
                    >
                    <Button type="primary" htmlType="submit" loading={isSubmit}>
                        Submit
                    </Button>
                    </Form.Item>
                </Form>   
            </div>
        </>
    )
}

export default RegisterPage;