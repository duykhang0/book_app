import { Row, Col,Table,Button,Drawer,Descriptions,Divider,Upload,Modal} from "antd";
import { useEffect, useState } from "react";
import moment from "moment";
import { NumericFormat } from 'react-number-format';
import {AiOutlineExport,AiFillPlusCircle} from "react-icons/ai";
import {FiRefreshCcw} from "react-icons/fi";

import InputSearchBook from "./InputSearchBook";
import BookViewDetail from "./BookViewDetail";
import BookModalCreate from "./BookModalCreate";
import { callFetchBook } from "../../../services/api";


const BookTable = () => {
    const [listBook,setListBook] = useState([]);
    const [currentPage,setCurrentPage] = useState('1');
    const [pageSize,setPageSize] = useState('10');
    const [total,setTotal] = useState('');
    const [filter,setFilter] = useState('');
    const [sorter,setSorter] = useState('');
    const [isLoading,setIsLoading] = useState(false);
    const [isOpenDrawer,setIsOpenDrawer] = useState(false);
    const [dataViewDetailBook,setDataViewDetailBook] = useState({});
    const [openModalCreate,setOpenModalCreate] = useState(false);
    // call API
    const fetchBook = async () => {
        setIsLoading(true);
        let query = `current=${currentPage}&pageSize=${pageSize}`;
        if(filter){
            query += filter;
        }
        if(sorter){
            query += `&${sorter}`;
        }
        const res = await callFetchBook(query);
        if(res && res.data){
            setListBook(res.data.result)
            setTotal(res.data.meta.total)
        }   
        setIsLoading(false);
    }
    

    useEffect(() => {
        fetchBook();
    },[filter,sorter])

    const columns = [
        {
            title: "ID",
            dataIndex: "_id",
            render: (text,record,index) => {
                
                return (
                    <a href="#"
                        onClick={() => {
                            setIsOpenDrawer(true)
                            setDataViewDetailBook(record)
                        }}
                    >
                        {record._id}
                    </a>
                );
            }
        },
        {
            title: "Tên Sách",
            dataIndex: "mainText",
            sorter: true
        },
        {
            title: "Thể loại",
            dataIndex: "category",
            sorter: true
        },
        {
            title: "Tác giả",
            dataIndex: "author",
            sorter: true
        },
        {
            title: "Giá tiền",
            dataIndex: "price",
            sorter: true,
            render: (text,record,index) => {
                return (
                    <NumericFormat
                    value={record.price}
                    suffix="VNĐ"
                    thousandSeparator
                    displayType="text"
                    />
                );
            }
        },
        {
            title: "Ngày cập nhật",
            dataIndex: "updatedAt",
            sorter: true,
            render: (text,record,index) => {
                return (
                    <p>{moment(record.updatedAt).format("DD-MM-YYYY HH:mm:ss")}</p>
                );
            }   
        },
        {
            title: "Action",
            render: (text,record,index) => {
                return (
                    <button>Delete</button>
                );
            }
        }
    ];

    //On change
    const onChange = (pagination,filters,sorter,extra) => {
        if(pagination && pagination.current !== currentPage){
            setCurrentPage(pagination.current);
        }
        if(pagination && pagination.pageSize !== pageSize){
            setPageSize(pagination.pageSize);
        }
        if(sorter && sorter.field){
            const q = sorter.order === 'ascend' ? `sort=${sorter.field}` : `sort=-${sorter.field}`;
            setSorter(q);
        }
    }

    // HandleSearch
    const handleSearch = (query) => {
        setFilter(query);
    }
    
    // Title header of Table
    const renderHeader = () => {
        return (
            <div style={{display: "flex",justifyContent: "space-between"}}>
                <span style={{fontSize: 18}}><b>Table List Book</b></span>
                <span style={{display:"flex",gap: 15}}>
                    <Button type="primary" className="btn-table"> <AiOutlineExport/> Export</Button>
                    <Button type="primary" className="btn-table"
                        onClick={() => setOpenModalCreate(true)}
                    >
                        <AiFillPlusCircle/>
                        Thêm mới
                    </Button>
                    <Button type="primary" className="btn-table"><FiRefreshCcw/> Refresh</Button>
                </span>
            </div>
        );
    }

    return (
        <>
            <Row gutter={[20,20]}>
                <Col span={24}>
                    <InputSearchBook handleSearch={handleSearch} setFilter={setFilter}/>
                </Col>
                <Col span={24}>
                    <Table 
                        title={renderHeader}
                        className='def'
                        columns={columns} 
                        dataSource={listBook} 
                        rowKey={listBook => listBook._id}
                        onChange={onChange} 
                        loading = {isLoading}
                        pagination = {{
                            current: currentPage,  
                            pageSize: pageSize, 
                            showSizeChanger: true,
                            total: total,
                            showTotal: (total,range) => {return (<div>{range[0]}-{range[1]} trên {total}</div>)}
                        }}
                        
                        size= 'Large'
                        // loading={isLoading}
                        
    
                    />
                </Col>
            </Row>
            <BookViewDetail
                isOpenDrawer = {isOpenDrawer}
                setIsOpenDrawer = {setIsOpenDrawer}
                dataViewDetailBook = {dataViewDetailBook}
                setDataViewDetailBook = {setDataViewDetailBook}
            />
            <BookModalCreate
                openModalCreate = {openModalCreate}
                setOpenModalCreate = {setOpenModalCreate}
            />

        </>
    );
}

export default BookTable;