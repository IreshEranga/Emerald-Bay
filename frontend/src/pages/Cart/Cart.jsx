import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { IoMdTrash, IoMdAdd, IoMdRemove } from "react-icons/io";
import Button from "react-bootstrap/Button";
import Navbar_customer from "../../components/Navbar_customer";


const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await fetch("http://localhost:8000/cart");
                const data = await response.json();
                setCartItems(data.items);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };

        fetchCartItems();
    }, []);

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
            </div>
        </div>
    );
};

export default Cart;