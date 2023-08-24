import React from 'react'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibility from "../assets/svg/visibilityIcon.svg";
import {getAuth,createUserWithEmailAndPassword , updateProfile} from 'firebase/auth'
import {db} from '../firebase.config'
import { doc, setDoc ,serverTimestamp} from "firebase/firestore"; 
import {toast} from 'react-toastify'
import OAuth from '../components/OAuth';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    name:'',
    email: "",
    password: "",
  });

  const {name, email, password } = userData;
  const navigate = useNavigate();
  const onChange = (e) => {
    setUserData((prev)=>({...prev,[e.target.id]:e.target.value}))
  };

  const onSubmit= async(e)=>{

    e.preventDefault()
    try {
      const auth=getAuth()

      const userCredential= await createUserWithEmailAndPassword(auth,email,password)

      const user=userCredential.user;
      updateProfile(auth.currentUser,{
        displayName: name,
      })

      const userDataCopy={...userData}
      delete userDataCopy.password
      userDataCopy.timestamp=serverTimestamp()
      await setDoc(doc(db, "users", user.uid),userDataCopy)
      navigate('/')
    } catch (error) {
     toast.error('Something Went Wrong')
    }
  }

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Registration</p>
        </header>
        <main>
          <form onSubmit={onSubmit}>
          <input
              type="text"
              className="nameInput"
              placeholder="Name"
              id="name"
              value={name}
              onChange={onChange}
            />
            <input
              type="email"
              className="emailInput"
              placeholder="Email"
              id="email"
              value={email}
              onChange={onChange}
            />
            <div className="passwordInputDiv">
              <input
                className="passwordInput"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={onChange}
              />
              <img src={visibility} onClick={()=>setShowPassword(!showPassword)}  className="showPassword" />
            </div>

            

            <div className="signUpBar">
              <p className="signUpText">
                Sign Up 
              </p>
              <button type='submit' className="signUpButton">
                <ArrowIcon fill='#ffffff' width='34px' height='34px'/>
              </button>
              
            </div>
           
          
          </form>
            
          
           <OAuth/>
          <Link to='/sign-in' className="registerLink"> Sign In</Link>
        </main>
      

      </div>
    </>
  );
};


export default SignUp