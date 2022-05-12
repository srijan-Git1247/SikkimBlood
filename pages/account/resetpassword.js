import React from "react";
import { RiUserHeartFill } from "react-icons/Ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import AuthContext from "../../context/AuthContext";
import styles from "../../styles/AuthForm.module.css";
export default function resetpassword() {
  
//taking the code 
  const [code,setCode]=useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirm] = useState("");
  const { reset,error } = useContext(AuthContext);
  useEffect(() => error && toast.error(error));



  const handleSubmit = (e) => {
    e.preventDefault();
    reset({code,password,passwordConfirmation});
  };
  
  return (
    <Layout title="Reset Password Page">
      <div className={styles.auth}>
      <h1>
          <RiUserHeartFill />
          &nbsp;Reset-password
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="code">Code</label>

            <input
              type="text"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Otp Code"
            ></input>
          </div>
          <div>
            <label htmlFor="password">Password</label>

            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            ></input>
          </div>
          <div>
            <label htmlFor="passwordConfirm">Confirm Password</label>

            <input
              type="password"
              id="passwordConfirm"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              placeholder="Confirm Password"
            ></input>
          </div>
          <input type="submit" value="Reset-Password" className="btn"></input>
        </form>
      </div>
    </Layout>
  );
}
