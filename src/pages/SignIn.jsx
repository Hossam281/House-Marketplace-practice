import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibility from "../assets/svg/visibilityIcon.svg";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {  toast } from "react-toastify";
import OAuth from "../components/OAuth";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userData;
  const navigate = useNavigate();
  const onChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      userCredential.user && navigate('/')
    } catch (error) {
      toast.error('Incorrect credential')
    }
  };

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back !</p>
        </header>
        <main>
          <form onSubmit={onSubmit}>
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
              <img
                src={visibility}
                onClick={() => setShowPassword(!showPassword)}
                className="showPassword"
              />
            </div>

            <Link to="/forgot-password" className="forgotPasswordLink">
              Forgot Password ?
            </Link>

            <div className="signInBar">
              <p className="signInText">Sign In</p>
              <button type="submit" className="signInButton">
                <ArrowIcon fill="#ffffff" width="34px" height="34px" />
              </button>
            </div>
          </form>
          <OAuth/>
          <Link to="/sign-up" className="registerLink">
            {" "}
            Sign Up
          </Link>
        </main>
      </div>
    </>
  );
};

export default SignIn;
