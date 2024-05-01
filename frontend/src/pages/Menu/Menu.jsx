import React, { useState, useEffect } from "react";
import NavBar from '../../components/Navbar';
import './Menu.css';
import Footer from "../../components/Footer.js";
import { useAuthStore } from "../../store/useAuthStore";

const Menu = () => {
    const [menuItems, setMenuItems] = useState({});
    const { user } = useAuthStore();

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
            <div className="outer-container5"><br></br><br/>
                <div className="menu-container">
                    <br />
                    <div className="menuboard" >
                    <h1 className="menu-title">Our Menu</h1>
                    
                    {Object.entries(menuItems).map(([category, items]) => (
                        <div key={category} className="category">
                            <br />
                            <div className="category-heading">
                                <hr className="line" style={{height:'2px', backgroundColor:'white'}}/>
                                <h2 className="center-heading1">{category}</h2>
                                <hr className="line" style={{height:'2px', backgroundColor:'white'}}/>
                            </div>
                            {/*<h2 className="center-heading1" style={{fontWeight:'800px'}}>{category}</h2>
                            <hr className="horizontal-line" style={{height:'2px', backgroundColor:'white'}}/>*/}
                            <div className="names"></div>
                            {items && items.map((item, index) => (
                                <ul className="menu-list" key={index}>
                                    <li className="menu-item">{item.name} <span className="price">Rs. {item.price}</span></li>
                                </ul>
                            ))}
                        </div>
                    ))}
                    </div>
                    
                </div><br></br>
            </div><br/><br/>
            <Footer />
        </div>
    );
};

export default Menu;