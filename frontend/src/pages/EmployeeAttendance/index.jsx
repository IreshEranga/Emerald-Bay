import React, { useState } from 'react';
import Button from "react-bootstrap/Button";
import { useMutation } from "@tanstack/react-query";
import { useAttendanceStore } from "../../store/useAttendanceStore";
import { useAttendanceData } from "../../hooks/useAttendanceData";
import { confirmMessage } from "../../utils/Alert";
import Toast from "../../utils/toast";
import AttendanceAPI from "../../api/AttendanceAPI";
import AddAttendanceModal from "./AddAttendanceModal";
import EditAttendanceModal from "./EditAttendanceModal";
import { BootstrapTable } from "../../components";
import { IoMdAddCircleOutline, IoMdDownload } from "react-icons/io";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdEditSquare } from "react-icons/md";

const Index = () => {
  // Get the state and actions from the store
  const { openAddAttendanceModal, openEditAttendanceModal, setSelectedAttendance } = useAttendanceStore((state) => ({
    openAddAttendanceModal: state.openAddAttendanceModal,
    openEditAttendanceModal: state.openEditAttendanceModal,
    setSelectedAttendance: state.setSelectedAttendance,
  }));

  // Get the data from the react-query hook
  const { data, refetch } = useAttendanceData() || {};

  // Delete mutation
  const { mutate } = useMutation(AttendanceAPI.delete, {
    onSuccess: () => {
      refetch();
      Toast({ type: "success", message: "Attendance deleted successfully" });
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
  const handleEdit = (attendance) => {
    setSelectedAttendance(attendance);
    openEditAttendanceModal();
  };

  // PDF report function
  const downloadPDF = () => {
    if (data && data.data && data.data.attendance) {
      const attendance = data.data.attendance;
      const attendanceCount = attendance.length;
      const additionalInfo = `\n\n\nAttendance Report\nTotal Attendance: ${attendanceCount}`;
      generatePDF(additionalInfo, ["EmpID", "name", "role", "email", "date"], attendance, "Attendance_report", 35);
    } else {
      Toast({ type: "error", message: "No attendance data available to generate report" });
    }
  };

  // Search state and function
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filtered data
  const filteredData = data && data.data.attendance ? data.data.attendance.filter(attendance => 
    attendance.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    attendance.EmpID.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];
  

  return (
    <div className="employeecontainer">
      <div className="container mt-5" style={{ backgroundColor: "white" }}>
        <AddAttendanceModal />
        <EditAttendanceModal />

        <div className="front" style={{ display: 'flex' }}>
          <h1 className="mb-5" style={{ fontFamily: 'monospace' }}>Attendance</h1>
          <input
            type="search"
            name="search"
            id="search"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search by Name, Employee ID or name"
            style={{ width: "420px", border: '1px solid gray', padding: '20px', borderRadius: '30px', position: 'relative', marginLeft: '600px', marginTop: '0', zIndex: '1', height: '20px' }}
          />
        </div>

        <Button variant="primary" className="m-1" onClick={openAddAttendanceModal} style={{ width: '200px' }}>
          <IoMdAddCircleOutline className="mb-1" /> <span>Add an Attendance</span>
        </Button>

        <Button variant="success" className="m-1" onClick={downloadPDF} style={{ width: '200px' }}>
          <IoMdDownload className="mb-1" /> <span>Download Report</span>
        </Button>

        <div className="mt-5" style={{ zIndex: '5' }}>
          <BootstrapTable
            headers={["EmpID", "Name", "Email", "Date", "Role", "Actions"]}
            children={filteredData.map((attendance) => (
              <tr key={attendance._id}>
                <td>{attendance.EmpID}</td>
                <td>{attendance.name}</td>
                <td>{attendance.email}</td>
                <td>{attendance.date}</td>
                <td>{attendance.role}</td>
                <td>
                  <Button className="m-1 px-3" variant="danger" onClick={() => onDelete(attendance._id)} size="sm">
                    <AiTwotoneDelete className="mb-1 mx-1" /><span>Delete</span>
                  </Button>
                  <Button className="m-1 px-3" variant="info" onClick={() => handleEdit(attendance)} size="sm">
                    <MdEditSquare className="mb-1 mx-1" /><span>Edit</span>
                  </Button>
                </td>
              </tr>
            ))}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
