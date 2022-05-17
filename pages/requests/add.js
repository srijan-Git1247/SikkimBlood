import React from "react";
import Layout from "../../components/Layout";
import { useState } from "react";
import { useRouter } from "next/router";
import { API_URL } from "../../config/index";
import Link from "next/link";
import styles from "../../styles/Form.module.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import { parseCookie } from "../../helpers";

export default function add({ token }) {
  const { user } = useContext(AuthContext);

  const [values, setValues] = useState({
    name: "",
    units: "",
    venue: "",
    date: "",

    BloodType: "",
    Phone: "",
    description: "",

    published_at: null,
    user: user,
  });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (confirm("Are you sure you want post this request?")) {
      const hasEmptyFields = Object.values(values).some(
        (element) => element === ""
      );

      if (hasEmptyFields) {
        toast.error("Please fill in all the fields");

        return;
      }

      const res = await fetch(`${API_URL}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        if (res.status === 403 || res.status === 401) {
          toast.error("You are not authorized");
          return;
        }
        toast.error("Something went wrong");
      } else {
        const evt = await res.json();
        alert(
          "Your Request will be verified by the admin. You may be receiving a call before your request is initiated."
        );
        router.push(`/`);
      }
    } else {
      return;
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  return (
    <Layout title="Request Blood">
      <Link href="/events">&lt;Back</Link>
      <h1>Request</h1>
      <ToastContainer />

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Contact Person's Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
              placeholder="Contact Person's Full Name"
            ></input>
          </div>
          <div>
            <label htmlFor="units">Units</label>
            <input
              type="number"
              id="units"
              name="units"
              value={values.units}
              onChange={handleInputChange}
              placeholder="Units"
            ></input>
          </div>
          <div>
            <label htmlFor="venue">Hospital/Venue/Blood Required At:</label>
            <select
              className="venue"
              type="Text"
              id="venue"
              name="venue"
              value={values.venue}
              onChange={handleInputChange}
            >
              <option></option>
              <option value="STNM Hospital, Sochakgang, East Sikkim">
                STNM Hospital,Sochakgang, East Sikkim
              </option>
              <option value="Central Referral Hospital(Manipal), Tadong">
                Central Referral Hospital(Manipal),Tadong, East Sikkim
              </option>
              <option value="Singtam District Hospital, Singtam, East Sikkim">
                Singtam District Hospital, Singtam, East Sikkim
              </option>
              <option value="Namchi District Hospital, Namchi, South Sikkim">
                Namchi District Hospital, Namchi, South Sikkim
              </option>
              <option value="Geyzing District Hospital, West Sikkim">
                Geyzing District Hospital, West Sikkim
              </option>
              <option value="Mangan District Hospital, North Sikkim">
                Mangan District Hospital, North Sikkim
              </option>
            </select>
          </div>

          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={values.date}
              onChange={handleInputChange}
            ></input>
          </div>

          <div>
            <label htmlFor="BloodType">Blood Type</label>
            <select
              className="blood"
              type="Text"
              id="BloodType"
              name="BloodType"
              value={values.BloodType}
              onChange={handleInputChange}
            >
              <option></option>
              <option value="A+">A+</option>
              <option value="B+">B+</option>
              <option value="O+">O+</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="A-">A-</option>
              <option value="B-">B-</option>
              <option value="O-">O-</option>
            </select>
          </div>
          <div>
            <label htmlFor="Phone">Phone Number</label>
            <input
              type="tel"
              id="Phone"
              name="Phone"
              pattern="[0-9]{10}"
              value={values.Phone}
              required
              onChange={handleInputChange}
              placeholder="Please Enter a Valid Phone Number"
            ></input>
          </div>
        </div>

        <div>
          <label htmlFor="description">Request-Description</label>
          <textarea
            type="text"
            id="description"
            name="description"
            value={values.description}
            onChange={handleInputChange}
            placeholder="We would like to know more about your Request"
          ></textarea>
        </div>

        <input type="submit" value="Post Request" className="btn"></input>
      </form>
    </Layout>
  );
}
export async function getServerSideProps({ req }) {
  const { token } = parseCookie(req);
  return {
    props: {
      token,
    },
  };
}
