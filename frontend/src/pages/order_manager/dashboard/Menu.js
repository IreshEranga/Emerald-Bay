import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Table, Form } from "react-bootstrap";
import { IoMdAddCircleOutline, IoMdDownload, IoMdCreate, IoMdTrash } from "react-icons/io";
import toast from 'react-hot-toast'; // Import toast function from react-hot-toast
import axios from "axios";
import { handleUpload } from '../../../utils/HandleUpload';

const Menu_Items = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
  });

  useEffect(() => {
    // Fetch items data when component mounts
    fetchItems();
  }, []);

  // Function to fetch items data
  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:8000/item/");
      setItems(response.data);
      // Initially setting filteredReservations to all items
      setFilteredItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
        ...prevState,
        [name]: value
    }));
  };

  const handleImageChange = (e) => {
        const file = e.target.files[0];
        handleUpload({ file, setPercent: () => {}, setImage });
  };

  //form validation
  const validateForm = (data) => {
    const errors = {};

    if (!data.name.trim()) {
      errors.name = "Name is required";
    }
    if (!data.description.trim()) {
      errors.description = "Description is required";
    } 
    if (!data.category.trim()) {
      errors.email = "Category is required";
    } 
    if (!data.price) {
      errors.price = "Price is required";
    }
    return errors;
  };

  // Function to handle edit
  const handleEdit = (item) => {
    setEditItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      category: item.category,
      price: item.price,
      image: item.image,
    });
  };

// Function to handle form submission (for update)
const handleSubmit = async (event) => {
  event.preventDefault();
  if (editItem) {
    // Update item
    try {
      const updatedItem = {
        ...editItem,
        name: formData.name,
        description: formData.description,
        category: formData.category,
        price: formData.price,
        image: formData.image,
      };
      await axios.put(`http://localhost:8000/item/update/${editItem._id}`, updatedItem);
      toast.success('Item updated successfully!');
      setEditItem(null);
      fetchItems();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  } else {
    // Logic for creating a new item
  }
};

  // Function to delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/item/delete/${id}`);
      toast.success('Item deleted successfully!');
      fetchItems();
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error('Error deleting item!');
    }
  };

  // Function to handle search
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filteredData = items.filter((item) => {
      return (
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.itemId.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );
    });
    setFilteredItems(filteredData);
  };

  // Function to download PDF report
  const downloadPDF = () => {
    console.log("Downloading PDF report...");
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-5" style={{ textAlign: "center" }}>
        Items
      </h1>

      {/* Add item */}
      <Link to="/add-item">
        <Button variant="primary" className="m-1">
          <IoMdAddCircleOutline className="mb-1" /> <span>Add Item</span>
        </Button>
      </Link>

      {/* Download PDF report */}
      <Button variant="success" className="m-1" onClick={downloadPDF}>
        <IoMdDownload className="mb-1" /> <span>Download Report</span>
      </Button>

      {/* Search Form */}
      <Form className="mt-3">
        <Form.Group controlId="searchQuery">
          <Form.Control
            type="text"
            placeholder="Search by Item ID or Name or Category"
            value={searchQuery}
            onChange={handleSearch}
          />
        </Form.Group>
      </Form>

      {/* Table to display previous items */}
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr align='center'>
            <th>Item ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item) => (
            <tr key={item._id}>
              <td>{item.itemId}</td>
              <td><img src={item.image} style={{ width: '50px', height: '50px' }} /></td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.category}</td>
              <td>Rs. {item.price}</td>
              <td style={{ display: "flex" }}>
                {/* Edit button */}
                <Button variant="info" className="mr-2" onClick={() => handleEdit(item)} style={{marginRight:'10px', marginLeft:'20px'}}>
                  <IoMdCreate />
                </Button>
                {/* Delete button */}
                <Button variant="danger" onClick={() => handleDelete(item._id)} style={{marginRight:'20px'}}>
                  <IoMdTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Item Form (to display when editing) */}
      {editItem && (
        <div className="mt-4"><br></br>
          <h2 align="center" style={{color:'green'}}>Edit Item</h2>
          <div style={{display: 'flex', justifyContent: 'center'}}>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name :</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                        {errors.name && <span className="error">{errors.name}</span>}
                    </div>
                    <div className="form-group">
                        <label>Description :</label>
                        <input type="text" name="description" value={formData.description} onChange={handleChange} required />
                        {errors.description && <span className="error">{errors.description}</span>}
                    </div>
                    <div className="form-group">
                        <label>Category :</label>
                        <select name="category" value={formData.category} onChange={handleChange} required>
                            <option value="">Select Category</option>
                            <option value="Beverages">Beverages</option>
                            <option value="Side Dishes">Side Dishes</option>
                            <option value="Soups">Soups</option>
                            <option value="Salads">Salads</option>
                            <option value="Rices">Rice</option>
                            <option value="Desserts">Desserts</option>
                        </select>
                        {errors.category && <span className="error">{errors.category}</span>}
                    </div>
                    <div className="form-group">
                        <label>Price :</label>
                        <input type="text" name="price" value={formData.price} onChange={handleChange} required />
                        {errors.price && <span className="error">{errors.price}</span>}
                    </div>
                    <div className="form-group">
                        <label>Image :</label>
                        <input type="file" name="image" value={formData.image} accept="image/*" onChange={handleImageChange}/>
                    </div>                   
                    <button className='btn' onClick={handleSubmit} style={{ width: '250px', padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '20px', marginLeft: '55px'}}>Update Item</button>                   
                </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu_Items;