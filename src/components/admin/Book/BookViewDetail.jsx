import {Drawer,Descriptions,Divider,Upload,Modal} from "antd";
import { PlusOutlined } from '@ant-design/icons';
import moment from "moment";
import { NumericFormat } from "react-number-format";
import { useEffect, useState } from "react";
import {v4 as uuidv4} from 'uuid';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const BookViewDetail = (props) => {

    const {isOpenDrawer,setIsOpenDrawer,dataViewDetailBook,setDataViewDetailBook} = props;
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);
    useEffect(() => {
        if(dataViewDetailBook){
            let imgThumbnail = {}, imgSlider = [];
            if(dataViewDetailBook.thumbnail){
                imgThumbnail = {
                    uid: uuidv4(),
                    name: dataViewDetailBook.thumbnail,
                    status: 'done',
                    url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${dataViewDetailBook.thumbnail}`
                }
            }
            if(dataViewDetailBook.slider && dataViewDetailBook.slider.length > 0){
                dataViewDetailBook.slider.map(item => {
                    imgSlider.push({
                        uid: uuidv4(),
                        name: item,
                        status: 'done',
                        url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`
                    })
                })
            }
            setFileList([imgThumbnail,...imgSlider]);
        }
    },[dataViewDetailBook])
    const handleCancel = () => setPreviewOpen(false);
  
    const handlePreview = async (file) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj );
      }
  
      setPreviewImage(file.url || (file.preview ));
      setPreviewOpen(true);
      setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
  
    const handleChange = ({ fileList: newFileList }) =>
      setFileList(newFileList);
  
    

    return (
        <>
            
            <Drawer 
            title="Chức năng xem chi tiết"
            width={"50vw"} 
            placement="right" 
            onClose={() => {
                    setIsOpenDrawer(false)
                    setDataViewDetailBook("")
                }} 
            open={isOpenDrawer}
            >
                <Descriptions
                    title = "Thông tin sách"
                    bordered
                    column={2}
                >
                    <Descriptions.Item label="ID">{dataViewDetailBook._id}</Descriptions.Item>
                    <Descriptions.Item label="Tên sách">{dataViewDetailBook.mainText}</Descriptions.Item>
                    <Descriptions.Item label="Tác giả">{dataViewDetailBook.author}</Descriptions.Item>
                    <Descriptions.Item label="Giá tiền">
                        <NumericFormat
                        value={dataViewDetailBook.price}
                        suffix="VNĐ"
                        thousandSeparator
                        displayType="text"
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="Thể loại" span={2}>{dataViewDetailBook.category}</Descriptions.Item>
                    <Descriptions.Item label="Created At">{moment(dataViewDetailBook.createdAt).format("DD-MM-YYYY HH:mm:ss")}</Descriptions.Item>
                    <Descriptions.Item label="Updated At">{moment(dataViewDetailBook.updatedAt).format("DD-MM-YYYY HH:mm:ss")}</Descriptions.Item>
                </Descriptions>

                <Divider orientation="left">Ảnh</Divider>

                <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    showUploadList = {
                        {showRemoveIcon: false}
                    }
                >
                    
                </Upload>
                <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </Drawer>
        </>
    );

}
export default BookViewDetail;