import { Button, Modal, Form, Input,message,notification } from 'antd';
import { useEffect, useState } from 'react';

import { callUpdateUser } from '../../../services/api';

const UserModalUpdate = ({openModalUpdate,setOpenModalUpdate,dataUpdate,setDataUpdate,fecthUser}) => {
   

    const [form] = Form.useForm();
    const onFinish = async (value) => {
        const {_id,fullName,phone} = value;
        
        const res = await callUpdateUser(_id,fullName,phone)
        if(res && res.data){
            message.success('Cập nhật user thành công');
            setOpenModalUpdate(false);
            await fecthUser();
        }else{
            notification.error({
                message:"Đã có lỗi xảy ra",
                description: res.message
            })
        }
      
    }

    useEffect(() => {
        form.setFieldsValue(dataUpdate)
    },[dataUpdate])
    return (
        <>
            <Modal 
            title="Cập Nhật Người Dùng" 
            open={openModalUpdate} 
            onOk={() => {form.submit();}} 
            okText = "Lưu"
            onCancel={() => {
                setOpenModalUpdate(false)
                setDataUpdate(null)
            }}
            cancelText ="Hủy"
            maskClosable = {false}
            >
                <Form
                    name="basic"
                    form={form}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                    label="id"
                    name="_id"
                    rules={[{ required: true, message: 'Id không được bỏ trống' }]}
                    hidden
                    >
                    <Input />
                    </Form.Item>

                    <Form.Item
                    label="Tên hiển thị"
                    name="fullName"
                    rules={[{ required: true, message: 'Tên hiển thị không được bỏ trống' }]}
                    >
                    <Input />
                    </Form.Item>

                    <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Email không được bỏ trống' }]}
                    
                    >
                    <Input disabled />
                    </Form.Item>

                    <Form.Item
                    label="Số điện thoại"
                    name="phone"
                    rules={[{ required: true, message: 'Số điện thoại không được bỏ trống' }]}
                    >
                    <Input />
                    </Form.Item>    
                </Form>
            </Modal>
        </>
    )
}

export default UserModalUpdate;