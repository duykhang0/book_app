import { Button, Col, Form, Input, Row, Select, Space, theme, } from 'antd';
import { useState } from 'react';


const InputSearchBook = ({handleSearch,setFilter}) => {
    const [form] = Form.useForm();
    const {token} = theme.useToken();

    const formStyle = {
        maxWidth: 'none',
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        padding: '10px 20px'
    }

    const onFinish = (value) => {
        const {mainText, category, author} = value;
        let query = "";
        if(mainText) {
            query += `&mainText=/${mainText}/i`;
        }
        if(category){
            query += `/&category=${category}/i`
        }
        if(author){
            query += `/&author=${author}/i`;
        }
        if(query){
            handleSearch(query);
        }else{
            setFilter("")
        }
        
    }
    

    return (
        <div className='input-search__book'>
            <Form form={form} name="advanced_search" style={formStyle} onFinish={onFinish} >
                <Row gutter={24}>
                    <Col span={8}>
                        <Form.Item
                            labelCol={{span: 24}}
                            name={'mainText'}
                            label={'Tên sách'}
                        >
                            <Input placeholder='placeholder'/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            labelCol={{span: 24}}
                            name={'category'}
                            label={'Thể loại'}
                        >
                            <Input placeholder='placeholder'/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            labelCol={{span: 24}}
                            name={'author'}
                            label={'Tác giả'}
                        >
                            <Input placeholder='placeholder'/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Space size="small">
                        <Button type="primary" htmlType="submit">
                            Search
                        </Button>
                        <Button
                            onClick={() => {
                            form.resetFields();
                            setFilter("");
                            }}
                        >
                            Clear
                        </Button>
                        
                        </Space>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default InputSearchBook;