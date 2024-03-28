import Button from "react-bootstrap/Button";
import { useMutation } from "@tanstack/react-query";
import { useVIPRoomStore } from "../../store/useVIPRoomStore";
import { useRoomData } from "../../hooks/useRoomData";
import { confirmMessage } from "../../utils/Alert";
import Toast from "../../utils/toast";
import VIPRoomAPI from "../../api/VIPRoomAPI";
import { BootstrapTable } from "../../components";
import { BsCircle } from "react-icons/bs";
import { generatePDF } from "../../utils/GeneratePDF";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoMdDownload } from "react-icons/io";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdEditSquare } from "react-icons/md";
import AddRoomReservations from "./AddRoomReservations";
import EditRoomReservations from "./EditRoomReservations";


const index = () => {
  // Get the state and actions from the store
  const { openAddRoomReservations, openEditRoomReservations, setSelectedRoom } =
    useVIPRoomStore((state) => ({
      openAddRoomReservations: state.openAddRoomReservations,
      openEditRoomReservations: state.openEditRoomReservations,
      setSelectedSupplier: state.setSelectedRoom,
    }));

  // Get the data from the react-query hook
  const { data, refetch } = useRoomData();

  // Delete mutation
  const { mutate } = useMutation(VIPRoomAPI.delete, {
    onSuccess: () => {
      refetch();
      Toast({ type: "success", message: "Room Reservation deleted successfully" });
    },
    onError: (error) => {
      Toast({ type: "error", message: error?.response?.data?.message });
    },
  });

  // Delete function
  const onDelete = (id) => {
    confirmMessage("Are you sure to delete room reservation?", "This action cannot be undone.", () => {
      mutate(id);
    });
  };

  // Edit function
  const handleEdit = (vipRoom) => {
    setSelectedRoom(vipRoom);
    openEditRoomReservations();
  };

  // PDF report function
  const downloadPDF = () => {
    // Calclating the total room reservations
    const vipRooms = data.data.vipRoom;
    const vipRoomCount = vipRooms.length;
    //
    const additionalInfo = `Total Room Reservations: ${vipRoomCount}`;
    //
    generatePDF(
      additionalInfo,
      ["name", "contact", "email", "date", "time"],
      data.data.vipRooms,
      "VIP Room Reservation Report"
    );
  };

  return (
    <div className="container mt-5">
      <AddRoomReservations />
      <EditRoomReservations />

      <h1 className="mb-5">VIP Room Reservations</h1>

      <Button variant="primary" className="m-1" onClick={openAddRoomReservations}>
        <IoMdAddCircleOutline className="mb-1" /> <span>Add VIP Room Reservation</span>
      </Button>

      {/* Download PDF report */}
      <Button variant="success" className="m-1" onClick={downloadPDF}>
        <IoMdDownload className="mb-1" /> <span>Download Report</span>
      </Button>

      <div className="mt-5">
        <BootstrapTable
          headers={[
            /*"Image",*/
            "Name",
            "Contact",
            "Email",
            "Date",
            "Time",
            "Actions",
          ]}
          children={
            data &&
            data.data.vipRooms.map((vipRoom) => (
              <tr key={vipRoom._id}>
               
                <td>{vipRoom.name}</td>
                <td>{vipRoom.contact}</td>
                <td>{vipRoom.email}</td>
                <td>{vipRoom.date}</td>
                <td>{vipRoom.time}</td>
                <td>{vipRoom.room_number}</td>
                <td>
                  <Button
                    className="m-1 px-3"
                    variant="danger"
                    onClick={() => onDelete(vipRoom._id)}
                    size="sm"
                  >
                    <AiTwotoneDelete className="mb-1 mx-1" />
                    <span>Delete</span>
                  </Button>
                  <Button
                    className="m-1 px-3"
                    variant="info"
                    onClick={() => handleEdit(vipRoom)}
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