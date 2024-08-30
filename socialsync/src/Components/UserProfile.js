import React, { useEffect, useState } from "react";
import "../css/Profile.css";
import { useParams } from "react-router-dom";

export default function UserProfile() {
  const { userid } = useParams();
  const [user, setUser] = useState("");
  const [post, setPosts] = useState([]);
  const [isFollow, setIsFollow] = useState(false);
  var picLink = "https://cdn-icons-png.flaticon.com/128/847/847969.png";

  //to follow user
  const followUser = (userId) => {
    fetch("/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setIsFollow(true);
      });
  };

  //to unfollow user
  const unfollowUser = (userId) => {
    fetch("/unfollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setIsFollow(false);
      });
  };

  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result)
        const sortedPosts = result.post.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setPosts(sortedPosts);
        setUser(result.user);
        if (
          result.user.followers.includes(
            JSON.parse(localStorage.getItem("user"))._id
          )
        ) {
          setIsFollow(true);
        }
      });
  }, [isFollow]);

  return (
    <div className="Profile">
      <div className="profile-frame">
        <div className="profile-pic">
          <img src={user.Photo ? user.Photo : picLink} alt="" />
        </div>
        <div className="profile-data">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h1>{user.name}</h1>
            <button
              className={isFollow ? "UnfollowBtn" : "FollowBtn"}
              onClick={() => {
                if (isFollow) {
                  unfollowUser(user._id);
                } else {
                  followUser(user._id);
                }
              }}
            >
              {isFollow ? "Unfollow" : "Follow"}
            </button>
          </div>
          <div className="profile-info" style={{ display: "flex" }}>
            <p>
              <span className="bold">{post.length}</span> posts
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
        {post.map((pics) => {
          return <img key={pics._id} src={pics.photo} className="item"></img>;
        })}
      </div>
    </div>
  );
}
