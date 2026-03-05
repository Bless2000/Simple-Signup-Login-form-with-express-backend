import React from 'react'
import { useState } from 'react'
import AuthForm from '../components/AuthForm'
import Input from '../components/Input'
import Button from '../components/Button'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {

    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {

        e.preventDefault();
        console.log({username, password});

        if(username === "" || password === "") {
            alert("Please fill in all fields");
            return;
        }

        try {
          const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
          })

          const data = await response.json();

          if(!response.ok){
            alert(data.error)
            return
          }

          navigate("/home")

        } catch (e) {
            alert("Something went wrong somewhere");
            console.log(e);
        }
    }



  return (
    <div>
        <AuthForm title="Login">
            <form onSubmit={handleLogin}>
                <Input label="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" />
                <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
                <Button  text="Login" />
            </form>

            <p>
                Don't have an Account?

                <Link to="/" className='text-blue-500'>Sign up here</Link>
            </p>
        </AuthForm>
    </div>
  )
}

export default Login
