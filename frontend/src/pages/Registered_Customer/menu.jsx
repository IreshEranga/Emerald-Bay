import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa"; // Importing the "+" icon from React Icons
import Navbar_customer from "../../components/Navbar_customer";


const Customer_Menu = () => {
    const [menuItems, setMenuItems] = useState({});

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
                            <div className="menu-items-container" style={{display:'flex'}}> {/* Flex container for items */}
                                {items && items.map((item, index) => (
                                    <div className="menu-item-container" key={index} style={{ marginRight: '20px', position: 'relative', border: '1px solid white', padding: '10px', width: '150px', height: '170px'}}>
                                        <div className="menu-item-details">
                                            <h3 className="menu-item-name" style={{color:'white', fontSize:'18px', fontFamily:'inherit'}}>{item.name}</h3>
                                            <p className="menu-item-description" style={{color:'white', fontSize:'15px'}}>{item.description}</p> {/* Adding item description */}
                                            <span className="menu-item-price" style={{color:'white', fontSize:'15px'}}>Rs.{item.price}</span>
                                        </div>
                                        <button className="add-to-cart-button" style={{position: 'absolute', top: '-10px', right: '-10px'}}><FaPlus /></button> {/* Adding "+" icon button */}
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
