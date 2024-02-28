import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Registration = () => {
  const [uid, setUid] = useState("");
  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("female");
  const [mobile, setMobile] = useState("");
  const [isExist, setIsExist] = useState(false);

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:5001/events");
    eventSource.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      fetch(`http://localhost:5001/users/${newData.UIDresult}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status != false) {
            setUid(newData.UIDresult);
            setStudentId(data.studentId);
            setName(data?.name);
            setEmail(data?.email);
            setGender(data?.gender);
            setMobile(data?.mobile);
            setIsExist(true);
          } else {
            setUid(newData.UIDresult);
            setIsExist(false);
          }
        })
        .catch((error) => console.log(error));
    };
    return () => {
      eventSource.close();
    };
  }, []);

  const handleUser = (e) => {
    e.preventDefault();
    const form = e.target;

    const userId = form.uid.value;
    const name = form.name.value;
    const email = form.email.value;
    const gender = form.gender.value;
    const mobile = form.mobile.value;
    const studentId = form.studentId.value;

    const user = { userId, studentId, name, email, gender, mobile };
    // return console.log(user);

    fetch("http://localhost:5001/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "User Added",
            showConfirmButton: false,
            timer: 1500,
          });
          form.reset();
        }
      });
  };

  return (
    <div className="bg-[#F4F3F0] md:p-12">
      {isExist && (
        <p className=" text-white bg-red-300 rounded p-4 mt-10">
          User is already registered!!!
        </p>
      )}
      <h2 className="text-3xl font-extrabold text-center">Register An User</h2>
      <form
        onSubmit={handleUser}
        className="flex flex-col items-center w-[60%] mx-auto"
      >
        <div className=" flex justify-between w-full gap-10">
          <div className="form-control w-full mb-2">
            <label className="label">
              <span className="label-text">ID</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="uid"
                placeholder="ID"
                className="input input-bordered w-full"
                readOnly
                value={uid}
                onChange={(e) => setUid(e.target.value)}
              />
            </label>
          </div>
          <div className="form-control w-full mb-2">
            <label className="label">
              <span className="label-text">Student ID</span>
            </label>
            <label className="input-group">
              <input
                type="number"
                name="studentId"
                placeholder="Student ID"
                className="input input-bordered w-full"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
              />
            </label>
          </div>
        </div>
        <div className="form-control w-full mb-2">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <label className="input-group">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="input input-bordered w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>

        <div className="form-control w-full mb-2">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <label className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>

        <div className="form-control w-full mb-2">
          <label className="label">
            <span className="label-text">Gender</span>
          </label>
          <label className="input-group">
            <select
              name="gender"
              className="input input-bordered w-full"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
        </div>

        <div className="form-control w-full mb-2">
          <label className="label">
            <span className="label-text">Mobile</span>
          </label>
          <label className="input-group">
            <input
              type="number"
              name="mobile"
              placeholder="Mobile"
              className="input input-bordered w-full"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </label>
        </div>

        <input
          type="submit"
          value="Register Now"
          className="btn btn-block bg-blue-300 hover:bg-blue-400 hover:border-[#331A15] text-[#331A15] mt-8"
          disabled={isExist}
        />
      </form>
    </div>
  );
};

export default Registration;
