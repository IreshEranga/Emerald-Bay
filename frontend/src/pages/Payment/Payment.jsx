import React, { useState, useEffect } from "react";
import { Table, Button, Form } from "react-bootstrap";
import { IoMdTrash } from "react-icons/io";
import { Link } from "react-router-dom";
import { button } from "react-bootstrap";
import Navbar_customer from "../../components/Navbar_customer";

const Payment = ({ cartItems }) => {
    const [deliveryOption, setDeliveryOption] = useState("dine-in");
    const [loyaltyDiscount, setLoyaltyDiscount] = useState(0);

    // Calculate total payment amount
    const calculateTotalPayment = () => {
        let total = 0;
        cartItems.forEach(item => {
            total += item.price * item.quantity;
        });
        // Apply loyalty discount if applicable
        if (isLoyaltyCustomer()) {
            total *= 0.95; // Apply 5% discount
        }
        return total;
    };

    const isLoyaltyCustomer = () => {
        
        return true; 
    };

    const handlePlaceOrder = () => {
    };
    
const Payment = () => {
    const [paymentMethod, setPaymentMethod] = useState("creditCard");
        
    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
    };
        
    const handlePayment = () => {
        console.log("Payment processed successfully");
    };
        
            return (
                <div style={{ backgroundColor: "black" }}>
                    <Navbar_customer />
                    <div>
                        <br />
                        <h1 className="payment" style={{ textAlign: "center", color: "white" }}>
                            Payment
                        </h1>
                        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                            <div>
                                <label>
                                    <input
                                        type="radio"
                                        value="creditCard"
                                        checked={paymentMethod === "creditCard"}
                                        onChange={() => handlePaymentMethodChange("creditCard")}
                                    />
                                    Credit Card
                                </label>
                                <br />
                                
                                <label>
                                    <input
                                        type="radio"
                                        value="debitCard"
                                        checked={paymentMethod === "debitCard"}
                                        onChange={() => handlePaymentMethodChange("debitCard")}
                                    />
                                    Debit Card
                                </label>
                                <br />
                                <label>
                                    <input
                                        type="radio"
                                        value="cash"
                                        checked={paymentMethod === "cash"}
                                        onChange={() => handlePaymentMethodChange("cash")}
                                    />
                                    Cash on Delivery
                                </label>
                            </div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                            <Button variant="primary" onClick={handlePayment}>
                                Proceed to Pay
                            </Button>
                        </div>
                        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                            <Link to="/cart">
                                <Button variant="secondary">Go Back to Cart</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            );
        };
        return (
            <div>
                <h1>Review Your Order</h1>
                <Table striped bordered hover>
                    {/* Table to display cart items */}
                </Table>
                <div>
                    <h2>Select Delivery Option:</h2>
                    <Form.Check className="boldWhiteText"
                        type="radio"
                        label="Dine-in"
                        name="deliveryOption"
                        id="dine-in"
                        checked={deliveryOption === "dine-in"}
                        onChange={() => setDeliveryOption("dine-in")}
                    />
                    <Form.Check
                        type="radio"
                        label="Takeaway"
                        name="deliveryOption"
                        id="takeaway"
                        checked={deliveryOption === "takeaway"}
                        onChange={() => setDeliveryOption("takeaway")}
                    />
                    <Form.Check
                        type="radio"
                        label="Delivery"
                        name="deliveryOption"
                        id="delivery"
                        checked={deliveryOption === "delivery"}
                        onChange={() => setDeliveryOption("delivery")}
                    />
                </div>
                <div>
                    <h2>Total Payment Amount: ${calculateTotalPayment().toFixed(2)}</h2>
                </div>
                <Button variant="primary" onClick={handlePlaceOrder}>
                    Place Order
                </Button>
            </div>
        );    
};

export default Payment;
