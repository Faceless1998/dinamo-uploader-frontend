import React, { useState } from "react";
import axios from "axios";
import styles from "./alfa.module.css";

const GalleryForm = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    photos: [],
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

  const handlePhotosChange = (e) => {
    const files = Array.from(e.target.files);
    setFormValues({
      ...formValues,
      photos: files,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", formValues.name);
    formValues.photos.forEach((photo) => {
      formData.append("photos", photo);
    });

    axios
      .post("http://localhost:5000/api/albums", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setSuccessMessage("Upload successful!");
        setErrorMessage("");
        setFormValues({
          name: "",
          photos: [],
        });
        window.location.reload();
      })
      .catch((error) => {
        setSuccessMessage("");
        setErrorMessage("Error uploading data.");
        console.error(error.response ? error.response.data : error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Album Upload</div>
      <form onSubmit={handleSubmit} className={styles.forms}>
        <div>
          <input
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
            placeholder="Album Name"
            required
            className={styles.nameInput}
          />
        </div>
        <div>
          <input
            type="file"
            name="photos"
            onChange={handlePhotosChange}
            multiple
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

export default GalleryForm;
