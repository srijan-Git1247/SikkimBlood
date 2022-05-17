import React from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import { RiUserHeartFill } from "react-icons/Ri";
import styles from "../../styles/AuthForm.module.css";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Forgotpassword() {
  const { forgot, error } = useContext(AuthContext);
  useEffect(() => error && toast.error(error));
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    forgot({ email });
  };
  return (
    <Layout title="forgot password">
      <div className={styles.auth}>
        <h1>
          <RiUserHeartFill />
          &nbsp;Forgot-password
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Enter your Email address</label>

            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            ></input>
          </div>
          <input type="submit" value="Submit" className="btn"></input>
        </form>
      </div>
    </Layout>
  );
}
