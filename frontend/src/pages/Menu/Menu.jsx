import React, { useState, useEffect } from "react";
import NavBar from '../../components/Navbar';
import './Menu.css';

const Menu = () => {
    const [menuItems, setMenuItems] = useState({});

    useEffect(() => {
        // Fetch items for each category
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
            <NavBar />
            <div className="outer-container5">
                <div className="menu-container">
                    <br /><br />
                    <h1 className="menu-title">Our Menu</h1><br />
                    
                    {Object.entries(menuItems).map(([category, items]) => (
                        <div key={category} className="category">
                            <br />
                            <h2 className="center-heading1">{category}</h2>
                            <div className="names"></div>
                            {items && items.map((item, index) => (
                                <ul className="menu-list" key={index}>
                                    <li className="menu-item">{item.name} <span className="price">{item.price}</span></li>
                                </ul>
                            ))}
                        </div>
                    ))}
                    
                </div><br></br>
            </div>
        </div>
    );
};

export default Menu;
