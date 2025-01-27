import React, { useState } from 'react';
import './styles/Register.css'; 
import { Link } from 'react-router-dom';
import axios from 'axios';
import Modal from '../utils/Modal';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [role , setRole] = useState('customer');

  const[modalMessage , setModalMessage ] = useState('');
  const [showModal , setShowModal] = useState(false);
  const [movingPage , setMovingPage ] = useState();

  const handleRegister = async(e) => {
    e.preventDefault();
    
  
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Registering with", name, email, password , role);

    const formData = {
      name , email , password , role
    }

    try {
      const response = await axios.post("http://localhost:8080/auth/register", formData, {
        headers: {
          "Content-Type": "application/json", 
        },
      });

      if((response.request?.status===201) || (response.request?.status===409 )) {

        setShowModal(true)
        setMovingPage('login')
        setModalMessage("Registration successful!")
      } 
      
      
    } catch (error) {
      console.log("error " , error)
      if(error?.status === 409) {
        setShowModal(true)
        setMovingPage('login')
        setModalMessage("User Exists , Please Login")
        
      }else if (error.response && error.response.data) {
        setShowModal(true)
        setMovingPage('register')
        setModalMessage(error.response.data.message);
      }
    }
  };

  return (
    <>
     {showModal ? <Modal message={modalMessage} movingPage={movingPage} setModalMessage={setModalMessage}  setShowModal ={setShowModal }/> : <div className="register-container">
      <h2>Create Account</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="name" className="label">Name</label>
          <input
            type="text"
            id="name"
            className="input-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="label">Email</label>
          <input  
            type="email"
            id="email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="label">Password</label>
          <input
            type="password"
            id="password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword" className="label">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            className="input-field"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

        </div>
        <div className="form-group">
          <label htmlFor="role" className="label">Select Role</label>
          <select
            id="role"
            name="role"
            className="input-field"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="admin">Admin</option>
            <option value="customer" selected>Customer</option>
          </select>
        </div>
        <button type="submit" className="button">Register</button>
      </form>
      <div className="footer">
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
     }
    
   
    </>
  );
};

export default RegisterPage;
