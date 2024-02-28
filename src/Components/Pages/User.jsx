import { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5001/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = (userId) => {
    fetch(`http://localhost:5001/users/${userId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          });
          const remaining = users.filter((user) => user.userId !== userId);
          setUsers(remaining);
        }
      });
  };

  return (
    <div className="mt-20">
      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr className="text-xl font-semibold bg-gray-100">
              <th></th>
              <th>Name</th>
              <th>Student ID</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="">
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td className=" text-center">{user.studentId}</td>
                <td className=" text-center">{user.gender}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <td>
                  <Link to={`/update/${user.userId}`}>
                    <button className="mr-4 text-lg text-teal-500 hover:text-teal-700">
                      <FaEdit />
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(user.userId)}
                    className="text-lg text-red-400 hover:text-red-600"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
