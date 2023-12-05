import React from 'react';
import '../css/PostDetail.css';

export default function PostDetail({item, toggleDetails}) {
  return (
    <div className="showComment">
    <div className="container">
        <div className="postPic">
          <img src={item.photo}alt=""  />
        </div>
        <div className="details">
                {/*card header */}
            <div className = "card-header" style={{borderBottom : "1px solid black"}}>
                <div className="card-pic">
                  <img src="https://play-lh.googleusercontent.com/WTBMP9GDlhMpydKHYlBe3-P7B2mxS24DPMNAm3Qm6HuWgYTMTz1QuDi6D6EIuzFcSv5R" alt="" />
                </div>
                <h5> {item.postedBy ? item.postedBy.name : 'Unknown'}</h5>
            </div>    

            {/* comment section */}
            <div className="comment-section"  style={{borderBottom : "1px solid black"}}>

                  {item.comments && item.comments.map((comment)=>{
                      return (
                        <p className='comm'>
                    <span className='commenter' style={{fontWeight :" bolder"}}>{comment.postedBy ? comment.postedBy.name + ": " : 'Unknown: '}</span>
                    <span className='commentText'> {comment.comment}</span>
                  </p>
                      );
                  })}
                  </div>

                  {/** card content */}
                  <div className="card-content">                   
                  <p> {item.likes && Array.isArray(item.likes) ? `${item.likes.length} Likes` : '0 Likes'}</p>
                        <p>{item.body}</p>
                  </div>
                  
                  {/* Add comment */}
                  <div className="add-comment">
                    <span className="material-symbols-outlined">mood</span>
                        <input type="text" placeholder='Add a comment' 
                        // value={comment} 
                        // onChange={(e)=>
                        //     {
                        //       setComment(e.target.value)
                        //     }
                            // }
                            />
                          <button className="comment" 
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

    <div className="close-comment" 
    onClick={()=>{
        toggleDetails();
    }}
    >
    <span className="material-symbols-outlined">close</span>
    </div>
</div>
)}
  
