import React ,{useEffect, useState}from 'react';
import '../css/Profile.css'
import { useParams } from 'react-router-dom';

export default function UserProfile() {
    const {userid} = useParams()
    const [user, setUser] = useState("");
    const [post, setPosts] = useState([]);
    const [isFollow, setIsFollow] = useState(false);
    var picLink = "https://cdn-icons-png.flaticon.com/128/847/847969.png"


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
            console.log(data);
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
            console.log(data);
            setIsFollow(false);
          });
      };


     useEffect(()=>{
       fetch (`/user/${userid}`, {
         headers:{
           Authorization : "Bearer " + localStorage.getItem("jwt")
         }
       })
       .then(res=>res.json())
       .then((result)=>{
        console.log(result)
         setUser (result.user)
        setPosts(result.post)
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
    <div className='Profile'>
     {/* profile frame */}
     <div className="profile-frame">
       {/* profile pic */}
       <div className="profile-pic">
         <img src={user.Photo ? user.Photo: picLink} alt="" />
       </div>
       {/* profile data */}
         <div className="profile-data">

        <div style={{display:'flex',alignItems:'center', justifyContent:'space-between'}} >
            <h1>{user.name}</h1>
            <button className="followBtn"
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
        <div className="profile-info" style={{display:'flex'}}>
             <p>{post.length} posts</p>
             <p>{user.followers? user.followers.length: "0"} Followers</p>
             <p>{user.following? user.following.length:"0"} Following </p>
        </div>

         </div>
     </div>
     <hr style={{width : "%", margin : "25px auto ", opacity : "0.8"}}/>
     {/* Gallery */}
     <div className="gallery">
     {post.map((pics)=>{
       return (<img key = {pics._id} src = {pics.photo} 
       
       className='item'></img>
       );
     })}
     </div>
    </div>
  );
}
