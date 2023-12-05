 import React , {useState, useContext} from 'react';
 import textlogo from '../img/textlogo.png';
 import '../css/SignIn.css';
 import { Link , useNavigate} from 'react-router-dom';
 import { toast } from 'react-toastify';
import { LoginContext } from '../context/LoginContext';

 export default function SingIn() {
    const {setUserLogin} = useContext(LoginContext)
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

//toast functions
const notifyA =(msg)=> toast.error(msg)
const notifyB =(msg)=> toast.success(msg)

const emailRegex= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const postData = () => {
        //checking email
        if(!emailRegex.test(email)){
            notifyA("Invalid Email u have entered")
            return;
        }

        //sending data to server
        fetch("/signin", {
            method : "post",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email: email,
                password: password
            })
        }).then(res=> res.json()).then(data=> {
            if(data.error){
                notifyA(data.error)
            } else {
                notifyB(" signed in successfully bro")
                console.log(data)
                localStorage.setItem("jwt", data.token)
                localStorage.setItem("user", JSON.stringify(data.user))
                setUserLogin(true)
                navigate('/')
            }
            console.log(data)
        })
     }
   return (
   
    <div className='signIn'>
    <div className='loginform-container'>
    <div className='loginform'>
        <img className='signinlogo' src={textlogo} alt ='logo'></img>
              <div>
              <input type='email' name ='email' id = 'email' value ={email} placeholder='E-mail' onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>

            <div>
            <input type='password' name ='password' id = 'password' value={password} placeholder='Password' onChange={((e)=>{setPassword(e.target.value)})}/>
            </div>
 

        <input type = 'submit' id ='login-btn' onClick={()=>{postData()}} value ='Login'></input>
    </div>
    
    <div className='loginform2'>
        Don't have an account ?<br></br>
        <Link to ='/signup'>
        <span className='signup'> 
         Create one
         </span>
        </Link>

    </div>
    </div>
</div>

   )
 }
 