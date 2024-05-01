import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { IoMdTrash, IoMdAdd, IoMdRemove } from "react-icons/io";
import Button from "react-bootstrap/Button";
import Navbar_customer from "../../components/Navbar_customer";
import { Link } from 'react-router-dom';


const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        fetchCartItems();
    }, []);

    useEffect(() => {
        calculateTotalPrice();
    }, [cartItems]);

    const fetchCartItems = async () => {
        try {
            const response = await fetch("http://localhost:8000/cart");
            const data = await response.json();
            setCartItems(data.items);
        } catch (error) {
            console.error("Error fetching cart items:", error);
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            await fetch(`http://localhost:8000/cart/remove/${itemId}`, {
                method: "DELETE",
            });
            setCartItems(cartItems.filter(item => item.itemId !== itemId));
        } catch (error) {
            console.error("Error removing item from cart:", error);
        }
    };

    const increaseQuantity = async (itemId) => {
        try {
            const response = await fetch(`http://localhost:8000/cart/increase/${itemId}`, {
                method: "PUT",
            });
            if (response.ok) {
                const updatedItem = cartItems.find(item => item.itemId === itemId);
                updatedItem.quantity += 1;
                setCartItems([...cartItems]);
            }
        } catch (error) {
            console.error("Error increasing item quantity:", error);
        }
    };

    const decreaseQuantity = async (itemId) => {
        try {
            const response = await fetch(`http://localhost:8000/cart/decrease/${itemId}`, {
                method: "PUT",
            });
            if (response.ok) {
                const updatedItem = cartItems.find(item => item.itemId === itemId);
                if (updatedItem.quantity > 0) {
                    updatedItem.quantity -= 1;
                    setCartItems([...cartItems]);
                }
            }
        } catch (error) {
            console.error("Error decreasing item quantity:", error);
        }
    };

    const placeOrder = async () => {
        try {
            // Calculate total bill
            let totalBill = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);

            // Apply loyalty discount (5%)
            const loyaltyDiscount = totalBill * 0.05;
            totalBill -= loyaltyDiscount;

            // Handle delivery fee
            let deliveryFee = 0;
            if (deliveryType === 'delivery') {
                // Calculate delivery fee based on distance
                // Replace this with your own logic to calculate delivery fee
                deliveryFee = calculateDeliveryFee();
            }

            // Update total bill with delivery fee
            totalBill += deliveryFee;

            // Implement logic to place the order here
            console.log("Order placed with total bill:", totalBill);
        } catch (error) {
            console.error("Error placing order:", error);
        }
    };

    // Placeholder function to calculate delivery fee
    const calculateDeliveryFee = () => {
        // Replace this with your own logic to calculate delivery fee
        return 5; // Example delivery fee
    };

    const calculateTotalPrice = () => {
        const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotalPrice(total);
        return total;
    };

    

    return (
        <div style={{ backgroundColor: 'black' }}>
            <Navbar_customer />
            <div>
                <br />
                <h1 className="shopping cart" style={{textAlign:"center", color:"white"}}>Shopping Cart</h1>
                <div className="table-container" style={{display:"flex", justifyContent:"center"}}>
                    <Table striped bordered hover className="mt-4" style={{width:"1200px"}}>
                        <thead>
                            <tr align='center'>
                                <th>Item ID</th>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) => (
                                <tr key={item._id}>
                                    <td>{item.itemId}</td>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price}</td>
                                    <td style={{display:'flex', justifyContent:'center'}}>
                                        <Button variant="success" style={{marginRight:'5px'}} onClick={() => increaseQuantity(item.itemId)}>
                                            <IoMdAdd />
                                        </Button>
                                        <Button variant="danger" style={{marginRight:'5px'}} onClick={() => decreaseQuantity(item.itemId)}>
                                            <IoMdRemove />
                                        </Button>
                                        <Button variant="danger" onClick={() => removeFromCart(item.itemId)}>
                                            <IoMdTrash />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
                <div className="details" style={{color:'white', justifyContent:'center',textAlign:'center'}}>
                    <div className="tot">
                        Total Amount : {totalPrice}
                    </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                <Button variant="primary" onClick={placeOrder} style={{ marginTop: '20px' }}>
                    Check Out
                </Button>

                </div>
            </div>
        </div>
    );
};

export default Cart;