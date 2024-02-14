

const ReadTagID = () => {
    return (
        <div className="bg-white shadow-md rounded-md p-6 w-80 mx-auto mt-10 hover:skeleton">
            <h2 className="text-2xl font-bold mb-4 ">User Information</h2>
            <div className="my-2 flex items-center gap-4 ">
                <p className="block opacity-80">User ID:</p>
                <p>userId</p>
            </div>
            <hr />
            <div className="my-2 flex items-center gap-4 ">
                <p className="block opacity-80">Name:</p>
                <p>name</p>
            </div><hr />
            <div className="my-2 flex items-center gap-4 ">
                <p className="block opacity-80">Email:</p>
                <p>email</p>
            </div><hr />
            <div className="my-2 flex items-center gap-4 ">
                <p className="block opacity-80">Gender:</p>
                <p>gender</p>
            </div><hr />
            <div className="my-2 flex items-center gap-4 ">
                <p className="block opacity-80">Mobile No:</p>
                <p>00000</p>
            </div>
        </div>
    );
};

export default ReadTagID;