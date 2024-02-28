import { useEffect, useState } from "react";

const ReadTagID = () => {
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  //-----------------
  useEffect(() => {
    const eventSource = new EventSource("http://localhost:5001/events");
    eventSource.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      fetch(`http://localhost:5001/users/${newData.UIDresult}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status != false) {
            setError("");
            setData(data);
          } else {
            setData({
              userId: "-------",
              name: "-------",
              email: "-------",
              gender: "-------",
              mobile: "-------",
            });
            setError(data?.message);
          }
        })
        .catch((error) => console.log(error));
    };
    return () => {
      eventSource.close();
    };
  }, []);
  //-----------------
  return (
    <div className="bg-white shadow-md rounded-md p-6 w-[50%] mx-auto mt-10 hover:skeleton">
      <h2 className="text-2xl font-bold mb-4 ">User Information</h2>
      <div className="my-2 flex items-center gap-4 ">
        <p className="block opacity-80">User ID:</p>
        <p>{data?.UIDresult || data?.userId}</p>
      </div>
      <hr />
      <div className="my-2 flex items-center gap-4 ">
        <p className="block opacity-80">Name:</p>
        <p>{data?.name}</p>
      </div>
      <hr />
      <div className="my-2 flex items-center gap-4 ">
        <p className="block opacity-80">Email:</p>
        <p>{data?.email}</p>
      </div>
      <hr />
      <div className="my-2 flex items-center gap-4 ">
        <p className="block opacity-80">Gender:</p>
        <p>{data?.gender}</p>
      </div>
      <hr />
      <div className="my-2 flex items-center gap-4 ">
        <p className="block opacity-80">Mobile No:</p>
        <p>{data?.mobile}</p>
      </div>
      {error && (
        <p className=" text-white bg-red-300 rounded p-4 mt-10">{error}</p>
      )}
    </div>
  );
};

export default ReadTagID;
