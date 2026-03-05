import React from 'react'
import AuthForm from '../components/AuthForm'
import Input from '../components/Input'
import Button from '../components/Button'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {

    const navigate = useNavigate()
    const [name, setName] = React.useState('')
    const [username, setUsername] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')

    const handleSignup = async (e) => {
        e.preventDefault()

        if(name === "" || username === "" || email === "" || password === "" || confirmPassword === ""){
            alert("Please fill or input fields")
            return
        }
        if (confirmPassword !== password) {
            alert("Password should be same as confirm Password")
            return
        }

        try {
          const response = await fetch("http://localhost:5000/signup", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name, username, email, password})
          })

          const data = await response.json()

          if(!response.ok){
            alert(data.error)
            return
          }

          alert("Account Created!")
          navigate("/login")

        } catch (e) {
            alert("Something went wrong")
            console.log(e);
        }
}

  return (
    <div>
        <AuthForm title="Sign Up">
            <form onSubmit={handleSignup}>
                <Input label="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
                <Input label="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" />
                <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
                <Input label="Password" type="password" value={password} onChange={(e)  => setPassword(e.target.value)} placeholder="Enter your password" />
                <Input label="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm your password" />

            <Button   text="Sign Up" />
            </form>
            <p className='text-center mt-4'>
                Already have an account?
                <Link to="/login" className='text-blue-500'>Login here</Link>
            </p>
        </AuthForm>
    </div>
  )
}

export default Signup
