import React, { useState, useEffect } from "react";
import NavBar from '../../components/Navbar';
import './Menu.css';


const Menu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        // Fetch items for the selected category
        const fetchItemsByCategory = async () => {
            if (selectedCategory) {
                try {
                    const response = await fetch(`http://localhost:8000/item/get/${selectedCategory}`);
                    const data = await response.json();
                    setMenuItems(data.items);
                } catch (error) {
                    console.error('Error fetching items by category:', error);
                }
            }
        };

        fetchItemsByCategory();
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
                    <div className="category"><br />
                        <h2 className="center-heading1">Beverages</h2>
                        <div className="names" handleCategorySelect={'Beverages'}></div>
                        {selectedCategory === 'Beverages' && menuItems.map((item, index) => (
                            <ul className="menu-list" key={index}>
                                <li className="menu-item">{item.name} <span className="price">{item.price}</span></li>
                            </ul>
                        ))}
                    </div>
                    <div className="category"><br />
                        <h2 className="center-heading1">Side Dishes</h2>
                        <button onClick={() => handleCategorySelect('Side Dishes')}>Select Beverages</button>
                        {selectedCategory === 'Side Dishes' && menuItems.map((item, index) => (
                            <ul className="menu-list" key={index}>
                                <li className="menu-item">{item.name} <span className="price">{item.price}</span></li>
                            </ul>
                        ))}
                    </div>
                    <div className="category"><br />
                        <h2 className="center-heading1">Soups</h2>
                        <button onClick={() => handleCategorySelect('Soups')}>Select Beverages</button>
                        {selectedCategory === 'Soups' && menuItems.map((item, index) => (
                            <ul className="menu-list" key={index}>
                                <li className="menu-item">{item.name} <span className="price">{item.price}</span></li>
                            </ul>
                        ))}
                    </div>
                    <div className="category"><br />
                        <h2 className="center-heading1">Salads</h2>
                        <button onClick={() => handleCategorySelect('Salads')}>Select Beverages</button>
                        {selectedCategory === 'Salads' && menuItems.map((item, index) => (
                            <ul className="menu-list" key={index}>
                                <li className="menu-item">{item.name} <span className="price">{item.price}</span></li>
                            </ul>
                        ))}
                    </div>
                    <div className="category"><br />
                        <h2 className="center-heading1">Rices</h2>
                        <button onClick={() => handleCategorySelect('Rices')}>Select Beverages</button>
                        {selectedCategory === 'Rices' && menuItems.map((item, index) => (
                            <ul className="menu-list" key={index}>
                                <li className="menu-item">{item.name} <span className="price">{item.price}</span></li>
                            </ul>
                        ))}
                    </div>
                    <div className="category"><br />
                        <h2 className="center-heading1">Deserts</h2>
                        <button onClick={() => handleCategorySelect('Desserts')}>Select Beverages</button>
                        {selectedCategory === 'Desserts' && menuItems.map((item, index) => (
                            <ul className="menu-list" key={index}>
                                <li className="menu-item">{item.name} <span className="price">{item.price}</span></li>
                            </ul>
                        ))}
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default Menu;