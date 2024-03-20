import React, { useState } from 'react';
import axios from 'axios';
import Button from "react-bootstrap/Button";
import { useMutation } from "@tanstack/react-query";
import { useRiderStore } from "../../store/useRiderStore";
import { useRiderData } from "../../hooks/useRiderData";
import { confirmMessage } from "../../utils/Alert";
import Toast from "../../utils/toast";
import RiderAPI from "../../api/RiderAPI";
import AddDeliveryRiderModal from "./AddDeliveryRiderModal";
import EditDeliveryRiderModal from "./EditDeliveryRiderModal";
import { BootstrapTable } from "../../components";
import { BsCircle } from "react-icons/bs";
import { generatePDF } from "../../utils/GeneratePDF";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoMdDownload } from "react-icons/io";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdEditSquare } from "react-icons/md";

const index = () => {
  // Get the state and actions from the store
  const { openAddDeliveryRiderModal, openEditDeliveryRiderModal, setSelectedRider } =
    useRiderStore((state) => ({
      openAddDeliveryRiderModal: state.openAddDeliveryRiderModal,
      openEditDeliveryRiderModal: state.openEditDeliveryRiderModal,
      setSelectedRider: state.setSelectedRider,
    }));

  // Get the data from the react-query hook
  const { data, refetch } = useRiderData();

  // Delete mutation
  const { mutate } = useMutation(RiderAPI.delete, {
    onSuccess: () => {
      refetch();
      Toast({ type: "success", message: "Rider deleted successfully" });
    },
    onError: (error) => {
      Toast({ type: "error", message: error?.response?.data?.message });
    },
  });

  // Delete function
  const onDelete = (id) => {
    confirmMessage("Are you sure?", "This action cannot be undone.", () => {
      mutate(id);
    });
  };

  // Edit function
  const handleEdit = (rider) => {
    setSelectedRider(rider);
    openEditDeliveryRiderModal();
  };

  // PDF report function
  const downloadPDF = () => {
    // Calclating the total riders
    const riders = data.data.riders;
    const riderCount = riders.length;
    //
    const additionalInfo = `Total Riders: ${riderCount}`;
    //
    generatePDF(
      additionalInfo,
      ["name", "address", "contact", "email", "rides"],
      data.data.riders,
      "Delivery_riders-report"
    );
  };

  return (
    <div className="container mt-5">
      <AddDeliveryRiderModal />
      <EditDeliveryRiderModal />

      <h1 className="mb-5">Riders</h1>

      <Button variant="primary" className="m-1" onClick={openAddDeliveryRiderModal}>
        <IoMdAddCircleOutline className="mb-1" /> <span>Add a Rider</span>
      </Button>

      {/* Download PDF report */}
      <Button variant="success" className="m-1" onClick={downloadPDF}>
        <IoMdDownload className="mb-1" /> <span>Download Report</span>
      </Button>

      <div className="mt-5">
        <BootstrapTable
          headers={[
            "Image",
            "Employee ID",
            "Name",
            "Address",
            "Contact",
            "Email",
            "Total Deliveries",
            "Actions",
          ]}
          children={
            data &&
            data.data.riders.map((rider) => (
              <tr key={rider._id}>
                <td>
                  {rider.image ? (
                    <img
                      src={rider.image}
                      alt={rider.name}
                      width="50"
                      height="50"
                    />
                  ) : (
                    <BsCircle size={30} />
                  )}
                </td>
                <td>{rider.employeeid}</td>
                <td>{rider.name}</td>
                <td>{rider.address}</td>
                <td>{rider.contact}</td>
                <td>{rider.email}</td>
                <td>{rider.rides}</td>
                <td>
                  <Button
                    className="m-1 px-3"
                    variant="danger"
                    onClick={() => onDelete(rider._id)}
                    size="sm"
                  >
                    <AiTwotoneDelete className="mb-1 mx-1" />
                    <span>Delete</span>
                  </Button>
                  <Button
                    className="m-1 px-3"
                    variant="info"
                    onClick={() => handleEdit(rider)}
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
    </div>
  );
};

export default index;
