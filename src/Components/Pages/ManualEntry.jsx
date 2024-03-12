import { useState } from "react";
import Swal from "sweetalert2";

function ManualEntry() {
  const [dept, setDept] = useState("");
  const [code, setCode] = useState("");
  const [date, setDate] = useState("");
  const [studentIds, setStudentIds] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5001/insertManually", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        courseCode: dept + "-" + code,
        date,
        presentIds: studentIds.split(",").map((e) => parseInt(e) + ""),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.modifiedCount)
          Swal.fire({
            position: "center",
            icon: "success",
            title: "New data inserted successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        else
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "Ids are not inserted. May the these are already stored",
            showConfirmButton: false,
            timer: 1500,
          });
      });

    // console.log(
    //   dept + "-" + code,
    //   date,
    //   studentIds.split(",").map((e) => parseInt(e))
    // );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className=" mt-10">
        <h1 className=" text-2xl text-center mb-5">Add an entry</h1>
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
        </div>
        <div className="form-control w-full mb-2">
          <label className="label">
            <span className="label-text">Student Ids</span>
          </label>
          <label className="input-group">
            <input
              type="text"
              name="student_ids"
              placeholder="Example: 2002232,2002**2"
              className="input input-bordered w-full"
              value={studentIds}
              onChange={(e) => setStudentIds(e.target.value)}
            />
          </label>
        </div>
      </div>
      <button className="bg-green-500 py-2 px-4 text-white mt-5 disabled:bg-green-300">
        Submit
      </button>
    </form>
  );
}

export default ManualEntry;
