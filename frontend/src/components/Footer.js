import React from 'react';
import { FaPhone, FaEnvelope } from 'react-icons/fa';


function Footer() {
    return (
        <footer>
            <div className="footer-container">
                <div className="footer-contact-info">
                    <center><h3>Contact Us</h3></center>
                    <center><p>Badugoda Junction, Harbour Road, Mirissa.</p></center>
                    <center><p><FaPhone className="icon" /> : <a href="tel:+94772120231">+94 772120231</a></p></center>
                    <center><p><FaEnvelope className="icon" /> : <a href="mailto:emeraldbayresortmirissa@gmail.com">emeraldbayresortmirissa@gmail.com</a></p></center>

                    <center><h3>FAQ</h3></center>
                </div>
                <div className="footer-social-links" style={{marginLeft:'120px'}}>
                    <h3>Follow Us</h3>
                    <ul>
                        <li><a href="https://www.facebook.com/profile.php?id=61552540748705&mibextid=LQQJ4d">Facebook</a></li>
                        <li><a href="#">Twitter</a></li>
                        <li><a href="#">Instagram</a></li>
                    </ul>
                </div>
                <div className="footer-opening-hours">
                    <h3>Opening Hours</h3>
                    <p>Monday - Friday: 08:00 AM - 10:00 PM</p>
                    <p>Saturday - Sunday: 07:00 AM - 11:00 PM</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Emerald Bay Restaurant. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;