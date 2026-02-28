import { useEffect, useState} from "react";
import axios from "axios";
import { API_BASE } from "../config";
import "./admin.css";

export default function Admin() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [targets, setTargets] = useState([]);
  const [companyName, setCompanyName] = useState([]);
  const [companyUrl, setCompanyUrl] = useState([]);
  const [logo, setLogo] = useState([]);

  const API = `${API_BASE}/api/targets`;

  const fetchTargets = async () => {
    const res = await axios.get(API);
    setTargets(res.data);
  };

  useEffect(() => {
    fetchTargets();
  }, [fetchTargets]);

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    formData.append("video", video);
    formData.append("companyName", companyName);
    formData.append("companyUrl", companyUrl);
    formData.append("companyLogo", logo);

    await axios.post(API + "/upload", formData);

    setName("");
    setImage(null);
    setVideo(null);

    fetchTargets();
    alert("Uploaded ✅");
  };

  return (
    <div className="admin-page">
      <h2 className="title">🎯 Admin Panel</h2>

      <div className="admin-grid">

        {/* Upload Section */}
        <form className="upload-card" onSubmit={handleUpload}>
          <h3>Upload Target</h3>

          <input
            placeholder="Target name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />

          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
            required
          />
          <input
            placeholder="Company Name"
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />

          <input
            placeholder="Company Website URL"
            onChange={(e) => setCompanyUrl(e.target.value)}
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setLogo(e.target.files[0])}
          />

          <button>Upload</button>
        </form>

        {/* Uploaded Targets */}
        <div className="targets-card">
          <h3>Uploaded Targets</h3>

          <div className="targets-list">
            {targets.map((t) => (
              <div key={t._id} className="target-item">
                <h4>{t.name}</h4>

                <div className="media-wrapper">
                  <img
                    src={`${API_BASE}/${t.imagePath}`}
                    alt="target"
                  />

                  <video
                    src={`${API_BASE}/${t.videoPath}`}
                    controls
                    playsInline
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}