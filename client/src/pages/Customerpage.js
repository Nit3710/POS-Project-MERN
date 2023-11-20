import React,{useState,useEffect} from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Table } from 'antd';
const Customerpage = () => {
    const [billsData, setBillsData] = useState([]);
    const dispatch=useDispatch();
    const getallBills = async () => {
        try {
            dispatch({
                type: 'SHOW_LOADING'
            })
            const { data } = await axios.get('api/bills/get-bills');
            setBillsData(data);
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
        getallBills();
    }, []);
    const column = [

        { title: 'ID', dataIndex: '_id' },
        { title: 'Customer Name', dataIndex: 'customerName' },
        { title: 'Contact No.', dataIndex: 'customerContact' },
        
        
    ];
  return (
    <DefaultLayout>
      <h1>Customer page</h1>
      <Table columns={column} dataSource={billsData} bordered pagination={false} />
    </DefaultLayout>
  )
}

export default Customerpage
