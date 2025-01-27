import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/styles/Modal.css'
const Modal = ({ message, movingPage , setModalMessage , setShowModal}) => {
    
    const nav = useNavigate();

    useEffect(()=> {
      if(movingPage === 'register') {
        setModalButton("Register Now !!")
      }else if(movingPage === 'login') {
        setModalButton("Login Now !!")
      } else {
        setModalButton("Show Now :) ")
      }
    },[]);

    const [modelButton , setModalButton] = useState('');
    const onClose = () => {

      setModalMessage('')
      const route = movingPage === 'register' ? '/register' : movingPage === 'login' ? '/login' : '/';
      nav(route)
      setShowModal(false)
        
    }
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-content">
          <p>{message}</p>
          <button onClick={onClose}>{modelButton}</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
