import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


function Login() {

    const [values, setValues] = useState({
        email: '',
        password: '',

    })

    const navigate = useNavigate();


    const handlepInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: [event.target.value] }))
    }
    axios.defaults.withCredentials = true

    useEffect(() => {
        axios.get('http://localhost:5050')
            .then(res => {
                if (res.data.valid) {
                    navigate ('/');
                } else {
                    navigate('/login')
                }
            })
            .catch(err => console.log(err))
    }, [])


    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:5050/login', values)
            .then(res => {
                if (res.data.Login) {
                    navigate('/')
                } else {
                    alert("No recond")
                }
                console.log(res)

            })
            .catch(err => console.log(err))
    }


    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Log in</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" placeholder='Enter email' className='form-control rounded-0' onChange={handlepInput} />

                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder='Enter password' className='form-control rounded-0' onChange={handlepInput} />
                    </div>
                    <button type='submit' className='btn btn-success w-100'><strong>Log in</strong></button>
                    <p>Your are agree to aout terms and policies</p>
                    <Link to="/signup" className='btn btn-default border w-100 bg-light'>Create Account</Link>
                </form>
            </div>
        </div>
    )
}

export default Login