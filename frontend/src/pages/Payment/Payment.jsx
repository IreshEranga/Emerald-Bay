/*import React, { useState, useEffect } from 'react';
import Navbar_customer from '../../components/Navbar_customer';
import { useAuthStore } from '../../store/useAuthStore';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Toast from '../../utils/toast';

const Payment = ({totalAmountProp}) => {
  const { user } = useAuthStore();
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [cartData, setCartData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [itemNames, setItemNames] = useState([]); // Moved itemNames state outside useEffect
  const [selectedItemNames, setSelectedItemNames] = useState([]); // State for selected item names



  const [cartItems, setCartItems] = useState([]);
  const [totalAmountState, setTotalAmountState] = useState(0); // State for totalAmount
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    calculateTotalPrice();
}, [cartItems]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        console.log('User ID:', user?._id);

        if (!user || !user._id) {
          throw new Error('User ID not available');
        }

        const response = await fetch(`http://localhost:8000/customer/get/${user._id}`, {
          method: 'GET',
        });

        console.log('Response status:', response.status); // Log response status

        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }

        const data = await response.json();
        console.log('Data from backend:', data); // Log data received from backend
        setProfileData(data.user); // Assuming the data structure has a 'user' property
        setIsLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError(error.message);
        setIsLoading(false); // Set loading to false in case of error
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
    if (Array.isArray(cartData) && cartData.length > 0) {
      const names = cartData.reduce((acc, item) => [...acc, item.name], []);
      setItemNames(names);
    }
  }, [cartData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      // Calculate total amount based on cart items
      const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
      setTotalAmount(totalAmount);

      const response = await fetch('http://localhost:8000/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerid: profileData?.customerId,
          customername: profileData?.name,
          deliveryaddress: deliveryAddress,
          items: selectedItems,
          totalPrice: parseFloat(totalAmount), // Ensure total price is a number
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profileData) {
    return <div>No profile data available</div>;
  }
  const calculateTotalPrice = () => {
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total);
    return total;
};

  return (
    <div>
      <Navbar_customer />

      <div className="paymentform" style={{ border: '1px solid black', width: '75%', marginLeft: '200px', padding: '30px' }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Customer Id</Form.Label>
            <Form.Control type="text" value={profileData.customerId} readOnly />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Customer Name</Form.Label>
            <Form.Control type="text" value={profileData.name} readOnly />
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

export default Payment;*/

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
  const [totalAmount, setTotalAmount] = useState(0);
  const [cartData, setCartData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [itemNames, setItemNames] = useState([]); // Moved itemNames state outside useEffect
  const [selectedItemNames, setSelectedItemNames] = useState([]); // State for selected item names
  const [cartItems, setCartItems] = useState([]);
  const [totalAmountState, setTotalAmountState] = useState(0); // State for totalAmount
  const [totalPrice, setTotalPrice] = useState(0);

  const calculateTotalPrice = () => {
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total);
    return total;
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [cartItems]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        console.log('User ID:', user?._id);

        if (!user || !user._id) {
          throw new Error('User ID not available');
        }

        const response = await fetch(`http://localhost:8000/customer/get/${user._id}`, {
          method: 'GET',
        });

        console.log('Response status:', response.status); // Log response status

        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }

        const data = await response.json();
        console.log('Data from backend:', data); // Log data received from backend
        setProfileData(data.user); // Assuming the data structure has a 'user' property
        setIsLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError(error.message);
        setIsLoading(false); // Set loading to false in case of error
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
    if (Array.isArray(cartData) && cartData.length > 0) {
      const names = cartData.reduce((acc, item) => [...acc, item.name], []);
      setItemNames(names);
    }
  }, [cartData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const totalPrice = calculateTotalPrice(); // Assuming calculateTotalPrice() calculates the correct total price
  
      if (isNaN(totalPrice)) {
        throw new Error('Total price is not a valid number');
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
          totalprice: totalPrice, // Use totalPrice variable
        }),
      });
  
      if (!response.ok) {
        //throw new Error('Failed to create order');
        console.log(error);
        Toast({type:'error', message:error.message})
      }
  
      const data = await response.json();
      console.log('Order created:', data);
      Toast({ type: 'success', message: 'Payment successfully' });
    } catch (error) {
      console.error('Error creating order:', error);
      Toast({ type: 'error', message: error.message });
    }
  };
  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profileData) {
    return <div>No profile data available</div>;
  }

  return (
    <div>
      <Navbar_customer />

      <div className="paymentform" style={{ border: '1px solid black', width: '75%', marginLeft: '200px', padding: '30px' }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Customer Id</Form.Label>
            <Form.Control type="text" value={profileData.customerId} readOnly />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Customer Name</Form.Label>
            <Form.Control type="text" value={profileData.name} readOnly />
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

