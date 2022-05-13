import React from "react";
import { RiUserHeartFill } from "react-icons/Ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import AuthContext from "../../context/AuthContext";
import styles from "../../styles/AuthForm.module.css";
export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const { register, error } = useContext(AuthContext);

  useEffect(() => error && toast.error(error));
  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log({ email, password });

    if (password !== passwordConfirm) {
      toast.error("Passwords don't match");
      return;
    }
    register({ username, email, password });
  };
  return (
    <Layout title="Register Page">
      <div className={styles.auth}>
        <h1>
          <RiUserHeartFill />
          &nbsp;Registration
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Enter Full Name</label>

            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="FullName"
            ></input>
          </div>
          <div>
            <label htmlFor="email">Email Address</label>

            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
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
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              placeholder="Password"
            ></input>
          </div>
          <input type="submit" value="Register" className="btn"></input>
        </form>
        <p>
          Already have an account?
          <Link href="/account/login"> Sign In</Link>
        </p>
      </div>
    </Layout>
  );
}
