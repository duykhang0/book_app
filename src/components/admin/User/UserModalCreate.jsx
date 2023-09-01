import {  Modal,Divider ,Form,Input,message,notification} from 'antd';
import { useState } from 'react';


import { callCreateUser } from '../../../services/api';
const UserModalCreate = ({openModalCreate,setOpenModalCreate,fecthUser}) => {

    const [form] = Form.useForm();
    const [isSubmit,setIsSubmit] = useState(false);
    const onFinish = async(value) => {
        const {fullName,email,password,phone} = value;
        setIsSubmit(true);
        const res = await callCreateUser(fullName, email, password, phone);
        if(res && res.data){
            message.success('Tạo mới người dùng thành công');
            form.resetFields();
            setOpenModalCreate(false);
            await fecthUser();
        }else{
            notification.error({
                message: "Có lỗi xãy ra",
                description: res.message
            })
        }
        setIsSubmit(false);

    }
    return (
        <>
            <Modal 
            title="Thêm mới người dùng" 
            open={openModalCreate} 
            onOk={() => {form.submit();}}
            okText="Tạo mới" 
            onCancel={() => setOpenModalCreate(false)}
            cancelText="Hủy"
            confirmLoading = {isSubmit}
            >   
                <Divider/>
                <Form
                    name="basic"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ maxWidth: 800 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    form={form}
                    autoComplete="off"
                >
                    <Form.Item
                    label="Tên hiển thị"
                    name="fullName"
                    rules={[{ required: true, message: 'Tên hiển thị không được bỏ trống' }]}
                    >
                    <Input />
                    </Form.Item>

                    <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Mật khẩu không được bỏ trống' }]}
                    >
                    <Input  />
                    </Form.Item>

                    <Form.Item
                    label="email"
                    name="email"
                    rules={[{ required: true, message: 'Email không được bỏ trống' }]}
                    >
                    <Input  />
                    </Form.Item>

                    <Form.Item
                    label="Số điện thoại"
                    name="phone"
                    rules={[{ required: true, message: 'Số điện thoại không được bỏ trống' }]}
                    >
                    <Input  />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
export default UserModalCreate;