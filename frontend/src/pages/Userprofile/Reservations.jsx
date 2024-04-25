import React, { useState, useEffect } from 'react';
import Navbar_customer from "../../components/Navbar_customer";
import { useAuthStore } from '../../store/useAuthStore';
import { Table } from "react-bootstrap";


const User_Reservations = () => {
  const { user } = useAuthStore();
  const [tableReservations, setTableReservations] = useState([]);
  const [vipRoomReservations, setVIPRoomReservations] = useState([]);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        if (!user || !user.email) {
          throw new Error('User email not available');
        }

        const tableResponse = await fetch(`http://localhost:8000/customer/tableReservations/${user.email}`);
        const vipRoomResponse = await fetch(`http://localhost:8000/customer/vipRoomReservations/${user.email}`);
        const eventsResponse = await fetch(`http://localhost:8000/customer/events/${user.email}`);

        if (!tableResponse.ok || !vipRoomResponse.ok || !eventsResponse.ok) {
          throw new Error('Failed to fetch reservations');
        }

        const tableData = await tableResponse.json();
        const vipRoomData = await vipRoomResponse.json();
        const eventsData = await eventsResponse.json();

        setTableReservations(tableData);
        setVIPRoomReservations(vipRoomData);
        setEvents(eventsData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching reservations:', error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchReservations();
  }, [user]);

  if (isLoading) {
    return <p>Loading reservations...</p>;
  }

  if (error) {
    return <p>Error fetching reservations: {error}</p>;
  }

  return (
    <div style={{ backgroundColor: 'white' }}>
      <Navbar_customer />
      <div className="profile-container">
        <h1 style={{ paddingLeft: '140px', paddingRight: '10px', color: 'maroon', fontFamily: 'Times New Roman, Times, serif', fontSize:'70px' }}>My Reservations</h1><br/><br/>
        <div>
          <h2 style={{ paddingLeft: '40px', paddingRight: '10px', color: 'green', fontFamily: 'Times New Roman, Times, serif' }}>Table Reservations</h2><br/>
          <Table striped bordered hover className="mt-2">
            <thead>
              <tr align='center'>
                <th>Res. ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Table No</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {tableReservations.map((reservation, index) => (
                <tr key={index}>
                  <td>{reservation.reservationId}</td>
                  <td>{reservation.name}</td>
                  <td>{reservation.phone}</td>
                  <td>{reservation.email}</td>
                  <td>{reservation.tableNo}</td>
                  <td>{reservation.date.split('T')[0]}</td>
                  <td>{reservation.time}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div><br/>
        <div>
          <h2 style={{ paddingLeft: '40px', paddingRight: '10px', color: 'green', fontFamily: 'Times New Roman, Times, serif' }}>VIP Room Reservations</h2><br/>
          <Table striped bordered hover className="mt-2">
            <thead>
              <tr align='center'>
                <th>Res. ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>No. of Guests</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {vipRoomReservations.map((reservation, index) => (
                <tr key={index}>
                  <td>{reservation.reservationId}</td>
                  <td>{reservation.name}</td>
                  <td>{reservation.phone}</td>
                  <td>{reservation.email}</td>
                  <td>{reservation.guests}</td>
                  <td>{reservation.date.split('T')[0]}</td>
                  <td>{reservation.time}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div><br/>
        <div>
          <h2 style={{ paddingLeft: '40px', paddingRight: '10px', color: 'green', fontFamily: 'Times New Roman, Times, serif' }}>Event Reservations</h2><br/>
          <Table striped bordered hover className="mt-2">
            <thead>
              <tr align='center'>
                <th>Res. ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>No. of Guests</th>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
              </tr>
            </thead>
            <tbody>
              {events.map((reservation, index) => (
                <tr key={index}>
                  <td>{reservation.reservationId}</td>
                  <td>{reservation.name}</td>
                  <td>{reservation.phone}</td>
                  <td>{reservation.email}</td>
                  <td>{reservation.guests}</td>
                  <td>{reservation.date.split('T')[0]}</td>
                  <td>{reservation.startTime}</td>
                  <td>{reservation.endTime}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div><br/>
      </div><br/>
    </div>
  );
}

export default User_Reservations;