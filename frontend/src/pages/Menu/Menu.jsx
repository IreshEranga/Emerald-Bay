import React, { useState, useEffect } from "react";
import NavBar from '../../components/Navbar';
import './Menu.css';

const Menu = () => {
    const [menuItems, setMenuItems] = useState({});

    useEffect(() => {
        const fetchItemsByCategory = async () => {
            try {
                const response = await fetch(`http://localhost:8000/item/get/${selectedCategory}`);
                const data = await response.json();
                setMenuItems(data.items);
            } catch (error) {
                console.error('Error fetching items by category:', error);
            }

            setMenuItems(itemsByCategory);
        };

        if (selectedCategory) {
            fetchItemsByCategory();
        }
    }, [selectedCategory]);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    return (
        <div style={{ backgroundColor: 'black' }}>
            <NavBar />
            <div className="outer-container5">
                <div className="menu-container">
                    <br /><br />
                    <h1 className="menu-title">Our Menu</h1><br />
                    <div className="categories">
                        <h2 className="center-heading1">Beverages</h2>
                        {selectedCategory === 'Beverages' && (
                            <ul className="menu-list">
                                {menuItems.map((item, index) => (
                                    <li className="menu-item" key={index}>
                                        {item.name} <span className="price">{item.price}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    {/* Repeat the above pattern for other categories */}
                    {/* Side Dishes */}
                    <div className="categories">
                        <h2 className="center-heading1">Side Dishes</h2>
                        {selectedCategory === 'Side Dishes' && (
                            <ul className="menu-list">
                                {menuItems.map((item, index) => (
                                    <li className="menu-item" key={index}>
                                        {item.name} <span className="price">{item.price}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    {/* Soups */}
                    <div className="categories">
                        <h2 className="center-heading1">Soups</h2>
                        {selectedCategory === 'Soups' && (
                            <ul className="menu-list">
                                {menuItems.map((item, index) => (
                                    <li className="menu-item" key={index}>
                                        {item.name} <span className="price">{item.price}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    {/* Salads */}
                    <div className="categories">
                        <h2 className="center-heading1">Salads</h2>
                        {selectedCategory === 'Salads' && (
                            <ul className="menu-list">
                                {menuItems.map((item, index) => (
                                    <li className="menu-item" key={index}>
                                        {item.name} <span className="price">{item.price}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    {/* Rices */}
                    <div className="categories">
                        <h2 className="center-heading1">Rices</h2>
                        {selectedCategory === 'Rices' && (
                            <ul className="menu-list">
                                {menuItems.map((item, index) => (
                                    <li className="menu-item" key={index}>
                                        {item.name} <span className="price">{item.price}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    {/* Desserts */}
                    <div className="categories">
                        <h2 className="center-heading1">Desserts</h2>
                        {selectedCategory === 'Desserts' && (
                            <ul className="menu-list">
                                {menuItems.map((item, index) => (
                                    <li className="menu-item" key={index}>
                                        {item.name} <span className="price">{item.price}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Menu;
