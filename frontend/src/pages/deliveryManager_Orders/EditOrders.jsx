import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { BootstrapModal } from '../../components';
import OrderAPI from '../../api/OrderAPI';

const EditOrder = ({ selectedOrder, handleClose }) => {
  const { register, handleSubmit } = useForm();
  const [availableRiders, setAvailableRiders] = useState([]);
  const [selectedRider, setSelectedRider] = useState('');

  
  

  // Fetch available riders when the component mounts
  useEffect(() => {
    const fetchAvailableRiders = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/riders/get/available'); // Assuming this endpoint fetches riders
        const data = await response.json();
        setAvailableRiders(data);
      } catch (error) {
        console.error('Error fetching available riders:', error);
      }
    };

    fetchAvailableRiders();
  }, []);

  const onSubmit = async (data) => {
    const { rider } = data;
    await OrderAPI.assignRider({ id: selectedOrder._id, riderId: rider });
    handleClose();
  };

  return (
    <BootstrapModal
      show={true} // Change this to your logic for displaying the modal
      handleClose={handleClose}
      title={`Edit Order: ${selectedOrder?.orderid}`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="rider">Select Available Rider</label>
          <select
            className="form-select"
            id="rider"
            name="rider"
            value={selectedRider}
            onChange={(e) => setSelectedRider(e.target.value)}
            {...register('rider', { required: true })}
          >
            <option value="">Select Rider</option>
            {availableRiders.map((rider) => (
              <option key={rider._id} value={rider._id}>
                {rider.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Save
        </button>
      </form>
    </BootstrapModal>
  );
};

export default EditOrder;
