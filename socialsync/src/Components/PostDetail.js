import React from "react";
import "../css/PostDetail.css";

export default function PostDetail({ item, toggleDetails }) {
  const picLink = "https://cdn-icons-png.flaticon.com/128/847/847969.png";
  const profilePicLink =
    item.postedBy && item.postedBy.photo ? item.postedBy.photo : picLink; 

  return (
    <div className="showComment">
      <div className="container">
        <div className="postPic">
          <img src={item.photo} alt="" />
        </div>
        <div className="details">
          {/*card header */}
          <div className="card-header">
            <div className="card-pic">
              <img src={profilePicLink} alt="" />
            </div>
            <h5> {item.postedBy && item.postedBy.name ? item.postedBy.name : "Unknown"}</h5>
          </div>

          {/* comment section */}
          <div
            className="comment-section"
          >
            {item.comments &&
              item.comments.map((comment) => {
                return (
                  <p className="comm">
                    <span
                      className="commenter"
                      style={{ fontWeight: " bolder" }}
                    >
                      {comment.postedBy
                        ? comment.postedBy.name + ": "
                        : "Unknown: "}
                    </span>
                    <span className="commentText"> {comment.comment}</span>
                  </p>
                );
              })}
          </div>

          {/** card content */}
          <div className="card-content">
            <p>
              {" "}
              {item.likes && Array.isArray(item.likes)
                ? `${item.likes.length} Likes`
                : "0 Likes"}
            </p>
            <p>{item.body}</p>
            <p>{item.comments && Array.isArray(item.comments) ? item.comments.length : 0} Comments</p>
          </div>

          {/* Add comment */}
          <div className="add-comment">
            <span className="material-symbols-outlined">mood</span>
            <input
              type="text"
              placeholder="Add a comment"
              // value={comment}
              // onChange={(e)=>
              //     {
              //       setComment(e.target.value)
              //     }
              // }
            />
            <button
              className="comment"
              //    onClick={()=>{
              //          makeComment(comment, item._id);
              //          toggleComment();
              //        }}
            >
              Post
            </button>
          </div>
        </div>
      </div>

      <div
        className="close-comment"
        onClick={() => {
          toggleDetails();
        }}
      >
        <span className="material-symbols-outlined">
          close
        </span>
      </div>
    </div>
  );
}
