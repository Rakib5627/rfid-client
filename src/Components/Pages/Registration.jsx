import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Registration = () => {
  const [data, setData] = useState({});
  const [uid, setUid] = useState(data?.UIDresult || "");

  useEffect(() => {
    if (data?.UIDresult) {
      setUid(data?.UIDresult);
    }
  }, [data?.UIDresult]);
  //-----------------
  useEffect(() => {
    const eventSource = new EventSource("http://localhost:5001/events");
    eventSource.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setData(newData);
    };
    return () => {
      eventSource.close();
    };
  }, []);
  //-----------------

  const handleUser = (e) => {
    e.preventDefault();
    const form = e.target;

    const userId = form.uid.value;
    const name = form.name.value;
    const email = form.email.value;
    const gender = form.gender.value;
    const password = form.password.value;

    const user = { userId, name, email, gender, password };

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
      <h2 className="text-3xl font-extrabold text-center">Register An User</h2>
      <form onSubmit={handleUser} className="flex flex-col items-center">
        <div className="form-control md:w-1/2 mb-2">
          <label className="label">
            <span className="label-text">ID</span>
          </label>
          <label className="input-group">
            <input
              type="text"
              name="uid"
              placeholder="ID"
              className="input input-bordered w-full"
              value={uid}
              onChange={(e) => setUid(e.target.value)}
              readOnly
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
            />
          </label>
        </div>

        <div className="form-control md:w-1/2 mb-2">
          <label className="label">
            <span className="label-text">Gender</span>
          </label>
          <label className="input-group">
            <select name="gender" className="input input-bordered w-full">
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
            />
          </label>
        </div>

        <input
          type="submit"
          value="Register Now"
          className="btn btn-block bg-blue-300 hover:bg-blue-400 hover:border-[#331A15] text-[#331A15]"
        />
      </form>
    </div>
  );
};

export default Registration;
