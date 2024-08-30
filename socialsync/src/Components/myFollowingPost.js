import React, {useEffect, useState} from 'react';
import "../css/Home.css"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function MyFollowingPost() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [ comment , setComment] = useState("");
  const [show, setShow] = useState(false);
  const [item , setItem] = useState([]);
  var picLink = "https://cdn-icons-png.flaticon.com/128/847/847969.png"


  //toast functions
const notifyA =(msg)=> toast.error(msg)
const notifyB =(msg)=> toast.success(msg)

  useEffect(()=>{

    const token = localStorage.getItem("jwt");
      if(!token){
          navigate('./signup')
      } 
       // Fetching all posts from mongodb 
       fetch("/myfollowingpost", {
        headers:{
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        },
      }).then(res=>res.json())
      .then(result =>{
        // console.log(result);

        setData(result)})
      
      .catch((err) => console.log(err))
     
  }, []);

    // to show and hide comments
    const toggleComment = (post)=>{
      if(show){
        setShow(false);
      } else {
        setItem(post);
        setShow(true);
        
      }
    }

  const likePost = (id)=>{
      fetch("/like", {
        method:"put",
        headers : {
          "Content-Type" : "application/json",
          Authorization : "Bearer " + localStorage.getItem("jwt")
        },
        body : JSON.stringify({
          postId:id
        })
      }).then(res=>res.json())
      .then((result)=>{
        const newData = data.map((posts)=>{
          if(posts._id == result._id) {
            return result
          } else {
            return posts;
          }
        })
        setData(newData)
        // console.log(result);
      })
  }


  const unlikePost = (id)=>{
    fetch("/unlike", {
      method:"put",
      headers : {
        "Content-Type" : "application/json",
        Authorization : "Bearer " + localStorage.getItem("jwt")
      },
      body : JSON.stringify({
        postId:id
      })
    }).then(res=>res.json())
    .then((result)=>{
      const newData = data.map((posts)=>{
        if(posts._id == result._id) {
          return result
        } else {
          return posts;
        }
      });
      setData(newData);
      // console.log(result);
     });
};

//function to make comment
const makeComment =(text,id)=>{
    fetch("/comment", {
      method:"put",
      headers : {
        "Content-Type" : "application/json",
        Authorization : "Bearer " + localStorage.getItem("jwt")
      },
      body : JSON.stringify({
        text: text,
        postId: id
      })
    }).then(res=>res.json())
    .then((result)=>{
      const newData = data.map((posts)=>{
      if(posts._id == result._id) {
        return result
      } else {
        return posts;
      }
    });
    setData(newData);
      setComment("");
      notifyB("Your comment is posted.")
      // console.log(result);
    });
 };

  return (
  <div className ='home'> 
      {/* card */}
        {data.map((post)=>{
          return(
          <div className = "card">
                {/*card header */}
                <div className = "card-header">
                  <div className="card-pic">
                    <img src= {post.postedBy.Photo ? post.postedBy.Photo : picLink} alt="" />
                  </div>
                  <h5>
                    <Link to = {`/profile/${post.postedBy._id}`}>
                    {post.postedBy ? post.postedBy.name : 'Unknown'}
                    </Link>
                    </h5>
                </div>

                {/* card image */}
                <div className="card-image">
                  <img src={post.photo} alt=""/>
                </div>
                {/** card content */}
                <div className="card-content">
                  {
                    post.likes.includes(JSON.parse(localStorage.getItem("user"))._id)?
                    (<span className="material-symbols-outlined material-symbols-outlined-red" onClick={()=>{unlikePost(post._id)}}>favorite </span>)
                    :(<span className="material-symbols-outlined" onClick={()=>{likePost(post._id)}}>favorite </span>)
                  }
 
                <p>{post.likes.length} Likes</p>
                <p>{post.body}</p>
                <p style={{fontWeight:"bolder", cursor: "pointer" }}
                   onClick={()=>{
                      toggleComment(post);
                     }}>
                      View all comments..
                </p>

                </div>
                {/* add comment */}
                <div className="add-comment">
                <span className="material-symbols-outlined">
                  mood</span>
                  <input type="text" placeholder='Add a comment' value={comment} onChange={(e)=>
                      {
                        setComment(e.target.value)
                      }
                    }/>
                  <button className="comment" onClick={()=>{
                      makeComment(comment, post._id);
                      }}>
                        Post
                  </button>
                </div>
            </div>
           )
        })}

      {/* show comments */}
      { show && (
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
                            <h5> {item.postedBy.name}</h5>
                      </div>    
  
                      {/* comment section */}
                      <div className="comment-section"  style={{borderBottom : "1px solid black"}}>

                            {item.comments.map((comment)=>{
                                return (
                                  <p className='comm'>
                              <span className='commenter' style={{fontWeight :" bolder"}}> {comment.postedBy.name} {": "}</span>
                              <span className='commentText'> {comment.comment}</span>
                            </p>
                                )
                            })}
                    
                            </div>
                            {/** card content */}
                            <div className="card-content">                   
                                  <p> {item.likes.length} Likes</p>
                                  <p>{item.body}</p>
                            </div>
                            
                            {/* Add comment */}
                            <div className="add-comment">
                              <span className="material-symbols-outlined">mood</span>
                                  <input type="text" placeholder='Add a comment' value={comment} onChange={(e)=>
                                      {
                                        setComment(e.target.value)
                                      }
                                      }/>
                                    <button className="comment" 
                                     onClick={()=>{
                                           makeComment(comment, item._id);
                                           toggleComment();
                                         }}
                                    >
                                        Post
                                    </button>
                            </div>
  
                     
                  </div>
              </div>
  
              <div className="close-comment" 
              onClick={()=>{
                toggleComment()
              }}>
              <span className="material-symbols-outlined">close</span>
              </div>
        </div>
         )}
    
    
  </div>
  )
}
