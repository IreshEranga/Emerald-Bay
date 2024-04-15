import React, { useState, useEffect } from 'react';
import "./index.css";
import Button from "react-bootstrap/Button";
import { MdEditSquare } from "react-icons/md";
import { BootstrapTable } from "../../components";
import EditOrderForm from './EditOrderForm';
import EditOngoingOrderForm from './EditOngoingOrderForm';
import { IoMdDownload } from "react-icons/io";
import { useOrderData } from '../../hooks/useOrderData';
import { generatePDF } from "../../utils/GeneratePDF";

const Index = () => {
  // State to manage the current active section
  const [orders, setOrders] = useState([]);
  const [activeSection, setActiveSection] = useState('completed');
  const [selectedRider, setSelectedRider] = useState('');
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOngoingEditForm, setShowOngoingEditForm] = useState(false);
  const {data, refetch} = useOrderData();

  // PDF report function
  
  /*const downloadPDF = () => {
    // Calclating the total riders
    const completeOrderCount = completedOrders.length;
    //
    //const title = "EMERALD BAY RESTAURANT";
    const additionalInfo = `Completed Orders Report\nTotal Completed Orders: ${completeOrderCount}`;
    
    //
    generatePDF(
      //title,
      additionalInfo,
      ["orderid", "customerid", "customername", "deliveryaddress", "rider"],
      completedOrders,
      "Completed_Order_Report",
      35
    );
  };*/

  const downloadPDF = () => {
    // Group completed orders by date
    const groupedCompletedOrders = completedOrders.reduce((acc, order) => {
      const dateKey = new Date(order.date).toLocaleDateString();
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(order);
      return acc;
    }, {});
  
    // Generate PDF for each date group
    Object.entries(groupedCompletedOrders).forEach(([date, ordersByDate]) => {
      const completeOrderCount = ordersByDate.length;
      const additionalInfo = `Completed Orders Report : ${date}\nTotal Completed Orders: ${completeOrderCount}`;
  
      generatePDF(
        additionalInfo,
        ["orderid", "customerid", "customername", "deliveryaddress", "rider"],
        ordersByDate,
        `Completed_Order_Report_${date.replace(/\//g, "-")}`, // Replace "/" with "-" for file name
        35
      );
    });
  };
  

  // Function to handle section change
  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
  };

  const handleRiderChange = (event) => {
    setSelectedRider(event.target.value);
  };

  const handleEdit = (order) => {
    setSelectedOrder(order);
    setShowEditForm(true);
  };

  const handleOngoingEdit = (order) => {
    setSelectedOrder(order);
    setShowOngoingEditForm(true);
  };

  const handleFormSubmit = () => {
    if (selectedOrder && selectedRider) {
      // Update the order's rider and status in the orders state
      setOrders(
        orders.map((order) =>
          order._id === selectedOrder._id
            ? { ...order, rider: selectedRider, status: 'ongoing' }
            : order
        )
      );

      // Hide the rider form
      setShowEditForm(false);
      setSelectedOrder(null);
      setSelectedRider('');
    }
  };

  const handleOngoingEditFormSubmit = (updatedOrder) => {
    // Update the order's status to completed in the orders state
    setOrders(
      orders.map((order) =>
        order._id === updatedOrder._id
          ? { ...updatedOrder, status: 'completed' }
          : order
      )
    );

    // Hide the ongoing order edit form
    setShowOngoingEditForm(false);
    setSelectedOrder(null);
  };

  useEffect(() => {
    // Function to fetch orders from your API or database
    const fetchOrders = async () => {
      try {
        // Make a fetch call or use axios or any other library to fetch data
        const response = await fetch('http://localhost:8000/api/orders');
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
          <div className="orderstatus" style={{marginTop:"0px",marginLeft:'-50px'}}>
            <button onClick={() => handleSectionChange('completed')} className={`btn ${activeSection === 'completed'? 'btn-success' : 'btn-outline-primary'}`}>Completed</button>
            <button onClick={() => handleSectionChange('pending')} className={`btn ${activeSection === 'pending'? 'btn-warning' : 'btn-outline-primary'}`}>Pending</button>
            <button onClick={() => handleSectionChange('ongoing')} className={`btn ${activeSection === 'ongoing'? 'btn-danger' : 'btn-outline-primary'}`}>Ongoing</button>
          </div>
          {/* Conditional rendering based on active section */}
          {/*activeSection === 'completed' && (
            <section className='completedOrders'>
              <div className="completeordertable">
                <BootstrapTable
                  headers={["Order ID", "Customer ID","Customer Name","Address","Rider"]}
                  children={completedOrders.map((order) => (
                      <tr key={order._id}>
                        <td>{order.orderid}</td>
                        <td>{order.customerid}</td>
                        <td>{order.customername}</td>
                        <td>{order.deliveryaddress}</td>
                        <td>{order.rider}</td>
                      </tr>
                    ))
                  }
                />
              </div>
            </section>
          )*/}
          {/*activeSection === 'completed' && (
            <section className='completedOrders'>
              <div className="completeordertable">
                <BootstrapTable
                  headers={["Order ID", "Customer ID","Customer Name","Address","Rider"]}
                  children={completedOrders
                    .sort((a, b) => b.orderid - a.orderid) // Sort in descending order by order ID
                    .map((order) => (
                      <tr key={order._id}>
                        <td>{order.orderid}</td>
                        <td>{order.customerid}</td>
                        <td>{order.customername}</td>
                        <td>{order.deliveryaddress}</td>
                        <td>{order.rider}</td>
                      </tr>
                    ))
                  }
                />
              </div>
            </section>
            )*/}
            {activeSection === 'completed' && (
            <section className='completedOrders'>
              {/* Download PDF report */}
            <Button variant="success" className="m-1" onClick={downloadPDF} style={{width:'200px'}}>
              <IoMdDownload className="mb-1" /> <span>Download Report</span>
            </Button>

              {/* Group orders by date */}
              {Object.entries(completedOrders.reduce((acc, order) => {
                const dateKey = new Date(order.date).toLocaleDateString();
                if (!acc[dateKey]) {
                  acc[dateKey] = [];
                }
                acc[dateKey].push(order);
                return acc;
              }, {})).map(([date, ordersByDate]) => (
                <div key={date}><br />
                  <h4 style={{backgroundColor:'wheat', width:'150px', padding:'10px', borderRadius:'50px', paddingLeft:'20px'}}>{date}</h4> {/* Show date at the top of each table */}
                  <br />
                  <div className="completeordertable">
                    <BootstrapTable
                      headers={["Order ID", "Customer ID", "Customer Name", "Address", "Rider"]}
                      children={ordersByDate
                        .sort((a, b) => b.orderid - a.orderid) // Sort orders within each date group by order ID
                        .map((order) => (
                          <tr key={order._id}>
                            <td>{order.orderid}</td>
                            <td>{order.customerid}</td>
                            <td>{order.customername}</td>
                            <td>{order.deliveryaddress}</td>
                            <td>{order.rider}</td>
                          </tr>
                        ))
                      }
                    />
                  </div>
                </div>
              ))}
            </section>
            )}



          {activeSection === 'pending' && (
            <section className='pendingOrders'>
              <div className="pendingordertable">
                <BootstrapTable
                  headers={["Order ID","Customer ID","Customer Name","Address","Actions"]}
                  children={pendingOrders.map((order) => (
                      <tr key={order._id}>
                        <td>{order.orderid}</td>
                        <td>{order.customerid}</td>
                        <td>{order.customername}</td>
                        <td>{order.deliveryaddress}</td>
                        <td>
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
                  children={ongoingOrders.map((order) => (
                      <tr key={order._id}>
                        <td>{order.orderid}</td>
                        <td>{order.customerid}</td>
                        <td>{order.customername}</td>
                        <td>{order.deliveryaddress}</td>
                        <td>{order.rider}</td>
                        <td>
                          <Button
                            className="m-1 px-3"
                            variant="info"
                            onClick={() => handleOngoingEdit(order)}
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
      {showEditForm && (
        <EditOrderForm
          show={showEditForm}
          onClose={handleFormSubmit}
          order={selectedOrder}
          riders={orders}
        />
      )}
      {showOngoingEditForm && (
        <EditOngoingOrderForm
          show={showOngoingEditForm}
          onClose={handleOngoingEditFormSubmit}
          order={selectedOrder}
          riders={orders}
        />
      )}
    </div>
  );
};

export default Index;
