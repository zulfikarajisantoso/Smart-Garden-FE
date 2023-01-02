import img1 from "../img/b1.jpg";
import logg from "../img/login.jpg";
import { AiOutlineLogin } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { log } from "../features/userSlice";
function Login() {
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginwith = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, pass)
      .then((datanya) => {
        dispatch(
          log({
            uid: datanya.uid,
            email: datanya.email,
          })
        );
      })
      .catch((err) => {
        alert(err.message);
      });
    navigate("/");
  };

  const loginwithpop = () => {
    signInWithPopup(auth, provider).then((res) => {
      dispatch(
        log({
          uid: res.uid,
          email: res.email,
        })
      );

      navigate("/");
    });
  };

  return (
    <div className="relative flex justify-center overflow-hidden">
      <div className="relative ">
        <img src={img1} alt="" className="w-screen h-screen " />
      </div>
      <div className="columns-1 md:columns-2  contain absolute top-24   p-3 w-11/12 h-11/12">
        <div className="w-full hidden md:flex">
          <img src={logg} className="w-full" />
        </div>
        <div className="w-full h-full flex justify-center items-center flex-col pt-10">
          <div className="bg-slate-100 w-14 h-14 rounded-full flex justify-center items-center ">
            <AiOutlineLogin className="text-4xl text-green-400" />
          </div>
          <h1 className="font-body font-extrabold  my-4 ">HELLO AGAIN!</h1>
          <div className="divide-y divide-gray-200 w-3/4">
            <div className="py-4 text-base leading-6 space-y-7 text-gray-700 sm:text-lg sm:leading-7">
              <div className="relative ">
                <input
                  autoComplete="off"
                  onChange={(e) => setemail(e.target.value)}
                  id="email"
                  name="email"
                  type="text"
                  className="peer px-4 placeholder-transparent h-14 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                  placeholder="Email address"
                />
                <label className="absolute px-0 peer-focus:px-4 left-0 -top-5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-4 transition-all peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm">
                  Email Address
                </label>
              </div>
              <div className="relative">
                <input
                  autoComplete="off"
                  onChange={(e) => setpass(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  className="peer px-4 placeholder-transparent h-14 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                  placeholder="Password"
                />
                <label className="absolute px-0 peer-focus:px-4 left-0 -top-5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-4 transition-all peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm">
                  Password
                </label>
              </div>
              <div className="relative">
                <button
                  onClick={loginwith}
                  className="bg-green-500 text-white rounded-md px-2 py-3 w-full"
                >
                  Submit
                </button>
              </div>
              <div className="w-full flex justify-center">
                <button
                  onClick={loginwithpop}
                  className="flex items-center hover:border-2 hover:border-gray-200  p-1 rounded-md"
                >
                  <FcGoogle className="text-2xls" />
                  <h6 className=" text-[13px]  ml-2">Sign In With Google</h6>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
