import React from "react";
import { RiLogoutCircleLine } from "react-icons/ri";
import imgg from "../img/iotlog.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, selectUser } from "../features/userSlice";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const out = () => {
    signOut(auth).then((res) => {
      dispatch(logout);
      navigate("/login");
    });
  };

  return (
    <div className="h-14 relative bg-transparent w-full relative z-30">
      <div className=" px-10 flex justify-between items-center h-full">
        <div>
          <h3 className="font-body font-extrabold">TECH IOT</h3>
        </div>
        <div>
          <img src={imgg} alt="" className=" w-16 " />
        </div>
        <div>
          <button onClick={out} className="text-red-500 flex">
            <RiLogoutCircleLine className=" text-2xl  " />
            <p>Out</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
