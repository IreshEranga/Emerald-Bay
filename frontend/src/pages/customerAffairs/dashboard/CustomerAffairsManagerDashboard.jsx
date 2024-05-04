import React, { useState, useEffect } from "react";
import { useAuthStore } from "../../../store/useAuthStore";
import axios from "axios";



const CustomerAffairsManagerDashboard = () => {
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));
 
  const [allfeedbacks, setAllFeedbacks] = useState(0);
  const [pendingFeedbacks, setPendingFeedbacks] = useState(0);
  const [approvedFeedbacks, setApprovedFeedbacks] = useState(0);
  const [RejectedFeedbacks, setRejectedFeedbacks] = useState(0);

  useEffect(() => {
    //Fetch count of all feedbacks
    const fetchAllFeedbacks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/feedback/count"
        );
        setAllFeedbacks(response.data.count);
      } catch (error) {
        console.error("Error fetching all feedbacks count:", error);
      }
    };
    fetchAllFeedbacks();

    //fetch count of all pending feedbacks
    const fetchPendingFeedbacks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/feedback/pending"
        );
        setPendingFeedbacks(response.data.count);
      } catch (error) {
        console.error("Error fetching pending feedbacks count:", error);
      }
    };

    fetchPendingFeedbacks();

    //fetch count of all approved feedbacks
    const fetchApprovedFeedbacks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/feedback/approved"
        );
        setApprovedFeedbacks(response.data.count);
      } catch (error) {
        console.error("Error fetching approved feedbacks count:", error);
      }
    };

    fetchApprovedFeedbacks();

    //fetch count of all rejected feedbacks
    const fetchRejectedFeedbacks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/feedback/rejected"
        );
        setRejectedFeedbacks(response.data.count);
      } catch (error) {
        console.error("Error fetching rejected feedbacks count:", error);
      }
    };

    fetchRejectedFeedbacks();
  }, []);

  return (
    <div className="container mt-4">
      {user && (
        <div className="alert alert-primary" role="alert">
          You are logged in as <strong>{user.role}</strong>
        </div>
      )}

      <div className="row">
        <div className="col-md-3 mb-4">
          <div className="card text-center h-100">
            <div className="card-body">
              <h5 className="card-title">📝 ALL Feedbacks</h5>
              <p className="card-text fs-4 fw-bold">
                {allfeedbacks}  {/* Display all feedbacks count */}
                {/* {tableReservationsCount}  Display table reservations count */}
              </p>
            </div>
          </div>
      </div>
        <div className="col-md-3 mb-4">
          <div className="card text-center h-100">
            <div className="card-body">
              <h5 className="card-title">📋 Pending Feedbacks</h5>
              <p className="card-text fs-4 fw-bold">
                {pendingFeedbacks}  {/* Display pending feedbacks count */}
                 {/* {vipRoomReservationsCount} Display VIP room reservations count */}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card text-center h-100">
            <div className="card-body">
              <h5 className="card-title">✅ Approved Feedbacks</h5>
              <p className="card-text fs-4 fw-bold">
                  {approvedFeedbacks}  {/* Display approved feedbacks count */}
                 {/* {eventsCount}  Display events count */}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card text-center h-100">
            <div className="card-body">
              <h5 className="card-title">❌ Rejected Feedbacks</h5>
              <p className="card-text fs-4 fw-bold">
                {RejectedFeedbacks}  {/* Display rejected feedbacks count */}
                  {/* {eventsCount}  Display events count */}
              </p>
            </div>
          </div>
        </div>
        {/* <div className="col-md-3 mb-4">
          <div className="card text-center h-100">
            <div className="card-body">
              <h5 className="card-title">📖 FAQ</h5>
              <p className="card-text fs-4 fw-bold">
                  {/* {eventsCount}  Display events count */}
              {/* </p>
            </div>
          </div>
        </div> */} 
        {/* <div className="col-md-3 mb-4">
          <div className="card text-center h-100">
            <div className="card-body">
              <h5 className="card-title">📞 Contact Us</h5>
              <p className="card-text fs-4 fw-bold">
                  {/* {eventsCount}  Display events count */}
              {/* </p>
            </div>
          </div>
        </div> */} 
        {/* <div className="col-md-3 mb-4">
          <div className="card text-center h-100">
            <div className="card-body">
              <h5 className="card-title">⭐ Rating and Review</h5>
              <p className="card-text fs-4 fw-bold">
                  {/* {eventsCount}  Display events count */}
              {/* </p>
            </div>
          </div>
        </div> */} 
      </div>
    </div>
    
  );
};

export default CustomerAffairsManagerDashboard;