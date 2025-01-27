import React, { useState } from 'react';
import './styles//Login.css'; 
import { Link } from 'react-router-dom';
import axios from 'axios';
import Modal from '../utils/Modal';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[modalMessage , setModalMessage ] = useState('');
  const [showModal , setShowModal] = useState(false);
  const [movingPage , setMovingPage ] = useState();


  const handleLogin = async (e) => {
    e.preventDefault();

    const userData = {
      email ,
      password
    }
    console.log(" userDatauserData ", userData)
    try {
      const response = await axios.post("http://localhost:8080/auth/login",userData ,{
        headers: {
          "Content-Type": "application/json", 
        },
      } )
      
      if(response.status === 200) {
        setModalMessage("Lets Shop !! ");
        setShowModal(true);
        setMovingPage('')
      }
     

    }catch(error) {
      console.log(" error " , error)
      if(error.status === 404) {
        setShowModal(true)
        setMovingPage('register')
        setModalMessage("User Doesnot Exists")
      }
      setModalMessage(error.response.data.error);
      setShowModal(true);
      setMovingPage("login")
    }
  };

  return (
    <>
    {showModal ? <Modal message={modalMessage} movingPage={movingPage} setModalMessage={setModalMessage} setShowModal={setShowModal}  /> : <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit" className="button">Login</button>
      </form>
      <div className="footer">
        <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
      </div>
    </div>}
    </>
  );
};

export default LoginPage;
