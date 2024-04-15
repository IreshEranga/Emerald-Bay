import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import Navbar_customer from "../../components/Navbar_customer";


const Customer_Menu = () => {
    const [menuItems, setMenuItems] = useState({});
    const [cartItems, setCartItems] = useState([]);

    const addToCart = async (item) => {
        try {
            const response = await fetch("http://localhost:8000/cart/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...item, quantity: 1 }), // Set default quantity to 1
            });
            const data = await response.json();
            if (data.success) {
                alert("Item added to cart successfully!");
                setCartItems([...cartItems, { ...item, quantity: 1 }]); // Update cart items state locally
            } else {
                alert("Failed to add item to cart");
            }
        } catch (error) {
            console.error("Error adding item to cart:", error);
            alert("Failed to add item to cart");
        }
    };

    useEffect(() => {
        const fetchItemsByCategory = async () => {
            const categories = ['Beverages', 'Side Dishes', 'Soups', 'Salads', 'Rices', 'Desserts'];
            const itemsByCategory = {};

            for (const category of categories) {
                try {
                    const response = await fetch(`http://localhost:8000/item/get/${category}`);
                    const data = await response.json();
                    itemsByCategory[category] = data.items;
                } catch (error) {
                    console.error(`Error fetching items for category ${category}:`, error);
                }
            }

            setMenuItems(itemsByCategory);
        };

        fetchItemsByCategory();
    }, []);

    return (
        <div style={{ backgroundColor: 'black' }}>
            <Navbar_customer />
            <div className="outer-container5">
                <div className="menu-container">
                    <br /><br />
                    <h1 className="menu-title">Our Menu</h1><br />
                    
                    {Object.entries(menuItems).map(([category, items]) => (
                        <div key={category} className="category">
                            <br />
                            <h2 className="center-heading1" style={{fontSize:'32px', color:'beige', fontFamily:'cursive'}}>{category}</h2><br></br>
                            <div className="menu-items-container" style={{display:'flex'}}> 
                                {items && items.map((item, index) => (
                                    <div className="menu-item-container" key={index} style={{ marginRight: '20px', position: 'relative', border: '1px solid white', padding: '10px', width: '150px', height: '170px'}}>
                                        <div className="menu-item-details">
                                            <h3 className="menu-item-name" style={{color:'white', fontSize:'18px', fontFamily:'inherit'}}>{item.name}</h3>
                                            <p className="menu-item-description" style={{color:'white', fontSize:'15px'}}>{item.description}</p>
                                            <span className="menu-item-price" style={{color:'white', fontSize:'15px'}}>Rs.{item.price}</span>
                                        </div>
                                        <button className="add-to-cart-button" style={{position: 'absolute', top: '-10px', right: '-10px'}} onClick={() => addToCart(item)}><FaPlus /></button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    
                </div><br></br>
            </div>
        </div>
    );
};

export default Customer_Menu;