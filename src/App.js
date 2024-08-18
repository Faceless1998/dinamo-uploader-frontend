import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import DataForm from "./components/DataForm";
import GalleryForm from "./components/GalleryForm";
import VideoForm from "./components/VideoForm";
import styles from "./App.module.css"; // Import styles

function App() {
  return (
    <Router>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <div className={styles.navLinks}>
            <Link to="/upload-data" className={styles.navLink}>Upload Data</Link>
            <Link to="/upload-gallery" className={styles.navLink}>Upload Gallery</Link>
            <Link to="/upload-video" className={styles.navLink}>Upload Video</Link>
          </div>
        </nav>
        <main className={styles.main}>
          <Routes>
            <Route path="/upload-data" element={<DataForm />} />
            <Route path="/upload-gallery" element={<GalleryForm />} />
            <Route path="/upload-video" element={<VideoForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
