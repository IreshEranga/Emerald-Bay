import React, { useState, useEffect } from 'react';
import './items.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast'; // Import toast function from react-hot-toast
import axios from 'axios';
import { handleUpload } from '../../../utils/HandleUpload';

const Items = () => {
    const [errors, setErrors] = useState({});
    const [image, setImage] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '', // Change category to be an empty string initially
        price: '',
    });
    
    useEffect(() => {
    }, [formData]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        handleUpload({ file, setPercent: () => {}, setImage });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
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
            errors.category = "Category is required";
        } 
        if (!data.price) {
            errors.price = "Price is required";
        }
        return errors;
    };

    // Function to handle form submission (for create)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const errorsObj = validateForm(formData);
        if (Object.keys(errorsObj).length === 0) {
            try {
                const response = await axios.post('http://localhost:8000/item/create', formData);
                console.log(response.data); // Assuming the backend responds with data
                /*resetForm();*/
                toast.success('Item added successfully!'); // Display success toast
                setTimeout(() => {
                    window.history.back(); // Go back after a delay
                }, 1000); // Adjust the delay time as needed
            } catch (error) {
                console.error('Error submitting item:', error);
                // Handle error state or display an error message
                toast.error('Error adding item. Please try again later.');
            }
        } else {
            setErrors(errorsObj);
        }
    };

    return (
        <div className="outer-container9"><br></br>
            <div className="item">
                <FontAwesomeIcon icon={faArrowLeft} className="back-icon" onClick={() => window.history.back()} />
                <h2 className="center-heading">Add A Item</h2>
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
                        <input type="file" name="image" value={formData.image} onChange={handleImageChange} accept="image/*" />
                    </div>                   
                    <button className='btn' onClick={handleSubmit} style={{ width: '250px', padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '20px', marginLeft: '55px'}}>Add Item</button>                   
                </form>        
            </div><br></br>
        </div>
    );
};

export default Items;