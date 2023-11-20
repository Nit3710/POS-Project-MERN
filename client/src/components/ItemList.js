import React from 'react'
import { Button, Card } from 'antd';
import { useDispatch } from 'react-redux';

const ItemList = ({ item }) => {
  const dispatch = useDispatch();
  const handleAddtocart = () => {
dispatch({
  type:'ADD_TO_CART',
  payload:{...item,quantity:1}
})
  }
  const { Meta } = Card;
  return (
    <div>
      <Card
        hoverable
        style={{ width: 240, marginBottom: 20 }}
        cover={<img alt={item.name} src={item.image} style={{ height: 230 }} />}
      >
        <Meta title={item.name} />
        <div className='item-button'>
          <Button onClick={()=>handleAddtocart()}>Add to cart</Button>

        </div>
      </Card>
    </div>
  )
}

export default ItemList

