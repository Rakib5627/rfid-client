import { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const Attendance = () => {
  const [users, setUsers] = useState([]);
  const [dept, setDept] = useState("");
  const [code, setCode] = useState("");
  const [courseCode, setCourserCode] = useState("");
  const [date, setDate] = useState("");
  const [machineNo, setMachineNo] = useState("");

  // console.log(users);

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:5001/events");
    eventSource.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      // console.log(newData);
      fetch(`http://localhost:5001/users/${newData.UIDresult}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status != false) {
            // let x = [...users, data];
            // setUsers(x);
            setUsers((prevUsers) => {
              const isExist = prevUsers.find(
                (item) => item.userId == data.userId && item.studentId != ""
              );
              if (!isExist) {
                data["machineNo"] = newData.machineNo;
                return [...prevUsers, data];
              }
              Swal.fire({
                title: "Duplicate Entry",
                text: "This card is already used",
                icon: "warning",
                timer: 1000,
              });
              return prevUsers;
            });
          } else {
            Swal.fire({
              title: "Invalid card!",
              text: "User is not registered!",
              icon: "warning",
              timer: 1000,
            });
          }
        })
        .catch((error) => console.log(error));
    };
    return () => {
      eventSource.close();
    };
  }, []);

  useEffect(() => {
    if (users[users?.length - 1]?.role == "teacher") {
      setDept(users[users?.length - 1]?.courseCode.split("-")[0]);
      setCode(users[users?.length - 1]?.courseCode.split("-")[1]);
      setCourserCode(users[users?.length - 1]?.courseCode);
    }
  }, [users]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(users, parseInt(machineNo));
    const arr = users
      .map((user) => {
        if (user.role != "teacher" && user.machineNo == machineNo) {
          return user.studentId;
        }
      })
      .filter((user) => user);
    const data = {
      courseCode: courseCode ? courseCode : dept + "-" + code,
      date,
      presentIds: arr,
    };
    // return console.log(data);
    if (!data.courseCode || !data.date) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Please fill all the fields",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    if (!data.presentIds.length) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "No student used their cards",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    // console.log(data);

    fetch("http://localhost:5001/attendance", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId)
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Attendance data stored successfully",
            showConfirmButton: false,
            timer: 1500,
          });
      });
  };
  const handleDelete = (id) => {
    // console.log(id);
    setUsers(users.filter((user) => user._id != id));
  };

  return (
    <div className="mt-20 flex flex-col items-center">
      <form onSubmit={handleSubmit} className="overflow-x-auto">
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
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="text-lg text-red-400 hover:text-red-600"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <hr className=" my-4" />
        <div className=" flex justify-between w-full gap-10">
          <div className="form-control w-full mb-2">
            <label className="label">
              <span className="label-text">Course Code</span>
            </label>
            <label className="input-group flex items-center">
              <select
                name="dept"
                className="input input-bordered w-full"
                value={dept}
                onChange={(e) => setDept(e.target.value)}
              >
                <option value="" disabled>
                  select
                </option>
                <option value="EEE">EEE</option>
                <option value="ECE">ECE</option>
                <option value="CSE">CSE</option>
              </select>
              <p className=" mx-2">-</p>
              <input
                type="number"
                name="code"
                placeholder="Code"
                className="input input-bordered w-full"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </label>
          </div>
          <div className="form-control w-full mb-2">
            <label className="label">
              <span className="label-text">Date</span>
            </label>
            <label className="input-group">
              <input
                type="date"
                name="date"
                className="input input-bordered w-full"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>
          </div>
          <div className="form-control w-full mb-2">
            <label className="label">
              <span className="label-text">Machine No</span>
            </label>
            <label className="input-group">
              <input
                type="number"
                name="machineNo"
                className="input input-bordered w-full"
                value={machineNo}
                onChange={(e) => setMachineNo(e.target.value)}
              />
            </label>
          </div>
        </div>
        <button
          disabled={!users.length}
          className="bg-green-500 py-2 px-4 text-white mt-5 disabled:bg-green-300"
        >
          Submit
        </button>
      </form>
      <div className=" bg-slate-100 rounded-lg  w-1/4 p-5 mt-5">
        <p>Dept: {dept}</p>
        <p>courseCode: {(dept || code) && dept + "-" + code}</p>
        <p>Total Entry: {users?.length}</p>
      </div>
    </div>
  );
};

export default Attendance;
