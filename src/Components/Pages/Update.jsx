import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateUser = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5001/users/${userId}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId]);

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5001/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "User Data Updated",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        console.error("Failed to update user");
        // Handle error response
      }
    } catch (error) {
      console.error("Error updating user:", error);
      // Handle network errors
    }
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-[#F4F3F0] md:p-12">
      <h2 className="text-3xl font-extrabold text-center">Update User</h2>
      <form onSubmit={handleUpdateUser} className="flex flex-col items-center">
        <div className="form-control md:w-1/2 mb-2">
          <label className="label">
            <span className="label-text">ID</span>
          </label>
          <label className="input-group">
            <input
              type="text"
              name="userId"
              placeholder="ID"
              className="input input-bordered w-full"
              value={user.userId}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-control md:w-1/2 mb-2">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <label className="input-group">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="input input-bordered w-full"
              value={user.name}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="form-control md:w-1/2 mb-2">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <label className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full"
              value={user.email}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="form-control md:w-1/2 mb-2">
          <label className="label">
            <span className="label-text">Gender</span>
          </label>
          <label className="input-group">
            <select
              name="gender"
              className="input input-bordered w-full"
              value={user.gender}
              onChange={handleChange}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
        </div>

        <div className="form-control md:w-1/2 mb-2">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <label className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input input-bordered w-full"
              value={user.password}
              onChange={handleChange}
            />
          </label>
        </div>

        <input
          type="submit"
          value="Update Now"
          className="btn btn-block bg-blue-300 hover:bg-blue-400 hover:border-[#331A15] text-[#331A15]"
        />
      </form>
    </div>
  );
};

export default UpdateUser;
