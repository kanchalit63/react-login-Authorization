import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {

  const [name,setName] = useState('')
  const navigate = useNavigate()
axios.defaults.withCredentials = true
  useEffect(()=>{
    axios.get('http://localhost:5050')
    .then( res => {
      if(res.data.valid){
        setName(res.data.name)
      }else{
        navigate ('/login')
      }
    })
    .catch(err => console.log(err))
  },[])

  return (
    
    <div>Welcome {name}</div>
  )
}

export default Home