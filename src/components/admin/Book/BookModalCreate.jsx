import {  Modal,Divider,Form,Input,InputNumber,Row,Col,Select,Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

import { callFetchCategory } from '../../../services/api';
const BookModalCreate = (props) => {
    const [form] = Form.useForm();
    const {openModalCreate,setOpenModalCreate} = props;

    const [listCategory,setListCategory] = useState([])
    const [isSubmit,setIsSubmit] = useState(false);
    const [loading,setLoading] = useState(false);
    const [loadingSlider, setLoadingSlider] = useState(false);
    const [imageUrl, setImageUrl] = useState();


    useEffect(() => {
        const fetchCategory = async () => {
            const res = await callFetchCategory();
            if(res && res.data) {
                const d = res.data.map((item) => {
                    return {
                        label: item, value: item
                    }
                })
                setListCategory(d);
            }
        }

        fetchCategory();
    },[]);

    // Upload File
    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result ));
        reader.readAsDataURL(img);
      };
      
      const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const handleChange = ({ file, fileList, event }) => {
        console.log(file, fileList, event)
        if (info.file.status === 'uploading') {
            type ? setLoadingSlider(true) : setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (url) => {
                type ? setLoadingSlider(false) : setLoading(false);
                setImageUrl(url);
            });
        }
    };

    const handleUploadFile = (options) => {
       
        
    };
    
    

    const onFinish = (value) => {
        console.log(value);
    }
    return (
        <>
            <Modal 
            title="Thêm Mới Sách" 
            open={true} 
            onOk={() => form.submit()} 
            onCancel={() => setOpenModalCreate(false)}
            okText = "Tạo mới"
            cancelText ="Hủy"
            confirmLoading = {isSubmit}
            width={"60vw"}
            maskClosable = {false}
            >
                <Divider/>
                
                    <Form
                        name="basic"
                        form={form}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Row gutter={15}>
                            <Col span={12}>
                                <Form.Item
                                    labelCol={{span:24}}
                                    label="Tên sách"
                                    name="mainText"
                                    rules={[{ required: true, message: 'Vui lòng nhập tên sách!' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
    
                            <Col span={12}>
                                <Form.Item
                                    labelCol={{span:24}}
                                    label="Tác giả"
                                    name="author"
                                    rules={[{ required: true, message: 'Vui lòng nhập tên tác giả!' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>

                            <Col span={6}>
                                <Form.Item
                                    labelCol={{span:24}}
                                    label="Giá tiền"
                                    name="price"
                                    rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
                                >
                                    <InputNumber 
                                        min={0}
                                        style={{width:'100%'}}
                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        addonAfter = "VND"
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={6}>
                                <Form.Item
                                    labelCol={{span:24}}
                                    label="Thể loại"
                                    name="category"
                                    rules={[{ required: true, message: 'Vui lòng chọn thể loại!' }]}
                                >
                                    <Select
                                        // defaultValue={null}
                                        showSearch
                                        allowClear
                                        options={listCategory}
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={6}>
                                <Form.Item
                                    labelCol={{span:24}}
                                    label="Số lượng"
                                    name="quantity"
                                    rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
                                >
                                    <InputNumber 
                                        min={1}
                                        style={{width:'100%'}}
                                        
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={6}>
                                <Form.Item
                                    labelCol={{span:24}}
                                    label="Đã bán"
                                    name="sold"
                                    rules={[{ required: true, message: 'Vui lòng nhập đã bán!' }]}
                                    initialValue={0}
                                >
                                    <InputNumber 
                                        min={0}
                                        style={{width:'100%'}}
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item
                                    labelCol={{span:24}}
                                    label="Ảnh thumbnail"
                                    name="thumbnail"
                                     
                                >
                                    <Upload
                                        name="thumbnail"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        maxCount={1}
                                        multiple ={false}
                                        beforeUpload={beforeUpload}
                                        onChange={handleChange} 
                                    >
                                        <div>
                                            {loading ? <LoadingOutlined /> : <PlusOutlined />}
                                            <div style={{ marginTop: 8 }}>Upload</div>
                                        </div>
                                    </Upload>
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Ảnh Slider"
                                name="slider"
                            >
                                <Upload
                                    multiple
                                    name="slider"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    customRequest={handleUploadFile}
                                    beforeUpload={beforeUpload}
                                    onChange={(info) => handleChange(info, 'slider')}
                                >
                                    <div>
                                        {loadingSlider ? <LoadingOutlined /> : <PlusOutlined />}
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                </Upload>
                            </Form.Item>
                        </Col>

                            
                        </Row>

                        

                        
                    </Form>
                
                
            </Modal>
        </>
    );
}

export default BookModalCreate;