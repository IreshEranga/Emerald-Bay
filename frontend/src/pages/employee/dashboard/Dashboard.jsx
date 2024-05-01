import React, { useState, useEffect } from "react";
import { useAuthStore } from "../../../store/useAuthStore";
import toast from 'react-hot-toast';
import { Button, Table } from "react-bootstrap";
import { IoMdCreate, IoMdTrash } from "react-icons/io";
import axios from "axios";

const Dashboard = () => {
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));

 

  return (
    <div className="container mt-4">
      {user && (
        <div className="alert alert-primary" role="alert">
          You are logged in as <strong>{user.role}  -   {user.name}</strong>
        </div>
      )}
      </div>
  );
};

export default Dashboard;
