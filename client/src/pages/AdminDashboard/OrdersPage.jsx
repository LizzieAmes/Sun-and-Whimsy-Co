
import React, { useState, useEffect } from 'react';
import { Box, useDisclosure } from '@chakra-ui/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import: { orderSchema } form '../models/order';


const OrdersPage = () => {
const [orders, setOrders] = useState([]);
const { isOpen, onOpen, onClose } = useDisclosure();

useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const ordersWithImagesUrl = storedOrders.map((order) => {
        if (order.imageUrl) {
            const imageUrl = URL.createObjectURL(order.imageUrl);
            return { ...orders, imageUrl };
        }
        return order;
    });

setOrders(ordersWithImageUrls);

return () => {
    orders.forEach((order) => {
        if (order.imageUrl) {
          URL.revokeObjectURL(order.imageUrl);
    }
   });
  };
}, []);
 
const styles = {
    containerStyles: {
        background: 'lightblue' ,
    },
};

return (
<Box style={styles.containerStyles} className="container">
<h1>Orders</h1>
<ul>
    {orders.map((order) => (
<li key={order._id}>
<strong>Order Date:</strong> {order.date}
<br />
<strong>User:</strong> {order.user.name}
<br />
<strong>Product:</strong> {order.product.name}
<br />
<strong>Status:</strong> {order.status}
<br />
//*Display other order details
{order.imageUrl && <img src={order.imageUrl} alt={order.product.name} />}
        </li>
    ))}
</ul>
</Box>
);
    };

export default OrdersPage;
