import React from 'react'
import {RiCloseLine} from 'react-icons/ri';
import "../css/Modal.css"
import { useNavigate } from 'react-router-dom';

export default function Modal({setModalOpen}) {
    const navigate = useNavigate();
  return (
    <div className="darkbg" onClick={()=> setModalOpen(false)}>
        <div className="centered">
        <div className='Modal'> 
                {/* modal header */}
                <div className="modalHeader">
                    <h5 className=''>Comfirm</h5>
                </div>
                <button className='closeBtn' onClick={()=> setModalOpen(false)}>
                    <RiCloseLine></RiCloseLine>
                </button>
                {/* modal content */}
                <div className="modalContent">
                    Do you really want to Log Out ?
                </div>
                <div className="modalActions">
                    <button className="logOutBtn" onClick={()=>{
                        setModalOpen(false)
                        localStorage.clear()
                        navigate("./signin")

                    }}>Log Out</button>
                    <button className="cancelBtn" onClick={()=> setModalOpen(false)}>Cancel</button>    
                </div>
        </div>
    </div>
    </div>
  )
}
