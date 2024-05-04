import React, { useState, useEffect } from 'react';
import Navbar_customer from '../../components/Navbar_customer';
import { useAuthStore } from '../../store/useAuthStore';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Toast from '../../utils/toast';

const Payment = ({ totalAmountProp }) => {
  const { user } = useAuthStore();
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cardType, setCardType] = useState('credit'); // Default to credit card
  const [cvv, setCvv] = useState('');
  const [cardNumber, setCardNumber] = useState('');

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (!user || !user._id) {
          throw new Error('User ID not available');
        }

        const response = await fetch(`http://localhost:8000/customer/get/${user._id}`, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }

        const data = await response.json();
        setProfileData(data.user);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    const fetchCartItems = async () => {
      try {
        const response = await fetch("http://localhost:8000/cart");
        const data = await response.json();
        setCartItems(data.items);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    if (user) {
      fetchProfileData();
      fetchCartItems();
    }
  }, [user]);

  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
      setTotalPrice(total);
      return total;
    };

    calculateTotalPrice();
  }, [cartItems]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate card number
      if (!validateCardNumber(cardNumber)) {
        throw new Error('Invalid card number. Card number must have 12 digits.');
      }

      // Create an array of item names
      const itemNames = cartItems.map(item => item.name);

      // Proceed with creating the order
      const response = await fetch('http://localhost:8000/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerid: profileData?.customerId,
          customername: profileData?.name,
          deliveryaddress: deliveryAddress,
          items: itemNames,
          totalprice: totalPrice,
          cvv: cvv,
          cardNumber: cardNumber,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const data = await response.json();
      console.log('Order created:', data);
      Toast({ type: 'success', message: 'Payment successfully' });
    } catch (error) {
      console.error('Error creating order:', error);
      Toast({ type: 'error', message: error.message });
    }
  };

  const handleCardTypeChange = (type) => {
    setCardType(type);
  };

  const validateCardNumber = (number) => {
    return /^\d{12}$/.test(number);
  };

  return (
    <div>
      <Navbar_customer />

      <div className="paymentform" style={{ border: '1px solid black', width: '75%', marginLeft: '200px', padding: '30px' }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Customer Id</Form.Label>
            <Form.Control type="text" value={profileData?.customerId} readOnly />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Customer Name</Form.Label>
            <Form.Control type="text" value={profileData?.name} readOnly />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Delivery Address</Form.Label>
            <Form.Control type="text" value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Items</Form.Label>
            <Form.Control type="text" value={cartItems.map(item => item.name).join(', ')} readOnly />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Select Card Type</Form.Label>
            <Form.Select onChange={(e) => handleCardTypeChange(e.target.value)}>
              <option value="credit">Credit Card</option>
              <option value="debit">Debit Card</option>
            </Form.Select>
          </Form.Group>

          {cardType === 'credit' && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Credit Card Number</Form.Label>
                <Form.Control type="text" placeholder="Enter credit card number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>CVV</Form.Label>
                <Form.Control type="password" maxLength="3" placeholder="Enter CVV" value={cvv} onChange={(e) => setCvv(e.target.value)} />
              </Form.Group>
            </>
          )}

          {cardType === 'debit' && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Debit Card Number</Form.Label>
                <Form.Control type="text" placeholder="Enter debit card number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
              </Form.Group>
            </>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Total Amount</Form.Label>
            <Form.Control type="text" value={totalPrice} readOnly />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Payment;
