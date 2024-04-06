import React, { useState, useEffect } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import: { 
    orders,
}  

    const OrdersPage = () => {
const [orders, setOrders] = useState([]);
const { isOpen, onOpen, onClose } = useDisclosure();

useEffect(() => {
    const setOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const ordersWithImagesUrl = storedOrders.map((product) => {
        if () {
            const imageUrl = URL.createObjectURL(order.image);
            return { ...order, imageUrl };
        }
        return product;
    });

setOrders(ordersWithImageUrls);
} 
return () => {
    orders.forEach((order) => {
        if (order.imageUrl) {
          URL.revokeObjectURL(order.imageUrl);
}

})}

return (
<box>
<button>
    order
</button>
</box>

{orders.map}


)


export default OrdersPage;


//mongodb://localhost:27017