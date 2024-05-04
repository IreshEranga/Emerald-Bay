
import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useLeavesData } from "../../hooks/useLeavesData";
import { useLeavesStore } from "../../store/useLeavesStore";
import leavesAPI from "../../api/leavesAPI";
import { confirmMessage } from "../../utils/Alert";
import { BootstrapTable } from "../../components";
import { useMutation } from "@tanstack/react-query";
import { AiTwotoneDelete } from 'react-icons/ai';
import { MdEditSquare } from 'react-icons/md';

const Leaves = () => {
  const { 
          setSelectedLeaves, 
          openEditLeaves ,
          } = useLeavesStore((state)=> ({
            openEditLeaves: state.openEditLeaves,
            setSelectedLeaves: state.setSelectedLeaves,
            

          }));
  const { data, isLoading, error, refetch } = useLeavesData();

  console.log(data?.data.leaveRequests);

   // Delete mutation
   const { mutate } = useMutation(leavesAPI.delete, {
    onSuccess: () => {
      refetch();
      Toast({ type: "success", message: "Leaves deleted successfully" });
    },
  });


  const onDelete = (id) => {
    confirmMessage("Are you sure?", "This action cannot be undone.", () => {
      mutate(id);
    });
  };

    // Approve mutation
 
  

  const handleApprove = (leaves) => {
    confirmMessage("Are you sure to approve?", "This action cannot be undone.", () => {
    console.log(leaves);
    leaves.leaveStatus = "APPROVED";
    const response =   leavesAPI.approve(leaves._id , leaves).then(() => {
      refetch();
    });
    
  });
  };

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mt-5">
    
      <hr />
      <h1 className="mb-5">Leave Requests</h1>
      <div className="mt-5">
        <BootstrapTable
          headers={["Emp ID", "Name", "Role", "Leave Type","Leave From","Leave To", "Status", "Actions"]}
          children={
            data?.data &&
            data?.data.leaveRequests.map((leaves) => (
              <tr key={leaves._id}>
                <td>{leaves.EmpID}</td>
                <td>{leaves.name}</td>
                <td>{leaves.role}</td>
                <td>{leaves.leaveType}</td>
                <td>{leaves.leaveFrom.split('T')[0]}</td>
                <td>{leaves.leaveTo.split('T')[0]}</td>
                {/* <td>{leaves.leaveStatus}</td> */}
                <td>
                  <span
                    className={`badge ${
                      leaves.leaveStatus === "PENDING"
                        ? "bg-warning"
                        : leaves.leaveStatus === "APPROVED"
                        ? "bg-success"
                        : "bg-danger"
                    }`}
                  >
                    {leaves.leaveStatus}
                  </span>
                </td>
                 <td>
                  <Button
                    className="m-1 px-3"
                    variant="danger"
                    onClick={() => onDelete(leaves._id)}
                    size="sm"
                  >
                    <AiTwotoneDelete className="mb-1 mx-1" />
                    <span>Reject</span>
                  </Button>
                  {leaves.leaveStatus === "PENDING" ? <>
                  <Button
                    className="m-1 px-3"
                    variant="info"
                    onClick={() => handleApprove(leaves)}
                    size="sm"
                  >
                    <MdEditSquare className="mb-1 mx-1" />
                    <span>Approve</span>
                  </Button>
                  </>:
                  <></>
                  }
                </td> 
              </tr>
            ))
          }
        />
      </div>
    </div>
  );

 
};

export default Leaves;
