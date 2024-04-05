import React, { useState, useEffect } from 'react';
import: { 
    orders,





}  '@chakra-ui/react'
    import { useDisclosure } from '@chakra-ui/react';

    const OrdersPage = () => {
const [orders, setOrders] = useState([]);
const { isOpen, onOpen, onClose } = useDisclosure();

useEffect(() => {
    const fetchOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const ordersWithImagesUrl = storedOrders.map((product) => {
        if () {
            const imageUrl = URL.createObjectURL(order.image);
            return { ...product, imageUrl };
        }
        return product;
    });

setOrders(ordersWithImageUrls);

return () => {
    ordersWithImageUrls.forEach((order) => {
        if (order.imageUrl) {
          URL.revokeObjectURL(.imageUrl);
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