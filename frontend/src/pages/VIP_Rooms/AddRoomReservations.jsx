import React, { useState } from 'react';
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useVIPRoomStore } from "../../store/useVIPRoomStore";
import { useRoomData } from "../../hooks/useRoomData";
import { BootstrapModal } from "../../components";
import VIPRoomAPI from "../../api/VIPRoomAPI";
import Toast from "../../utils/toast";
import { useCategoryData } from "../../hooks/useCategoryData";

const AddRoomReservations = () => {
  // Get the state and actions from the store
  const { isAddRoomReservationsOpen, closeAddRoomReservations } = useVIPRoomStore(
    (state) => ({
      isAddRoomReservationsOpen: state.isAddRoomReservationsOpen,
      closeAddRoomReservations: state.closeAddRoomReservations,
    })
  );

  // Get refetch function from react-query hook
  const { refetch } = useRoomData();
  const { data: categories, refetch: refetchCategories } = useCategoryData();

  const onSubmit = (values) => {
    //values.image = image;
    console.log(values);
    mutate(values);
    reset();
    // reset the percent and image state
    //setPercent(0);
    //setImage("");
  };



  // React hook form setup
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    getValues, // Added getValues from react-hook-form
  } = useForm();

  // Create mutation
  const { mutate } = useMutation(VIPRoomAPI.create, {
    onSuccess: () => {
      closeAddRoomReservations();
      refetch();
      Toast({ type: "success", message: "Reservation added successfully" });
    },
    onError: (error) => {
      Toast({ type: "error", message: error.message });
    },
  });

  // Define time options (you can customize these as needed)
  const timeOptions = ['08.00 AM','10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM', '6:00 PM', '8.00 PM'];

  // Function to handle time button click
  const handleTimeClick = (time) => {
    // Use getValues to get the current form values
    const formData = getValues();
    formData.time = time;
    reset(formData); // Reset the form data with updated time
  };

  // Define minDate to disable previous days
  const minDate = new Date().toISOString().split("T")[0];

  return (
    <BootstrapModal
      show={isAddRoomReservationsOpen}
      handleClose={closeAddRoomReservations}
      title="Reserve VIP Room"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <small className="form-text text-danger">Name is required</small>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="contact">Contact Number</label>
          <input
            type="text"
            className={`form-control ${errors.contact ? "is-invalid" : ""}`}
            id="contact"
            name="contact"
            {...register("contact", {
              required: "Phone number is required",
              pattern: {
                value: /^\+?([0-9]{1,3})?[-. ]?([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                message: "Invalid phone number format",
              },
            })}
          />
          {errors.contact && (
            <div className="invalid-feedback">{errors.contact.message}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <small className="form-text text-danger">Email is required</small>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            className="form-control"
            id="date"
            name="date"
            min={minDate}
            {...register("date", { required: true })}
          />
          {errors.date && (
            <small className="form-text text-danger">Date is required</small>
          )}
        </div>


        <div className="form-group">
          <label>Time</label>
          <p style={{ color: 'green' }}>One reservation is only available for two hours.</p>
          <div className="btn-group">
            {timeOptions.map((time) => (
              <button
              
                key={time}
                type="button"
                className={`btn btn-outline-secondary ${getValues('time') === time ? 'active' : ''}`}
                onClick={() => handleTimeClick(time)}
              >
                {time}
              </button>
            ))}
          </div>
          {errors.time && (
            <small className="form-text text-danger">Time is required</small>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary mt-3"
        >
          Submit
        </button>
      </form>
    </BootstrapModal>
  );
};

export default AddRoomReservations;
