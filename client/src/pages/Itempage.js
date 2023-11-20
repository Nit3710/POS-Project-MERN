import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { DeleteOutlined } from '@ant-design/icons';
import { EditOutlined } from '@ant-design/icons';
import { Modal, Button, Table, Form, Input, Select, message } from 'antd';
const Itempage = () => {
  const dispatch = useDispatch();
  const [itemsData, setitemsData] = useState([]);
  const [popUpModel, setPopUpModel] = useState(false);
  const [editItem, seteditItem] = useState(null);
  const getallItems = async () => {
    try {
      dispatch({
        type: 'SHOW_LOADING'
      })
      const { data } = await axios.get('api/items/get-item');
      setitemsData(data);
      dispatch({
        type: 'HIDE_LOADING'
      })
      console.log(data);
    } catch (error) {
      dispatch({
        type: 'HIDE_LOADING'
      })
      console.log(error);
    }
  }
  useEffect(() => {
    getallItems();
  },[]);

  //for delete item
  const handleDelete = async (record) => {
    try {
      dispatch({
        type: 'SHOW_LOADING'
      })
      await axios.delete('api/items/delete-item', { itemId: record._id });
      message.success("Item Deleted sucessfully");
      getallItems();
      setPopUpModel(false);
      dispatch({
        type: 'HIDE_LOADING'
      })
    } catch (error) {
      dispatch({
        type: 'HIDE_LOADING'
      })
      message.error("Something went wrong");
      console.log(error);
    }

  }
  const column = [

    { title: 'Name', dataIndex: 'name' },
    { title: 'Image', dataIndex: 'image', render: (image, record) => <img src={image} alt={record.name} height="68" width="60" /> },
    { title: 'Price', dataIndex: 'price' },
    {
      title: 'Actions', dataIndex: '_id', render: (id, record) =>
        <div>
          <EditOutlined style={{ cursor: 'pointer' }} onClick={() => {
            seteditItem(record);
            setPopUpModel(true);
          }} />
          <DeleteOutlined style={{ cursor: 'pointer' }} onClick={() => handleDelete(record)} />
        </div>
    }
  ];
  //for adding and updating item
  const handleSubmit = async (value) => {
    if (editItem === null) {
      try {
        dispatch({
          type: 'SHOW_LOADING'
        })
        await axios.post('api/items/add-item', value);
        message.success("Item added sucessfully");
        getallItems();
        setPopUpModel(false);
        dispatch({
          type: 'HIDE_LOADING'
        })
      } catch (error) {
        dispatch({
          type: 'HIDE_LOADING'
        })
        message.error("Something went wrong");
        console.log(error);
      }
    } else {
      try {
        dispatch({
          type: 'SHOW_LOADING'
        });
        await axios.put('api/items/update-item', { ...value, itemId: editItem._id });
        message.success("Item Updated successfully");
        getallItems();
        setPopUpModel(false);
        dispatch({
          type: 'HIDE_LOADING'
        })
      } catch (error) {
        dispatch({
          type: 'HIDE_LOADING'
        })
        message.error("Something went wrong");
        console.log(error);
      }

    }
  }
  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h1>Item list</h1>
        <Button type='primary' onClick={() => setPopUpModel(true)}>Add Item</Button>
      </div>
      <Table columns={column} dataSource={itemsData} bordered pagination={false}/>
      {
        popUpModel && (

          <Modal title={`${editItem !== null ? 'Edit Item' : "Add New Item"}`} open={popUpModel} onCancel={() => {
            seteditItem(null);
            setPopUpModel(false)
          }}
            footer={false}>
            <Form layout='vertical' onFinish={handleSubmit} initialValues={editItem}>
              <Form.Item name="name" label="Name">
                <Input />
              </Form.Item>
              <Form.Item name="price" label="Price">
                <Input />
              </Form.Item>
              <Form.Item name="image" label="Image URL">
                <Input />
              </Form.Item>
              <Form.Item name="category" label="Category">

                <Select>
                  <Select.Option value="drinks">Drinks</Select.Option>
                  <Select.Option value="rice">Rice</Select.Option>
                  <Select.Option value="noodles">Noodles</Select.Option>
                </Select>
              </Form.Item>
              <div className="d-flex justify-content-end">
                <Button type='primary' htmlType='submit'>Save</Button>
              </div>
            </Form>
          </Modal>
        )
      }
    </DefaultLayout>
  )
}

export default Itempage;
