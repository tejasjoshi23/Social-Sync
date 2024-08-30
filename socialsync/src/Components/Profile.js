import React, { useEffect, useState } from "react";
import "../css/Profile.css";
import PostDetail from "./PostDetail.js";
import ProfilePic from "./ProfilePic";

export default function Profile() {
  var picLink = "https://cdn-icons-png.flaticon.com/128/847/847969.png";
  const [pic, setPic] = useState([]);
  const [show, setShow] = useState(false);
  const [post, setPost] = useState([]);
  const [changePic, setChangePic] = useState(false);
  const [user, setUser] = useState("");
  // to show and hide comments
  const toggleDetails = (post) => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      setPost(post);
    }
  };

  const changeprofile = () => {
    if (changePic) {
      setChangePic(false);
    } else {
      setChangePic(true);
    }
  };
  useEffect(() => {
    fetch(
      `/user/${
        JSON.parse(localStorage.getItem("user"))._id
      }`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        //console.log(result);
        const sortedPosts = result.post.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setPic(sortedPosts);
        setUser(result.user);
      });
  }, [pic]);

  return (
    <div className="Profile">
      {/* profile frame */}
      <div className="profile-frame">
        {/* profile pic */}
        <div className="profile-pic">
          <img
            onClick={changeprofile}
            src={user.Photo ? user.Photo : picLink}
            alt=""
          />
        </div>
        {/* profile data */}
        <div className="profile-data">
          <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
          <div className="profile-info" style={{ display: "flex" }}>
            <p>
              <span className="bold">{pic ? pic.length : "0"}</span> posts
            </p>
            <p>
              <span className="bold">
                {user.followers ? user.followers.length : "0"}
              </span>{" "}
              Followers
            </p>
            <p>
              <span className="bold">
                {user.following ? user.following.length : "0"}
              </span>{" "}
              Following
            </p>
          </div>
        </div>
      </div>
      {/* Gallery */}
      <div className="gallery">
        {pic.map((pics) => {
          return (
            <img
              key={pics._id}
              src={pics.photo}
              onClick={() => {
                toggleDetails(pics);
              }}
              className="item"
            ></img>
          );
        })}
      </div>

      {/* profile post detail */}
      {show && <PostDetail item={post} toggleDetails={toggleDetails} />}
      {changePic && <ProfilePic changeprofile={changeprofile} />}
    </div>
  );
}
