import React, { useState, useEffect } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { Col, Row } from 'antd';
import axios from 'axios';
import ItemList from '../components/ItemList';
import { useDispatch } from 'react-redux';
const Homepage = () => {
    const [itemsData, setitemsData] = useState([]);
    const [selectCategory, setSelectCategory] = useState('drinks');
    const categories = [
        {
            name: 'drink',
            imageUrl: 'https://th.bing.com/th?q=Drinks+for+Kids&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.4&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247'
        },
        {
            name: 'rice',
            imageUrl: 'https://th.bing.com/th/id/OIP.9YFlKm1NzudptkTStv9MHgHaHa?w=182&h=182&c=7&r=0&o=5&dpr=1.4&pid=1.7'
        },
        {
            name: 'noodles',
            imageUrl: 'https://th.bing.com/th/id/OIP.vmDFQvUf5NqP8cQxN5S52QHaHa?w=189&h=189&c=7&r=0&o=5&dpr=1.4&pid=1.7'
        }
    ]
    const dispatch = useDispatch();
    useEffect(() => {
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
                console.log(error);
            }
        }
        getallItems();
    }, [dispatch]);
    return (
        <DefaultLayout>
            <div className='d-flex'>
                {
                    categories.map((category) => (
                        <div key={category.name} className={`d-flex category ${selectCategory === category.name && 'category-active'}`} onClick={() => setSelectCategory(category.name)}>
                            <h4>{category.name}</h4>
                            <img src={category.imageUrl} alt={category.name} height={40} width={60} />
                        </div>))}
            </div>
            <Row>
                {
                    itemsData.filter((i) => i.category === selectCategory).map(item => (
                        <Col xs={24} lg={6} md={12} sm={6}>
                            <ItemList key={item.id} item={item} />
                        </Col>
                    ))
                }
            </Row>
        </DefaultLayout>
    )
}

export default Homepage
