import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar";



const Main = () => {



    return (
       
            <div className=" mx-2 max-w-6xl md:mx-auto pb-20">
                <Navbar></Navbar>
                <Outlet></Outlet>
            </div>
   

    );
};

export default Main;