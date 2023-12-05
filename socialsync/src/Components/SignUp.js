 import React, { useState } from 'react';
 import textlogo from '../img/textlogo.png';
 import '../css/SignUp.css';
import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
 
 export default function SignUp() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const  [email, setEmail] = useState("");
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    //toast functions
    const notifyA =(msg)=> toast.error(msg)
    const notifyB =(msg)=> toast.success(msg)

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

     const postData = () => {
        //checking email
        if(!emailRegex.test(email)){
            notifyA("Invalid Email")
            return;
        }
        else if(!name || !userName || !email || !password) {
            notifyA({error:'All fields are mandatory'})
        }

        else if(!passRegex.test(password)) {
            notifyA("The password string must be 8 characters or longer including at least 1 lowercase alphabetical character, uppercase alphabetical character, numeric character and special character.")
         return;
        }

        //sending data to server
        fetch("/signup", {
            method : "post",
            headers: {
                'Content-Type':"application/json"
            },
            body:JSON.stringify({
                name:name,
                email:email,
                userName:userName,
                password:password


            })
        }) .then(res=>res.json())
        .then(data=>{
            if(data.error){
                notifyA(data.error)
            } else{
                notifyB(data.message)
                navigate('/signin')
            }
            console.log(data)})
     }

   /* const fetchData = async()=>{
        const response = await fetch("/");
        const data = await response.json()
        console.log(data)

}

useEffect(()=>{
    fetchData()
},[])
*/

   return (

    <div className='signUp'>
        <div className='signupform-container'>
        <div className='signupform'>
            <img className='signuplogo' src={textlogo} alt ='logo'></img>
                <p className='loginpara1'>
                Sign up to see photos and videos from your friends.</p>
                <div>
                    <input type='email' name ='email' id = 'email' value ={email} placeholder='E-mail' onChange={(e)=>{setEmail(e.target.value)}}></input>
                </div>

                <div>
                    <input type='text' name ='name' id = 'name' value = {name} placeholder='Full Name' onChange={((e)=>{setName(e.target.value)})}></input>
                </div>

                <div>
                   <input type='text' name ='username' id = 'userName' value={userName} placeholder='Username' onChange={((e)=>{setUserName(e.target.value)})}></input>
                </div>

                <div>
                 <input type='password' name ='password' id = 'password' value={password} placeholder='Password' onChange={((e)=>{setPassword(e.target.value)})}></input>
                </div>

                <p className='loginpara2'>
                By signing up, you agree to our Terms , Privacy Policy and Cookies Policy .</p>

            <input type = 'submit' id ='signup-btn' value ='Sign Up' onClick={()=>{postData()}}></input>
        </div>

        <div className='signupform2'>
            Already have an account ?<br></br>
            <Link to ='/signin'>
            <span className='signin'> 
                 Sign In
            </span>
            </Link>

        </div>
        </div>
    </div>
   )
 }
 