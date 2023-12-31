import React, { useState, useEffect, useRef } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { Button, Modal, Table } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { EyeOutlined } from '@ant-design/icons'
import ReactToPrint from 'react-to-print';
import { useReactToPrint } from "react-to-print";
import '../styles/InvoiceStyle.css';
const Billspage = () => {
    const componentRef = useRef();
    const dispatch = useDispatch();
    const [billsData, setBillsData] = useState([]);
    const [popUpModel, setPopUpModel] = useState(false);
    const [selectedBill, setSelectedBill] = useState(null);
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
    }, [])
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });


    const column = [

        { title: 'ID', dataIndex: '_id' },
        { title: 'Customer Name', dataIndex: 'customerName' },
        { title: 'Contact No.', dataIndex: 'customerContact' },
        { title: 'Total Amount', dataIndex: 'totalAmount' },
        { title: 'Subtotal', dataIndex: 'subTotal' },
        { title: 'Tax', dataIndex: 'tax' },
        {
            title: 'Actions', dataIndex: '_id', render: (id, record) =>
                <div>
                    <EyeOutlined style={{ cursor: "pointer" }}
                        onClick={() => {
                            setSelectedBill(record);
                            setPopUpModel(true);
                        }} />

                </div>
        }
    ];
    console.log(selectedBill)
    return (
        <DefaultLayout>
            <h1>Bills page</h1>

            <div className="d-flex justify-content-between">
                <h1>Invoice list</h1>

            </div>
            <Table columns={column} dataSource={billsData} bordered pagination={false} />
            {
                popUpModel && (

                    <Modal title="Invoice Details" open={popUpModel} onCancel={() => {
                        setPopUpModel(false)
                    }}
                        footer={false}>
                        <div id="invoice-POS" ref={componentRef}>
                            <center id="top">
                                <div className="logo" />
                                <div className="info">
                                    <h2>NitTech POS</h2>
                                    <p> Contact : 9200045846 | Jaipur Rajasthan</p>
                                </div>
                                {/*End Info*/}
                            </center>
                            {/*End InvoiceTop*/}
                            <div id="mid">
                                <div className="mt-2">
                                    <p>
                                        Customer Name : <b>{selectedBill.customerName}</b>
                                        <br />
                                        Phone No : <b>{selectedBill.customerContact}</b>
                                        <br />
                                        Date : <b>{selectedBill.date.toString().substring(0, 10)}</b>
                                        <br />
                                    </p>
                                    <hr style={{ margin: "5px" }} />
                                </div>
                            </div>
                            {/*End Invoice Mid*/}
                            <div id="bot">
                                <div id="table">
                                    <table>
                                        <tbody>
                                            <tr className="tabletitle">
                                                <td className="item">
                                                    <h2>Item</h2>
                                                </td>
                                                <td className="Hours">
                                                    <h2>Qty</h2>
                                                </td>
                                                <td className="Rate">
                                                    <h2>Price</h2>
                                                </td>
                                                <td className="Rate">
                                                    <h2>Total</h2>
                                                </td>
                                            </tr>
                                            {selectedBill.cartItems.map((item) => (
                                                <>
                                                    <tr className="service">
                                                        <td className="tableitem">
                                                            <p className="itemtext">{item.name}</p>
                                                        </td>
                                                        <td className="tableitem">
                                                            <p className="itemtext">{item.quantity}</p>
                                                        </td>
                                                        <td className="tableitem">
                                                            <p className="itemtext">{item.price}</p>
                                                        </td>
                                                        <td className="tableitem">
                                                            <p className="itemtext">
                                                                {item.quantity * item.price}
                                                            </p>
                                                        </td>
                                                    </tr>
                                                </>
                                            ))}

                                            <tr className="tabletitle">
                                                <td />
                                                <td />
                                                <td className="Rate">
                                                    <h2>tax</h2>
                                                </td>
                                                <td className="payment">
                                                    <h2>${selectedBill.tax}</h2>
                                                </td>
                                            </tr>
                                            <tr className="tabletitle">
                                                <td />
                                                <td />
                                                <td className="Rate">
                                                    <h2>Grand Total</h2>
                                                </td>
                                                <td className="payment">
                                                    <h2>
                                                        <b>${selectedBill.totalAmount}</b>
                                                    </h2>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                {/*End Table*/}
                                <div id="legalcopy">
                                    <p className="legal">
                                        <strong>Thank you for your order!</strong> 10% GST application
                                        on total amount.Please note that this is non refundable amount
                                        for any assistance please write email
                                        <b> help@mydomain.com</b>
                                    </p>
                                </div>
                            </div>
                            {/*End InvoiceBot*/}
                        </div>
                        {/*End Invoice*/}
                        <div className="d-flex justify-content-end mt-3">
                            <Button type="primary" onClick={handlePrint}>
                                Print
                            </Button>
                        </div>
                    </Modal>
                )
            }
        </DefaultLayout>
    )
}

export default Billspage
