import React, { useState, useEffect } from "react";
import "../css/Createpost.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import UploadImage from "../img/upload-photo.png";

export default function Createpost() {
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0); // Progress state
  const [uploadedSize, setUploadedSize] = useState(0); // Uploaded size in MB
  const [totalSize, setTotalSize] = useState(0); // Total file size in MB
  const navigate = useNavigate();
  var picLink = "https://cdn-icons-png.flaticon.com/128/847/847969.png";

  // Toast functions
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  useEffect(() => {
    if (url) {
      fetch("/createPost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          body,
          pic: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            notifyA(data.error);
          } else {
            notifyB("woahh :) Successfully posted !!");
            navigate("/");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [url]);

  const postDetails = () => {
    // console.log(body, image);
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "socialsync");
    data.append("cloud_name", "tejasj23");

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.cloudinary.com/v1_1/tejasj23/image/upload", true);

    xhr.upload.onprogress = function (event) {
      if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100;
        setProgress(Math.round(percentComplete));
        setUploadedSize((event.loaded / (1024 * 1024)).toFixed(2));
        setTotalSize((event.total / (1024 * 1024)).toFixed(2));
      }
    };

    xhr.onload = function () {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        setUrl(response.url);
      } else {
        notifyA("Upload failed. Please try again.");
      }
    };

    xhr.send(data);
  };

  const loadfile = (event) => {
    var output = document.getElementById("output");
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // Free memory
    };
  };

  return (
    <div className="createPostContainer">
      <div className="createPost">
        <div className="post-header">
          <h4 style={{ margin: "10px auto" }}>Add New Post</h4>
          <button
            id="post-btn"
            onClick={() => {
              postDetails();
            }}
          >
            Share
          </button>
        </div>

        <div className="main-div">
          <img id="output" src={UploadImage} />
          <input
            className="uploadImg"
            type="file"
            accept="image/*"
            onChange={(event) => {
              loadfile(event);
              setImage(event.target.files[0]);
            }}
          />
        </div>

        <div className="details">
          <div className="card-header">
            <div className="user-img-name">
              <div className="card-pic">
                <img
                  src={
                    JSON.parse(localStorage.getItem("user")).photo
                      ? JSON.parse(localStorage.getItem("user")).photo
                      : picLink
                  }
                  alt=""
                />
                <div className="pic-username">
                  {JSON.parse(localStorage.getItem("user")).name}
                </div>
              </div>
            </div>
          </div>
          <input
          className="text-comment"
          type="text"
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
            }}
            name="text"
            placeholder="Write a caption"
          ></input>
        </div>

        {/* Upload progress */}
        {progress > 0 && (
          <div className="progress-info">
            <p>Uploading: {uploadedSize} MB / {totalSize} MB</p>
            <div className="progress-bar">
              <div
                className="progress"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
