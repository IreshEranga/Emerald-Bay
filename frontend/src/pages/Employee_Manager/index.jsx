// import React, { useState } from "react";
// import Button from "react-bootstrap/Button";
// import { useLeaves } from "../../hooks/useLeavesData";
// import { useLeavesStore } from "../../store/useLeavesStore";
// import leavesAPI from "../../api/leavesAPI";
// import { confirmMessage } from "../../utils/Alert";
// import { BootstrapTable } from "../../components";
// import { useMutation } from "@tanstack/react-query";




// const Leaves = () => {
//   const {
    
//     openEditLeaves,
//     setSelectedLeaves,
//   } = useLeavesStore((state) => ({
//     //openAddStockRequestModal: state.openAddStockRequestModal,
//     openEditLeaves: state.openEditLeaves,
//     setSelectedLeaves: state.setSelectedLeaves,
//   }));


//   // Get the data from the react-query hook
//   const { data, refetch } = useLeaves();

//   // Function to handle change status
//   // const onStatusChange = (id, status) => {
//   //   confirmMessage("Are you sure?", "The status will be updated.", () => {
//   //     // Your logic here
//   //   });
//   // };

//   const { mutate } = useMutation(leavesAPI.delete, {
//     onSuccess: () => {
//       refetch();
//       Toast({ type: "success", message: "Leave deleted successfully" });
//     },
//     onError: (error) => {
//       Toast({ type: "error", message: error?.response?.data?.message });
//     },
//   });

//   // Delete function
//   const onDelete = (id) => {
//     confirmMessage("Are you sure?", "This action cannot be undone.", () => {
//       mutate(id);
//     });
//   };

//   const handleEdit = (leaves) => {
//     setSelectedLeaves(leaves);
//     openEditLeaves();
//   };


//   return (
//     <div className="container mt-5">
//       {/*<div className="d-flex align-items-center mb-5">
//         <h1 className="me-3">Available Stock:</h1>
//         <input
//           type="number"
//           value={stock}
//           onChange={(e) => setStock(e.target.value)}
//           className="form-control"
//           style={{ width: "100px" }}
//         />
//         <Button
//           className="ms-3"
//           variant="primary"
//           // onClick={() => onUpdateStock(stock)}
//         >
//           Update
//         </Button>
//       </div>*/}

//       <hr />

//       <h1 className="mb-5">Leave Requests</h1>
//       <div className="mt-5">
//         <BootstrapTable
//           headers={["Emp ID", "Name", "Status", "Actions"]}
//           children={
//             data &&
//             data.data &&
//             data.data.leaves &&
//             data.data.leaves.map((leaves) => (
//               <tr key={leaves._id}>
//                 <td>Emerald Bay</td>
//                 <td>{leaves.leaveType}</td>
//                 <td>
//                   <span
//                     className={`badge ${
//                       leaves.leaveStatus === "PENDING"
//                         ? "bg-warning"
//                         : leaves.leaveStatus === "APPROVED"
//                         ? "bg-success"
//                         : "bg-danger"
//                     }`}
//                   >
//                     {leaves.leaveStatus}
//                   </span>
//                 </td>
//                 <td>
//                 <Button
//                     className="m-1 px-3"
//                     variant="danger"
//                     onClick={() => onDelete(leaves._id)}
//                     size="sm"
//                   >
//                     <AiTwotoneDelete className="mb-1 mx-1" />
//                     <span>Delete</span>
//                   </Button>
//                   <Button
//                     className="m-1 px-3"
//                     variant="info"
//                     onClick={() => handleEdit(leaves)}
//                     size="sm"
//                   >
//                     <MdEditSquare className="mb-1 mx-1" />
//                     <span>Edit</span>
//                   </Button>
//                 </td>
//               </tr>
//             ))
//           }
//         />
//       </div>
//     </div>
//   );
// };

// export default Leaves;

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
  const { setSelectedLeaves, openEditLeaves } = useLeavesStore();
  const { data, isLoading, error, refetch } = useLeavesData();

  console.log(data?.data.leaveRequests);

  const { mutate } = useMutation(leavesAPI.delete, {
    onSuccess: () => {
      refetch();
      // Handle success notification
    },
    onError: (error) => {
      // Handle error notification
    },
  });

  const onDelete = (id) => {
    confirmMessage("Are you sure?", "This action cannot be undone.", () => {
      mutate(id);
    });
  };

  const handleEdit = (leaves) => {
    setSelectedLeaves(leaves);
    openEditLeaves();
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
                <td>{leaves.leaveFrom}</td>
                <td>{leaves.leaveTo}</td>
                <td>{leaves.leaveStatus}</td>
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
                    <span>Delete</span>
                  </Button>
                  <Button
                    className="m-1 px-3"
                    variant="info"
                    onClick={() => handleEdit(leaves)}
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

export default Leaves;
