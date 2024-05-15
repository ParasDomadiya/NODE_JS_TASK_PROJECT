import React, { useState, useEffect } from 'react';   
import axios from 'axios';

const OrdersList = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://your-api-url/orders');
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handleDeleteOrder = async (orderId) => {
        try {
            await axios.delete(`http://your-api-url/orders/${orderId}`);
            fetchOrders(); // Refresh the orders list after deletion
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    return (
        <div>
            <h1>Orders List</h1>
            <ul>
                {orders.map(order => (
                    <li key={order._id}>
                        {order.name} - {order.productName} - ${order.price}
                        <button onClick={() => handleDeleteOrder(order._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrdersList;
