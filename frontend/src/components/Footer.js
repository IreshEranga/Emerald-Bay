import React from 'react';

function Footer() {
    return (
        <footer>
            <div className="footer-container">
                <div className="footer-contact-info">
                    <center><h3>Contact Us</h3></center>
                    <center><p>123 Emerald Bay Drive</p></center>
                    <center><p>Emerald City, State</p></center>
                    <center><p>Phone: (123) 456-7890</p></center>
                    <center><p>Email: info@emeraldbayrestaurant.com</p></center>

                    <center><h3>FAQ</h3></center>
                </div>
                <div className="footer-social-links">
                    <h3>Follow Us</h3>
                    <ul>
                        <li><a href="#">Facebook</a></li>
                        <li><a href="#">Twitter</a></li>
                        <li><a href="#">Instagram</a></li>
                    </ul>
                </div>
                <div className="footer-opening-hours">
                    <h3>Opening Hours</h3>
                    <p>Monday - Friday: 11:00 AM - 10:00 PM</p>
                    <p>Saturday - Sunday: 10:00 AM - 11:00 PM</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Emerald Bay Restaurant. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
