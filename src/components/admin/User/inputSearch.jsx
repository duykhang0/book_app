import { Button, Col, Form, Input, Row, Select, Space, theme, } from 'antd';



    
const InputSearch = (props) => {
    const [form] = Form.useForm();
    const {token} = theme.useToken();
    
    const formStyle = {
        maxWidth: 'none',
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        padding: '10px 20px'
    }

    const onFinish = (value) => {
        let query = "";
        if(value.fullName){
            query += `&fullName=/${value.fullName}/i`
        }
        if(value.email){
            query += `&email=/${value.email}/i`
        }
        if(value.phone){
            query += `&phone=/${value.phone}/i`
        }
        if(query) {
            props.handleSearch(query);
        }else{
            props.setFilter("")
        }

    }
    return (
        <div className='input-search'>
            <Form form={form} name="advanced_search" style={formStyle} onFinish={onFinish} >
                <Row gutter={24}>
                    <Col span={8}>
                        <Form.Item
                            labelCol={{span: 24}}
                            name={'fullName'}
                            label={'Name'}
                        >
                            <Input placeholder='placeholder'/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            labelCol={{span: 24}}
                            name={'email'}
                            label={'email'}
                        >
                            <Input placeholder='placeholder'/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            labelCol={{span: 24}}
                            name={'phone'}
                            label={'Số điện thoại'}
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
                            props.setFilter("")
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



export default InputSearch;