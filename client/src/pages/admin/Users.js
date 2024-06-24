import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import { Table } from "antd";
const Users = () => {
  const [users, setUsers] = useState([]);

  //getUsers
  const getUsers = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllUsers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(() => {
    getUsers();
  }, []);

  // const handleDelete=async(id)=>{
  //   try{
  //     const res=await axios.delete(`/api/v1/user/deleteuser/${id}`,{
  //       headers:{
  //         Authorization:`Bearer ${localStorage.getItem("token")}`,
  //       }
  //     })
  //     console.log(`${id}`)
  //     return res.data
  //   }catch(error){
  //     console.log(error)
  //   }
  // }

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/api/v1/user/deleteuser/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        console.log(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  

  

  // antD table col
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Doctor",
      dataIndex: "isDoctor",
      render: (text, record) => <span>{record.isDoctor ? "Yes" : "No"}</span>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <button className="btn btn-danger" onClick={()=>handleDelete(record._id)}>Delete</button>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="text-center m-2">Users List</h1>
      <Table columns={columns} dataSource={users} />
    </Layout>
  );
};

export default Users;