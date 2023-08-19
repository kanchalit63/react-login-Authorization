import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
    });

    const navigate = useNavigate()

    const handleSubmit = async (event) =>{
        event.preventDefault();
        axios.post('http://localhost:5050/signup', values)
        .then (res => {
            console.log(res)
            navigate('/login')
        })
        .catch(err => console.log(err))
    }

    const handlepInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));

    };

    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <form onSubmit={handleSubmit}>
                    <h2>Sign Up</h2>
                    <div className='mb-3'>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" placeholder='Enter name' className='form-control rounded-0' onChange={handlepInput} />

                    </div>
                    <div className='mb-3'>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" placeholder='Enter email' className='form-control rounded-0' onChange={handlepInput} />

                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder='Enter password' className='form-control rounded-0' onChange={handlepInput} />
                    </div>
                    <button type="submit" className='btn btn-success w-100'><strong>Sign up</strong></button>
                    <p>Your are agree to our terms and policies</p>
                    <Link to="/login" className='btn btn-default border w-100 bg-light'>Login</Link>
                </form>
            </div>
        </div>
    );
}

export default Signup;
