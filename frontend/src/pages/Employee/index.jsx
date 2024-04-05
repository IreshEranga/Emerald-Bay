import React, { useState } from 'react';
import axios from 'axios';
import Button from "react-bootstrap/Button";
import { useMutation } from "@tanstack/react-query";
import { useEmployeeStore } from "../../store/useEmployeeStore";
import { useEmployeeData } from "../../hooks/useEmployeeData";
import { confirmMessage } from "../../utils/Alert";
import Toast from "../../utils/toast";
import EmployeeAPI from "../../api/EmployeeAPI";
import AddEmployeeModal from "./AddEmployeeModal";
import EditEmployeeModal from "./EditEmployeeModal";
import { BootstrapTable } from "../../components";
import { BsCircle } from "react-icons/bs";
import { generatePDF } from "../../utils/GeneratePDF";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoMdDownload } from "react-icons/io";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdEditSquare } from "react-icons/md";
import riderimg1 from "../../assets/riderimg1.png"


const index = () => {
  // Get the state and actions from the store
  const { openAddEmployeeModal, openEditEmployeeModal, setSelectedEmployee } =
    useEmployeeStore((state) => ({
      openAddEmployeeModal: state.openAddEmployeeModal,
      openEditEmployeeModal: state.openEditEmployeeModal,
      setSelectedEmployee: state.setSelectedEmployee,
    }));

  // Get the data from the react-query hook
  const { data, refetch } = useEmployeeData();

  // Delete mutation
  const { mutate } = useMutation(EmployeeAPI.delete, {
    onSuccess: () => {
      refetch();
      Toast({ type: "success", message: "Employee deleted successfully" });
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
  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    openEditEmployeeModal();
  };

  // PDF report function
  const downloadPDF = () => {
    // Calclating the total riders
    const employees = data.data.employees;
    const employeeCount = employees.length;
    //
    //const title = "EMERALD BAY RESTAURANT";
    const additionalInfo = `Total Employee: ${employeeCount}`;
    //
    generatePDF(
      //title,
      additionalInfo,
      ["name", "address", "contact", "email", "employees","salary","role"],
      data.data.employees,
      "Employee_report"
    );
  };

  return (
    <div className="employeecontainer">
      
      <div className="container mt-5" style={{backgroundColor:"white"}}>
      <AddEmployeeModal />
      <EditEmployeeModal />

      <h1 className="mb-5" style={{fontFamily:'monospace'}}>Employee</h1>

      <Button variant="primary" className="m-1" onClick={openAddEmployeeModal} style={{width:'200px'}}>
        <IoMdAddCircleOutline className="mb-1" /> <span>Add a Employee</span>
      </Button>

      {/* Download PDF report */}
      <Button variant="success" className="m-1" onClick={downloadPDF} style={{width:'200px'}}>
        <IoMdDownload className="mb-1" /> <span>Download Report</span>
      </Button>

      <div className="riderimg" style={{marginLeft:'450px', marginTop:'-200px', marginBottom:'-60px'}}><img src={riderimg1} alt="rider"  /></div>

      <div className="mt-5">
        <BootstrapTable
          headers={[
            "Image",
            "Employee ID",
            "Name",
            "Address",
            "Contact",
            "Email",
            "Employees",
            "Salary",
            "Job Role",
            "Actions",
            
          ]}
          children={
            data &&
            data.data.employees.map((employee) => (
              <tr key={employee._id}>
                <td>
                  {employee.image ? (
                    <img
                      src={employee.image}
                      alt={employee.name}
                      width="50"
                      height="50"
                    />
                  ) : (
                    <BsCircle size={30} />
                  )}
                </td>
                <td>{employee.EmpID}</td>
                <td>{employee.name}</td>
                <td>{employee.address}</td>
                <td>{employee.phone}</td>
                <td>{employee.email}</td>
                <td>{employee.salary}</td>
                <td>{employee.role}</td>
                <td>{employee.Totemployee}</td>
                <td>
                  <Button
                    className="m-1 px-3"
                    variant="danger"
                    onClick={() => onDelete(employee._id)}
                    size="sm"
                  >
                    <AiTwotoneDelete className="mb-1 mx-1" />
                    <span>Delete</span>
                  </Button>
                  <Button
                    className="m-1 px-3"
                    variant="info"
                    onClick={() => handleEdit(employee)}
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
    </div>
  );
};

export default index;
