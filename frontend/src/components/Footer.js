import React from 'react';
import './Footer.css'; // Importing CSS file for styles


import { FaPhone, FaEnvelope } from 'react-icons/fa';

function Footer() {
    return (
        <footer>
            <div className="footer-container">
                <div className="footer-contact-info">
                    <h3>Contact Us</h3>
                    <p>123 Delicious St, Cityville, Country</p>
                    <p><FaPhone className="icon" /> : <a href="tel:+1234567890">+1 234 567 890</a></p>
                    <p><FaEnvelope className="icon" /> : <a href="mailto:info@restaurant.com">info@restaurant.com</a></p>
                </div>
                <div className="footer-social-links">
                    <h3>Follow Us On</h3>
                    <ul>
                        <li><a href="https://www.facebook.com/restaurant">Facebook</a></li>
                        <li><a href="https://twitter.com/restaurant">Twitter</a></li>
                        <li><a href="https://www.instagram.com/restaurant">Instagram</a></li>
                    </ul>
                </div>
                <div className="footer-opening-hours">
                    <h3>Opening Hours</h3>
                    <p>Monday - Friday: 08:00 AM - 10:00 PM</p>
                    <p>Saturday - Sunday: 07:00 AM - 11:00 PM</p>
                </div>
                <div className="footer-faq">
                    <h3><a href="/faq">FAQ</a></h3> {/* Link to FAQPage */}
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Restaurant Name. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
