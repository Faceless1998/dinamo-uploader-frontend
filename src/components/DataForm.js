import React, { useState } from "react";
import axios from "axios";
import styles from "./style.module.css";

const DataForm = () => {
  const [formValues, setFormValues] = useState({
    headingEng: "",
    headingGeo: "",
    textEng: "",
    textGeo: "",
    mainPhoto: null,
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

  const handleMainPhotoChange = (e) => {
    const file = e.target.files[0];
    setFormValues({
      ...formValues,
      mainPhoto: file,
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
    setLoading(true); // Start loading

    const formData = new FormData();
    formData.append("headingEng", formValues.headingEng);
    formData.append("headingGeo", formValues.headingGeo);
    formData.append("textEng", formValues.textEng);
    formData.append("textGeo", formValues.textGeo);
    if (formValues.mainPhoto) {
      formData.append("mainPhoto", formValues.mainPhoto);
    }
    formValues.photos.forEach((photo) => {
      formData.append("photos", photo);
    });

    // Debug: Log FormData contents
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    axios
      .post("http://localhost:5000/api/data", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setSuccessMessage("Upload successful!");
        setErrorMessage("");
        setFormValues({
          headingEng: "",
          headingGeo: "",
          textEng: "",
          textGeo: "",
          mainPhoto: null,
          photos: [],
        });
        window.location.reload();
      })
      .catch((error) => {
        setSuccessMessage("");
        setErrorMessage("Error uploading data.");
        console.error(error);
      })
      .finally(() => {
        setLoading(false); // Stop loading
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Product Upload</div>
      <form onSubmit={handleSubmit} className={styles.forms}>
        <div>
          <input
            type="text"
            name="headingEng"
            value={formValues.headingEng}
            onChange={handleInputChange}
            placeholder="English Heading"
            required
            className={styles.nameInput}
          />
        </div>
        <div>
          <input
            type="text"
            name="headingGeo"
            value={formValues.headingGeo}
            onChange={handleInputChange}
            placeholder="Georgian Heading"
            required
            className={styles.nameInput}
          />
        </div>
        <div>
          <textarea
            name="textEng"
            value={formValues.textEng}
            onChange={handleInputChange}
            placeholder="English Text"
            required
            className={styles.textInput}
          />
        </div>
        <div>
          <textarea
            name="textGeo"
            value={formValues.textGeo}
            onChange={handleInputChange}
            placeholder="Georgian Text"
            required
            className={styles.textInput}
          />
        </div>
        <div>
          <input
            type="file"
            name="mainPhoto"
            onChange={handleMainPhotoChange}
            required
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

export default DataForm;
