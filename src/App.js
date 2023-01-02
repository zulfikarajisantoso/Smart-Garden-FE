import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";

import React, { useEffect } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { log, logout, selectUser } from "./features/userSlice";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";

function App() {
  const userr = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const masuk = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        dispatch(
          log({
            uid: user.uid,
            email: user.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return masuk;
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        {userr ? (
          <>
            <Route index path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route index path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
