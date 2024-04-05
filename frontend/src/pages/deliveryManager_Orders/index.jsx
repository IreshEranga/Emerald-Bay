import React, { useState, useEffect }  from 'react'
import "./index.css"
import Button from "react-bootstrap/Button";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdEditSquare } from "react-icons/md";
import { BootstrapTable } from "../../components";
//import { useCategoryData } from "../../hooks/useCategoryData";


const index = () => {
  
      // Get the data from the react-query hook
  //const { data, refetch } = useCategoryData();

        // State to manage the current active section
  const [orders, setOrders] = useState([]);
  const [activeSection, setActiveSection] = useState('completed');
  const [selectedRider, setSelectedRider] = useState('');

  // Function to handle section change
  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
  };

  const handleRiderChange = (event) => {
    setSelectedRider(event.target.value);
  };

  useEffect(() => {
    // Function to fetch orders from your API or database
    const fetchOrders = async () => {
      try {
        // Make a fetch call or use axios or any other library to fetch data
        const response = await fetch('http://localhost:8000/order');
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders(); // Call the fetchOrders function when the component mounts
  }, []);


  const pendingOrders = orders.filter(order => order.status === 'pending');
  const completedOrders = orders.filter(order => order.status === 'completed');
  const ongoingOrders = orders.filter(order => order.status === 'ongoing');

return (
    <div style={{ display: 'flex' }}>
      <div className="ordercontainer" style={{ display: 'flex' }}>
        

        <div className="orderdash">
          <h1 className='name' style={{fontFamily:'monospace', textAlign:'left'}}>Orders</h1>
          {/*<div className="orderimg" style={{marginLeft:'550px', marginTop:'-150px'}}><img src={orderimg} alt="order" /></div>*/}

          <div className="orderstatus" style={{marginTop:"0px",marginLeft:'-50px'}}>
            <button onClick={() => handleSectionChange('completed')} className={`btn ${activeSection === 'completed' ? 'btn-success' : 'btn-outline-primary'}`}>Completed</button>
            <button onClick={() => handleSectionChange('pending')} className={`btn ${activeSection === 'pending' ? 'btn-warning' : 'btn-outline-primary'}`}>Pending</button>
            <button onClick={() => handleSectionChange('ongoing')} className={`btn ${activeSection === 'ongoing' ? 'btn-danger' : 'btn-outline-primary'}`}>Ongoing</button>
          </div>

          {/* Conditional rendering based on active section */}
          {activeSection === 'completed' && (
            <section className='completedOrders'>
              

                  <div className="completeordertable">
                  
                      <BootstrapTable
                        headers={["Order ID", "Customer ID","Customer Name","Address","Rider", "Actions"]}
                        children={
                          completedOrders.map((order) => (
                            <tr key={order._id}>
                              <td>{order.orderid}</td>
                              <td>{order.customerid}</td>
                              <td>{order.customername}</td>
                              <td>{order.deliveryaddress}</td>
                              <td>{order.rider}</td>
                              <td>
                                <Button
                                  className="m-1 px-3"
                                  variant="danger"
                                  onClick={() => onDelete(order._id)}
                                  size="sm"
                                >
                                  <AiTwotoneDelete className="mb-1 mx-1" />
                                  <span>Delete</span>
                                </Button>
                                <Button
                                  className="m-1 px-3"
                                  variant="info"
                                  onClick={() => handleEdit(order)}
                                  size="sm"
                                >
                                  <MdEditSquare className="mb-1 mx-1" />
                                  <span>Edit</span>
                                </Button>
                              </td>
                            </tr>
                          ))
                        }
                      />
                    </div>
                  

               
              
            </section>
          )}
          {activeSection === 'pending' && (
            <section className='pendingOrders'>
            

          <div className="pendingordertable">
            <BootstrapTable 
              headers={["Order ID","Customer ID","Customer Name","Address","Rider","Actions"]}
              children={
                pendingOrders.map((order) => (
                  <tr key={order._id}>
                    <td>{order.orderid}</td>
                    <td>{order.customerid}</td>
                    <td>{order.customername}</td>
                    <td>{order.deliveryaddress}</td>
                    <td>{order.rider}</td>
                    <td>
                      <Button
                        className="m-1 px-3"
                        variant="danger"
                        onClick={() => onDelete(order._id)}
                        size="sm"
                      >
                        <AiTwotoneDelete className="mb-1 mx-1" />
                        <span>Delete</span>
                      </Button>
                      <Button
                        className="m-1 px-3"
                        variant="info"
                        onClick={() => handleEdit(order)}
                        size="sm"
                      >
                        <MdEditSquare className="mb-1 mx-1" />
                        <span>Edit</span>
                      </Button>
                    </td>
                  </tr>
                ))
              }
            />

            
          </div>
            </section>
          )}
          {activeSection === 'ongoing' && (
            <section className='ongoingOrders'>
              
                <div className="ongoingOrdertable">
                          <BootstrapTable 
                        headers={["Order ID","Customer ID","Customer Name","Address","Rider","Action"]}
                        children={
                          ongoingOrders.map((order) => (
                            <tr key={order._id}>
                              <td>{order.orderid}</td>
                              <td>{order.customerid}</td>
                              <td>{order.customername}</td>
                              <td>{order.deliveryaddress}</td>
                              <td>{order.rider}</td>
                              <td>
                                <Button
                                  className="m-1 px-3"
                                  variant="danger"
                                  onClick={() => onDelete(order._id)}
                                  size="sm"
                                >
                                  <AiTwotoneDelete className="mb-1 mx-1" />
                                  <span>Delete</span>
                                </Button>
                                <Button
                                  className="m-1 px-3"
                                  variant="info"
                                  onClick={() => handleEdit(order)}
                                  size="sm"
                                >
                                  <MdEditSquare className="mb-1 mx-1" />
                                  <span>Edit</span>
                                </Button>
                              </td>
                            </tr>
                          ))
                        }
                      />
                </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
    
  
}

export default index;