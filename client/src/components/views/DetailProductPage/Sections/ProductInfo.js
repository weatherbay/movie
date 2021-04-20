import React, { useEffect, useState } from 'react'
import { Button, Descriptions } from 'antd';

function ProductInfo(props) {

    const [Product, setProduct] = useState({})
    const [ticket, setticket] = useState('1')

    useEffect(() => {

        setProduct(props.detail)

    }, [props.detail])

    const addToCarthandler = () => {
        const data = {
            ticket:ticket
        }
        props.addToCart(props.detail._id,data)
    }

    const onticketChange = (event) => {
        setticket(event.currentTarget.value)
    }


    return (
        <div>
            <Descriptions title="Movie Info">
                <Descriptions.Item label="Price"> {Product.price}</Descriptions.Item>
                <Descriptions.Item label=" Ticket Sold">{Product.sold}</Descriptions.Item>
                <Descriptions.Item label="Description"> {Product.description}</Descriptions.Item>
                <Descriptions.Item label="Ticket">
                <select name={ticket}onChange={onticketChange} value={ticket}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                </select>
                </Descriptions.Item>
            </Descriptions>

            <br />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button size="large" shape="round" type="danger"
                    onClick={addToCarthandler}
                >
                    Add Movie
                    </Button>
            </div>
        </div>
    )
}

export default ProductInfo
