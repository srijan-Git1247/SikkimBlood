import React from "react";
import { useState } from "react";
import styles from "../styles/Form.module.css";
import { API_URL } from "../config";
export default function ImageUpload({ userId, imageUploaded, token }) {
  const [image, setImage] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    const formData = new FormData();
    formData.append("files", image);
    formData.append("ref", "user");
    formData.append("refId", userId);
    formData.append("field", "ProfilePicture");
    formData.append("source", "users-permissions");
    

    const res = await fetch(`${API_URL}/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (res.ok) {
      imageUploaded();
    }
    
  };

  const handleFileChange = (e) => {
    
    setImage(e.target.files[0]);
  };

  return (
    <div className={styles.form}>
      <h1>Upload Profile Picture</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type="file" onChange={handleFileChange} />
        </div>
        <input type="submit" value="Upload" className="btn" />
      </form>
    </div>
  );
}
