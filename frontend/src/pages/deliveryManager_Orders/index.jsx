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
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState(null);
  const [searchOrderID, setSearchOrderID] = useState('');
  const [searchRider, setSearchRider] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter completed orders based on search term
  const filteredCompletedOrders = orders.filter(order =>{
    const orderCreatedDate = new Date(order.createdAt).toLocaleDateString();
    const searchTerm = searchQuery.toLowerCase().trim();
    return order.status==='completed' && (
      order.orderid.includes(searchTerm) ||
      orderCreatedDate.includes(searchTerm) || 
      order.rider.includes(searchTerm)
    );
    
  });

  // Function to handle search and download report
  const handleSearchDownloadReport = () => {
    const searchResults = filteredCompletedOrders;
    generatePDF(
      `Search Results: ${searchQuery}`,
      ["Date", "Order ID", "Customer ID", "Customer Name", "Address", "Rider"],
      searchResults.flatMap(order => [
        { "Date": new Date(order.createdAt).toLocaleDateString(), "Order ID": order.orderid, "Customer ID": order.customerid, "Customer Name": order.customername, "Address": order.deliveryaddress, "Rider": order.rider }
      ]),
      `Order_${searchQuery}`,
      35
    );
  };
  
  
  // PDF report function

  const downloadPDF = (timeRange) => {
    setShowDownloadOptions(false);
    setSelectedTimeRange(timeRange);
  
    // Logic to generate PDF based on time range
    let filteredOrders = [];
    const currentDate = new Date();
  
    switch (timeRange) {
      case 'allCompleted': 
        filteredOrders = completedOrders;
        break;
      case 'Last 7 days':
        const last7DaysDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7);
        filteredOrders = completedOrders.filter(order => new Date(order.createdAt) >= last7DaysDate);
        break;
      case 'Past 3 months':
        const past3MonthsDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()-90);
        filteredOrders = completedOrders.filter(order => new Date(order.createdAt) >= past3MonthsDate);
        break;
      case 'Past 6 months':
        const past6MonthsDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()-180);
        filteredOrders = completedOrders.filter(order => new Date(order.createdAt) >= past6MonthsDate);
        break;
      case 'Today':
        const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        filteredOrders = completedOrders.filter(order => new Date(order.createdAt) >= today);
        break;
      default:
        break;
    }
    console.log('Filtered Orders:', filteredOrders);

    const additionalInfo = timeRange === 'allCompleted' ? 'All Completed Orders Report' : `Completed Orders Report - ${timeRange.charAt(0).toUpperCase() + timeRange.slice(1)}`;
  
    generatePDF(
      additionalInfo,
      ["Date", "Order ID", "Customer ID", "Customer Name", "Address", "Rider"],
      filteredOrders.flatMap(order => [
        
        { "Date": new Date(order.createdAt).toLocaleDateString(), "Order ID": order.orderid, "Customer ID": order.customerid, "Customer Name": order.customername, "Address": order.deliveryaddress, "Rider": order.rider }
      ]),
      timeRange === 'allCompleted' ? 'All_Completed_Orders_Report' : `Completed_Order_Report_${timeRange}`,
      35
    );
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
          <h1 className='name' style={{fontFamily:'arial', textAlign:'left',fontSize:'50px'}}> <b>Orders</b></h1>
          <div className="orderstatus" style={{marginTop:"0px",marginLeft:'-50px'}}>
            <button onClick={() => handleSectionChange('completed')} className={`btn ${activeSection === 'completed'? 'btn-success' : 'btn-outline-primary'}`}>Completed</button>
            <button onClick={() => handleSectionChange('pending')} className={`btn ${activeSection === 'pending'? 'btn-warning' : 'btn-outline-primary'}`}>Pending</button>
            <button onClick={() => handleSectionChange('ongoing')} className={`btn ${activeSection === 'ongoing'? 'btn-danger' : 'btn-outline-primary'}`}>Ongoing</button>
          </div>
          {/* Conditional rendering based on active section */}
          
            {activeSection === 'completed' && (
            <section className='completedOrders'>
              {/* Download PDF report */}
            <div>
            <Button variant="success" className="m-1" onClick={() => setShowDownloadOptions(true)} style={{ width: '200px' }}>
              <IoMdDownload className="mb-1" /> <span>Download Report</span>
            </Button>
            {showDownloadOptions && (
              <div className="download-options" >
                <Button variant="info" onClick={() => downloadPDF('Today')}>Today</Button>
                <Button style={{marginLeft:'10px'}} variant="info" onClick={() => downloadPDF('Last 7 days')}>Last 7 Days</Button>
                <Button style={{marginLeft:'10px'}} variant="info" onClick={() => downloadPDF('Past 3 months')}>Past 3 Months</Button>
                <Button style={{marginLeft:'10px'}} variant="info" onClick={() => downloadPDF('Past 6 months')}>Past 6 Months</Button>
                <Button style={{marginLeft:'10px'}} variant="info" onClick={() => downloadPDF('allCompleted')}>All the time</Button>
              </div>
            )}

             {/* Search input for Order ID */}
             <div className="search-container" style={{ marginTop:'-88px', marginLeft:'220px', width:'395px', display:'flex' }}>
                <input
                style={{borderRadius:'40px', padding:'10px', paddingLeft:'20px'}}
                  type="text"
                  placeholder="Search by Order ID or Date (MM/DD/YYYY)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  
                />
                <Button  onClick={handleSearchDownloadReport} style={{marginLeft:'10px'}}><IoMdDownload className='mb-1'/></Button>
              </div>
            </div><br /><br />


              {/* Group orders by date */}
              {Object.entries(filteredCompletedOrders.reduce((acc, order) => {
                const dateKey = new Date(order.createdAt).toLocaleDateString();
                if (!acc[dateKey]) {
                  acc[dateKey] = [];
                }
                acc[dateKey].push(order);
                return acc;
              }, {}))
              .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA)) // Sort dates in descending order
              .map(([createdAt, ordersByDate]) => (
                <div key={createdAt}><br />
                  <h4 style={{backgroundColor:'wheat', width:'150px', padding:'10px', borderRadius:'50px', paddingLeft:'20px'}}>{createdAt}</h4> 
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
                  headers={["Order ID","Customer ID","Customer Name","Address","Rider"]}
                  children={ongoingOrders.map((order) => (
                      <tr key={order._id}>
                        <td>{order.orderid}</td>
                        <td>{order.customerid}</td>
                        <td>{order.customername}</td>
                        <td>{order.deliveryaddress}</td>
                        <td>{order.rider}</td>
                        {/* <td>
                          <Button
                            className="m-1 px-3"
                            variant="info"
                            onClick={() => handleOngoingEdit(order)}
                            size="sm"
                          >
                            <MdEditSquare className="mb-1 mx-1" />
                            <span>Edit</span>
                          </Button>
                        </td> */}
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
