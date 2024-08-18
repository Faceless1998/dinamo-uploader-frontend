import React, { useState } from "react";
import axios from "axios";
import styles from "./alfa.module.css";

const VideoForm = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    video: null,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setFormValues({
      ...formValues,
      video: file,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", formValues.name);
    formData.append("video", formValues.video);

    axios.post("http://localhost:5000/api/videos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setSuccessMessage("Upload successful!");
        setErrorMessage("");
        setFormValues({
          name: "",
          video: null,
        });
      })
      .catch((error) => {
        setSuccessMessage("");
        setErrorMessage("Error uploading video.");
        console.error(error.response ? error.response.data : error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };  // <-- Added closing brace here to properly close handleSubmit function

  return (
    <div className={styles.container}>
      <div className={styles.title}>Video Upload</div>
      <form onSubmit={handleSubmit} className={styles.forms}>
        <div>
          <input
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
            placeholder="Video Name"
            required
            className={styles.nameInput}
          />
        </div>
        <div>
          <input
            type="file"
            name="video"
            onChange={handleVideoChange}
            accept="video/*"
            required
          />
        </div>
        <button type="submit" className={styles.reg} disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
        {successMessage && (
          <div className={styles.successMessage}>{successMessage}</div>
        )}
        {errorMessage && (
          <div className={styles.errorMessage}>{errorMessage}</div>
        )}
      </form>
    </div>
  );
};

export default VideoForm;
