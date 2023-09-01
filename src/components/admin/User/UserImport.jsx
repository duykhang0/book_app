import {  Modal,message,Upload,Table, notification} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useState } from 'react';
import * as XLSX from 'xlsx';

import { callBulkCreateUser } from '../../../services/api';
import templateFile from './template.xlsx?url'
const {Dragger} = Upload;
const UserImport = ({openModalImport,setOpenModalImport,fecthUser}) => {

    const [dataExcel,setDataExcel] = useState([]);
    const dummyRequest = ({file,onSuccess}) => {
        setTimeout(() => {
            onSuccess('ok')
        },1000)
    }

    // const propsUpload = {
    //     name: 'file',
    //     multiple: false,
    //     maxCount: 1,
    //     accept: " .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
    //     customRequest: dummyRequest,
    //     onchange(info) {
    //         const {status} = info.file;
    //         if(status !== 'uploading'){
    //             console.log(info.file,info.fileList);
    //         }
    //         if(status === 'done'){
    //             message.success(`${info.file.name} file uploaded successfully`)
    //         }else if(status === 'error'){
    //             message.error(`${info.file.name} file upload failed`)
    //         }
    //     },
    //     onDrop(e){
    //         console.log('Dropped files', e.dataTransfer.files);
    //     }
        
    // }

    const handleSubmit = async() => {
        const data = dataExcel.map(item => {
            item.password = '123456';
            return item;
        })
        const res = await callBulkCreateUser(data);
        if(res.data){
            notification.success({
                description: `Success: ${res.data.countSuccess},Error: ${res.data.countError}`,
                message: "Upload Thành công",    
            })
            setDataExcel([]);
            setOpenModalImport(false);
            fecthUser();
        }else{
            notification.error({
                description: res.message,
                message: "Đã có lỗi xảy ra"
            })
        }
    }
    return (
        <>
            <Modal 
            title="Import" 
            open={openModalImport} 
            okText="Import" 
            onOk={() => handleSubmit()}
            okButtonProps={{
                disabled: dataExcel.length < 1
            }}
            onCancel={() => {
                setOpenModalImport(false)
                setDataExcel([])
            }}
            cancelText="Hủy"
            maskClosable = {false}
            >   
                <Dragger 
                    name = 'file'
                    multiple = {false}
                    maxCount={1}
                    accept = " .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    customRequest={dummyRequest}
                    onChange={(info) => {
                        
                        const {status} = info.file;
                        if(status !== 'uploading'){
                            console.log(info.file,info.fileList);
                        }
                        if(status === 'done'){
                            if(info.fileList && info.fileList.length > 0){
                                const file = info.fileList[0].originFileObj;
                                const reader = new FileReader();
                                reader.readAsArrayBuffer(file);
                                reader.onload = (e) => {
                                    const data = new Uint8Array(reader.result);
                                    const workbook = XLSX.read(data,{type: 'array'});
                                    const sheet = workbook.Sheets[workbook.SheetNames[0]];
                                    // const json = XLSX.utils.sheet_to_json(sheet);
                                    const json = XLSX.utils.sheet_to_json(sheet,{
                                        header: ['fullName','email','phone'],
                                        range: 1
                                    })
                                    if(json && json.length > 0) setDataExcel(json)
                                    
                                }
                                
                            }
                            message.success(`${info.file.name} file uploaded successfully`)
                        }else if(status === 'error'){
                            message.error(`${info.file.name} file upload failed`)
                        }
                    }}
                    onDrop={(e) =>  console.log('Dropped files', e.dataTransfer.files)}
                >
                    <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                    Support for a single or bulk upload.Only accept .csv, xls, .xlsx,or.
                    &nbsp; <a onClick={e => e.stopPropagation()} href={templateFile} download>Download Sample File</a>
                    </p>
                </Dragger>
                <div style={{padding:20}}>
                    <Table
                        title={() => <span>Dữ liệu upload</span>}
                        columns={[
                            {dataIndex: 'fullName',title: 'Tên hiển thị'},
                            {dataIndex: 'email',title: 'Email'},
                            {dataIndex: 'phone',title: 'Số điện thoại'}
                        ]}
                        dataSource={dataExcel}
                        
                    />
                </div>

                
                
            </Modal>
        </>
    );
}

export default UserImport;