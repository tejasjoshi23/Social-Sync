import React, {useState, useEffect} from 'react';
import '../css/Createpost.css';
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom';


export default function Createpost() {
const [body, setBody ] = useState("");
const [image, setImage] = useState("");
const [url, setUrl] = useState("")
const navigate = useNavigate() 
var picLink = "https://cdn-icons-png.flaticon.com/128/847/847969.png"


//toast functions
const notifyA =(msg)=> toast.error(msg)
const notifyB =(msg)=> toast.success(msg)

useEffect(()=>{
// savinfg post to mongodb
if(url){
fetch("/createPost",{
    method: "post",
    headers :{
        "Content-Type" : "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
    },
    body:JSON.stringify({
        body, 
        pic:url
    })
    })  .then(res=>res.json())
        .then(data =>{
            if(data.error){
                notifyA(data.error)
            }else {
                notifyB("woahh :) Successfully posted !!")
                navigate("/")
            }})
        .catch(err => console.log(err))
    }
}, [url])

//posting image to cloudinary
const postDetails = ()=>{
    console.log(body,image)
    const data  = new FormData();
    data.append("file", image)
    data.append("upload_preset", "socialsync")
    data.append("cloud_name", "tejasj23")
    fetch("https://api.cloudinary.com/v1_1/tejasj23/image/upload",{
        method : "post",
        body: data
    }).then (res =>res.json())
    .then(data => setUrl(data.url))
    .catch(err => console.log(err))   
}
    const loadfile =(event)=>{
        var output = document.getElementById('output');
        output.src = URL.createObjectURL(event.target.files[0]);
        output.onload = function() {
          URL.revokeObjectURL(output.src) // free memory
    }
};
return (
    <div className='createPost'>
            {/* header */}
        <div className="post-header">
            <h4 style={{margin : '3px auto'}}>Create New Post</h4>
            <button id = 'post-btn' onClick={()=>{postDetails()}}>Share</button>
        </div>
        {/* image previwe */}
        <div className="main-div">
            <img id ="output" src ="https://cdn-icons-png.flaticon.com/512/1160/1160358.png" />
            <input type="file" accept='image/*'
            onChange={(event)=>{
            loadfile(event);
            setImage(event.target.files[0])
            }} />
        </div>
        {/* details of post */}
        <div className="details">
            <div className="card-header">
                <div className="card-pic">
                    <img src= { picLink} alt="" />
                </div>
                <h5>username </h5>
            </div>
            <textarea value = {body} 
            onChange={(e)=>{
                setBody(e.target.value)
                }} 
                name="text" placeholder='Write a caption'>
            </textarea>
        </div>
    </div>
  )
}
