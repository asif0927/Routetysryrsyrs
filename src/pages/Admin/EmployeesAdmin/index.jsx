import {  Table } from 'antd';
import { getAllEmployees,deleteEmployeesByID } from '../../../api/requests';
import { useEffect, useState } from "react";
import {Link } from "react-router-dom";
const App = () => {
  const [employees, setEmployees] = useState([]);
  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
  };

  const handleDelete = (employeeId) => {
    deleteEmployeesByID(employeeId).then((response) => {
      if (response) {
        setEmployees(employees.filter((employee) => employee.id !== employeeId));
      }
    });
  };

  useEffect(() => {
    getAllEmployees().then((data) => {
      setEmployees(data);
    });
  }, [setEmployees]);
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title:"Surname",
      dataIndex:"surname",
    },
    {
      title:"Age",
      dataIndex:"age",
      sorter: (a, b) => a.salary - b.salary,
    },
    {
      title:"Salary",
      dataIndex:"salary",
      sorter: (a, b) => a.salary - b.salary,
    },
    {
      title:"Position",
      dataIndex:"position",
    },
    {
      title:"Image",
      dataIndex:"imgurl",
      render: (imgurl) => <img src={imgurl} alt="Employee" style={{ width: "100px", height: "100px" }} />,
    },
    {
      title: "Delete",
      dataIndex: "id",
      render: (id) => (
        <button onClick={() => handleDelete(id)} style={{backgroundColor:"red",display:"flex",justifyContent:"center",alignItems:"center",padding:"10px 20px",borderRadius:"10px",color:"white"}}>Delete</button>
      ),
    },
    {
      title: "Edit",
      dataIndex: "id",
      render: (id) => (
        <button style={{backgroundColor:"blue",display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"10px",color:"white"}}><Link to={`/admin/employees/edit/${id}`}>Edit</Link></button>
      ),
    }
  ];
  return (
    <>
      <Table columns={columns} dataSource={employees} onChange={handleChange} rowKey="id"/>
    </>
  );
};
export default App;