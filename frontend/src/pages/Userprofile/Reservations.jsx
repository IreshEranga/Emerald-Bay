import React, { useState, useEffect } from 'react';
import Navbar_customer from "../../components/Navbar_customer";
import { useAuthStore } from '../../store/useAuthStore';
import { Table } from "react-bootstrap";


const User_Reservations = () => {
  const { user } = useAuthStore();
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        if (!user || !user.email) {
          throw new Error('User email not available');
        }

        const response = await fetch(`http://localhost:8000/customer/reservations/${user.email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Add any additional headers if needed
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch reservations');
        }

        const data = await response.json();
        setReservations(data);
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

  if (!reservations || reservations.length === 0) {
    return <p>No reservations found</p>;
  }

  return (
    <div style={{ backgroundColor: 'white' }}>
      <Navbar_customer />
      <div className="profile-container">
        <h1 className='userprofile' style={{ paddingLeft: '120px', paddingRight: '10px', color: 'maroon', fontFamily: 'Times New Roman, Times, serif' }}>My Reservations</h1><br/>
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
            {reservations.map((reservation, index) => (
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
      </div>
    </div>
  );
}

export default User_Reservations;