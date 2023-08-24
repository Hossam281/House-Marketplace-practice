import { useState } from 'react'
import {ReactComponent as ArroIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import { Link } from 'react-router-dom'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { toast } from 'react-toastify'

const ForgotPassword = () => {

  const [email,setEmail]=useState('')

  const onChange=(e)=>setEmail(e.target.value)

  const onSubmit=async(e)=>{
    e.preventDefault()
    try {
      const auth=getAuth()
      await sendPasswordResetEmail(auth,email)
      toast.success("Password Reset Link Sent Successfully ")
    } catch (error) {
      toast.error('Something Went Wrong')
    }
  }


  return (
    <div className='pageContainer'>
      <header>
        <p className="pageHeader">
          Forgot Password
        </p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <input className='emailInput' placeholder='Email' type="email" id='email' onChange={onChange}  value={email} />
          <Link className='forgotPasswordLink' to='/sign-in'>
            Sign In
          </Link>
          <div className="signInBar">
            <div className="signInText">
              Send Reset Link
            </div>
            <button className='signInButton'><ArroIcon width=' 36px' height='36px' fill='#ffffff' type='submit'/></button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default ForgotPassword