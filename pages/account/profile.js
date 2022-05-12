import React from "react";
import { toast, ToastContainer } from "react-toastify";
import Layout from "../../components/Layout";
import Modal from "../../components/Modal";
import ImageUpload from "../../components/ImageUpload";
import { FaImage } from "react-icons/fa";
import ProfileRequest from "../../components/ProfileRequest";
import { useRouter } from "next/router";
import { API_URL } from "../../config";
import { parseCookie } from "../../helpers";
import Image from "next/image";
import styles from "../../styles/Profile.module.css";
import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import styles2 from "../../styles/Form.module.css";
export default function Profile({ userRequest, token, userData }) {
  const router = useRouter();
  const[disabled,setDisabled]=useState(true);

 
  const { user } = useContext(AuthContext);
  
  const [imagePreview, setimagePreview] = useState(
    userData.ProfilePicture
      ? userData.ProfilePicture.formats.thumbnail.url
      : null
  );

  const [showModal, setShowModal] = useState(false);
  const [values, setValues] = useState({
    role: "1",
    BloodType: "",
    PhoneNumber:null,
  });

  const [userValues, setUserValues] = useState({
    username: userData.username,
    email: userData.email,
    role: userData.role.type === "authenticated" ? "Non Donor" : "Blood Donor",
    PhoneNumber:userData.PhoneNumber,
    BloodType:userData.BloodType,
  });

  const deleteEvent = async (id) => {
    if (confirm("Are you sure you want to cancel your Request")) {
      const res = await fetch(`${API_URL}/events/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.reload();
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    //Some Validation
    const hasEmptyFields = Object.values(userValues).some(
      (element) => element === ""
    );
    if(userValues.role==="Non Donor")
    {
      userValues.role="1"
    }
    else{
      userValues.role="3"
    }
   // console.log(userValues);

    if (hasEmptyFields) {
      toast.error("Please fill in all the fields");
      // console.log("Please fill in all the fields");
      return;
    }

    const res = await fetch(`${API_URL}/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userValues),
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
        "Your Profile has been Updated."
      );
      router.push(`/`);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserValues({ ...userValues, [name]: value });
  };

  const handleunregister = async () => {
    console.log(values.PhoneNumber);
    if (confirm("Are you sure you do not want to donate any further?")) {
      const res = await fetch(`${API_URL}/users/${user.id}`, {
        method: "PUT",
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
          "You have backed out as a blood donor.Feel free to join the club anytime."
        );
        router.push(`/`);
      }
    } else {
      return;
    }
  };

  const imageUploaded = async (e) => {
    const res = await fetch(`${API_URL}/users/${userData.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setimagePreview(data.ProfilePicture.formats.thumbnail.url);
    setShowModal(false);
  };
  const handledisabled=(e)=>{
    e.preventDefault();
    alert("You can edit your profile");
    setDisabled(false);
  }
    const handleEnabled=(e)=>{
      e.preventDefault();
      
      setDisabled(true);


  }
  return (
    <Layout title="User Profile">
      <div className={styles.dash}>
        <h1>Your Profile</h1>
        {imagePreview ? (
          <Image
            src={imagePreview}
            height={150}
            width={150}
            className={styles2.Image}
          />
        ) : (
          <div>
            <p>No Image Uploaded</p>
          </div>
        )}
        <div>
          <button onClick={() => setShowModal(true)} className="btn-secondary">
            <FaImage />
            Upload a Picture
          </button>
          <br></br> <br></br> <br></br>
        </div>
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <ImageUpload
            userId={userData.id}
            imageUploaded={imageUploaded}
            token={token}
          />
        </Modal>
        <form onSubmit={handleSubmit} className={styles2.form}>
          <div className={styles2.grid}>
            <div>
              <label htmlFor="username">Name</label>
              <input
                type="text"
                id="username"
                name="username"
                value={userValues.username}
                onChange={handleInputChange}
                disabled={disabled}
              ></input>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={userValues.email}
                onChange={handleInputChange}
                disabled={disabled}
                
              ></input>
            </div>
            <div>
              <label htmlFor="PhoneNumber">PhoneNumber</label>
              <input
                type="tel"
                id="PhoneNumber"
                name="PhoneNumber"
                value={userValues.PhoneNumber}
                onChange={handleInputChange}
                disabled={disabled}
                required
              ></input>
            </div>
            <div>
              <label htmlFor="role">Account Type</label>
              <input
                type="text"
                id="role"
                name="role"
                value={userValues.role}
                onChange={handleInputChange}
                disabled
              ></input>
              {userData.role.type === "authenticated" ? (
                <>
                  <Link href="/Donor/registerdonor">
                    Register as a Blood Donor?
                  </Link>
                </>
              ) : (
                <><a  onClick={handleunregister}>
                Back out as Blood Donor?
              </a></>
              )}
            </div>
            {userData.role.type==="authenticated"?(<></>):(<><div>
            <label htmlFor="BloodType">Blood Type</label>
            <select
              className="blood"
              type="Text"
              id="BloodType"
              name="BloodType"
              value={userValues.BloodType}
              onChange={handleInputChange}
              disabled={disabled}
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
          </div></>)}
            
          </div>
          <br></br>
          {disabled===false?<><button className="btn-secondary" type="submit" onClick={handleSubmit}> 
            Save Changes
          </button></>:<></>}
          
        </form>
        
        {disabled===false?<><button className="btn-secondary" onClick={handleEnabled}>Cancel</button></>:<><button className="btn-secondary" onClick={handledisabled}>Edit Profile</button></>}
     
        <ToastContainer />
        <br></br>
        
        <h3>My Requests</h3>
        {userRequest.length !== 0 ? (
          <>
            {userRequest.map((evt) => (
              <ProfileRequest
                key={evt.id}
                evt={evt}
                handleDelete={deleteEvent}
              ></ProfileRequest>
            ))}
          </>
        ) : (
          <h2>You have not requested yet</h2>
        )}
      </div>
    </Layout>
  );
}
export async function getServerSideProps({ req }) {
  const { token } = parseCookie(req);
  const res = await fetch(`${API_URL}/events/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const res1 = await fetch(`${API_URL}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const userRequest = await res.json();
  const userData = await res1.json();

  return {
    props: {
      userRequest,
      token,
      userData,
    },
  };
}
