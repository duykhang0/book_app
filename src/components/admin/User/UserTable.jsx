import { Table,Row ,Col,Drawer,Descriptions,Button,Popconfirm, message, notification} from 'antd';
import {FiRefreshCcw} from "react-icons/fi";
import {AiFillPlusCircle,AiOutlineExport,AiOutlineImport,AiOutlineDelete,AiOutlineEdit} from "react-icons/ai";
import * as XLSX from 'xlsx';

import { useEffect, useState } from 'react';
import moment from 'moment/moment';

import InputSearch from './inputSearch';
import { callFetchListUser,callDeleteUser } from '../../../services/api';
import UserModalCreate from './UserModalCreate';
import UserImport from './UserImport';
import UserModalUpdate from './UserModalUpdate';


const UserTable = () => {
    const [listUser,setListUser] = useState([]);
    const [current,setCurrent] = useState(1);
    const [pageSize,setPageSize] = useState(5);
    const [total,setTotal] = useState(0);
    const [isLoading,setIsLoading] = useState(false);
    const [filter,setFilter] = useState("");
    const [sortQuery,setSortQuery] = useState("");

    const [isOpenDrawer,setIsOpenDrawer] = useState(false);
    const [dataViewDetail,setDataViewDetail] = useState({})
    const [dataUpdate,setDataUpdate] = useState({})
    const [openModalCreate,setOpenModalCreate] = useState(false);
    const [openModalImport,setOpenModalImport] = useState(false);
    const [openModalUpdate,setOpenModalUpdate] = useState(false);
    const fecthUser = async () => {
        setIsLoading(true);
        let query = `current=${current}&pageSize=${pageSize}`;
        if(filter){
            query += `&${filter}`
        }

        if(sortQuery){
            query += `&${sortQuery}`
            

        }
        const res = await callFetchListUser(query);
        if(res && res.data) {
            setListUser(res.data.result);
            setTotal(res.data.meta.total);
        }
        
        setIsLoading(false);
        
    }
    
    useEffect(() => {
        fecthUser();

    },[current,pageSize,filter,sortQuery]);
   
    // handle Xóa người dùng
    const handleDeleteUser = async (_id) => {
        const res = await callDeleteUser(_id);
        if(res && res.data) {
            message.success("Xóa người dùng thành công");
            fecthUser();
        }else{
            notification.error({
                message: "Có lỗi xảy ra",
                description: res.message
            })
        }
    }
    const columns = [
        {
          title: 'Id',
          dataIndex: '_id',
          render: (text,record,index) => {
                return (
                    <a href='#' onClick={() => {
                        setIsOpenDrawer(true)
                        setDataViewDetail(record)
                    }}>
                        {record._id}
                    </a>
                )
            }
        },
        {
          title: 'Tên hiển thị',
          dataIndex: 'fullName',
          sorter: true
        },
        {
          title: 'Email',
          dataIndex: 'email',
          sorter: true
        },
        {
          title: 'Số điện thoại',
          dataIndex: 'phone',
          sorter: true
        },
        {
            title: 'Ngày cập nhật',
            dataIndex: 'updatedAt',
            sorter: true,
            render: (text,record,index) => {
                return (
                    <p>{moment(record.updatedAt).format('DD-MM-YYYY HH:mm:ss' )}</p>
                )
            }
            
        },
        {
            title: 'Action',
            render: (text,record,index) => {
                
                return(
                    <div style={{display: 'flex', gap:'10px'}}>
                         <Popconfirm
                            placement="left"
                            title= "Xóa user"
                            description= {`Bạn muốn xóa người dùng "${record.fullName}"`}
                            onConfirm={() => handleDeleteUser(record._id)}
                            okText="Xác nhận"
                            cancelText="Hủy"
                        >
                            <button 
                                style={{border:"none"}}
                            ><AiOutlineDelete size={18} color='red'/></button>
                        </Popconfirm>
                        
                        <button
                            style={{border:"none"}}
                            onClick={() => {
                                setOpenModalUpdate(true);
                                setDataUpdate(record);
                                
                            }}
                        ><AiOutlineEdit size={18} color='red'/></button>
                    </div>
                )
            }
          },
      ];
      
      const onChange = (pagination, filters, sorter, extra) => {
        if(pagination && pagination.current !== current){
            setCurrent(pagination.current);
        }
        if(pagination && pagination.pageSize !== pageSize){
            setPageSize(pagination.pageSize);
        }
        if(sorter && sorter.field){
            const q = sorter.order === 'ascend' ? `sort=${sorter.field}` : `sort=-${sorter.field}`;
            setSortQuery(q)
        }
        
      };
     
      const handleSearch = (query) => {
            setFilter(query);
      }
      
      const onClose = () => {
        setIsOpenDrawer(false);
      }

      const handleExportData = () => {
        if(listUser.length > 0) {
            const worksheet = XLSX.utils.json_to_sheet(listUser);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook,worksheet,"Sheet1");
            XLSX.writeFile(workbook,"ExportUser.csv");
        }
      }
    
      
      const renderHeader = () => {
        return (
            <div style={{display:'flex',justifyContent:'space-between'}}>
                <span><b>Table List User</b></span>
                <span style={{display:"flex",gap: 15}}>
                    <Button type='primary' className='btn-table'
                        onClick={() => handleExportData()}
                    ><AiOutlineExport/>Export</Button>
                    <Button type='primary' className='btn-table'
                        onClick={() => setOpenModalImport(true)}
                    ><AiOutlineImport/>
                        Import
                    </Button>
                    <Button type='primary' className='btn-table'
                        onClick={() => setOpenModalCreate(true)}
                    >
                        <AiFillPlusCircle/>
                        Thêm Mới
                    </Button>
                    <Button type='ghost'
                        onClick={() => {
                            setFilter("");
                            setSortQuery("");
                            fecthUser();
                        }}
                    >
                        <FiRefreshCcw/>
                    </Button>
                </span>
            </div>
        )
      }
      
    return (
        <>
            <Row gutter={[20,20]}>
                <Col span={24}>
                    <InputSearch handleSearch = {handleSearch} setFilter ={setFilter} />
                </Col>
                <Col span={24}>
                    <Table 
                        title={renderHeader}
                        className='def'
                        columns={columns} 
                        dataSource={listUser} 
                        onChange={onChange} 
                        rowKey={list => list._id}
                        pagination = {{
                            current: current,  
                            pageSize:pageSize, 
                            showSizeChanger: true,
                            total: total,
                            showTotal: (total,range) => {return (<div>{range[0]}-{range[1]} trên {total}</div>)}
                        }}
                        
                        size= 'medium'
                        loading={isLoading}
                        

                    />
                    
                </Col>
                <div >
                    <Drawer 
                    title="Chức năng xem chi tiết" 
                    placement="right" 
                    onClose={onClose} open={isOpenDrawer} 
                    width={"50vw"}
                    >
                        
                        <Descriptions
                        title = "Thông Tin USER"
                        bordered
                        column = {2}
                        >
                            <Descriptions.Item label="id">{dataViewDetail._id}</Descriptions.Item>
                            <Descriptions.Item label="Tên Hiển Thị">{dataViewDetail.fullName}</Descriptions.Item>
                            <Descriptions.Item label="email">{dataViewDetail.email}</Descriptions.Item>
                            <Descriptions.Item label="Số Điện Thoại">{dataViewDetail.phone}</Descriptions.Item>
                            <Descriptions.Item label="Role" span={2}>{dataViewDetail.role}</Descriptions.Item>
                            <Descriptions.Item label="Create At">
                                {moment(dataViewDetail.createdAt).format('DD-MM-YYYY HH:mm:ss' )}
                            </Descriptions.Item>
                            <Descriptions.Item label="Update At">
                                {moment(dataViewDetail.updateAt).format('DD-MM-YYYY HH:mm:ss' )}
                            </Descriptions.Item>
                            
                            
                        </Descriptions>
                    </Drawer>
                </div>
                <UserModalCreate
                    openModalCreate = {openModalCreate}
                    setOpenModalCreate = {setOpenModalCreate}
                    fecthUser = {fecthUser}
                />
                <UserImport 
                    openModalImport = {openModalImport}
                    setOpenModalImport = {setOpenModalImport}
                    fecthUser = {fecthUser}
                />
                <UserModalUpdate
                    openModalUpdate = {openModalUpdate}
                    setOpenModalUpdate = {setOpenModalUpdate}
                    dataUpdate = {dataUpdate}
                    setDataUpdate = {setDataUpdate}
                    fecthUser = {fecthUser}
                />
            </Row>
            
            
            
        </>
    );
}
export default UserTable;