import Axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Login.css"


const Login = () => {
 


  const url = "http://216.230.74.17:8013/api/Auth/login"
  const [data, setData] = useState({

    username: "",
    password: ""
  })
const navigation =useNavigate()
  const [isInvalidLogin,setInvalidLogin] = useState(false)
  const[error,setError]=useState(false)
  // const[username,setUsername]=useState(false)
  // const[password,setPassword]=useState(false)


  function submit(e) {

    e.preventDefault();


    Axios.post(url, {
      username: data.username,
      password: data.password

    })
      .then(res => {
        console.log(res.data)
        localStorage.setItem('token', res.data.token)

        setInvalidLogin(false)
        // navigation('/ClientSelect')
        navigation('/ClientSelect')

      }).catch(error=>{
        if(data.username.length===0 || data.password.length===0){
          setError(true)
        }
        console.log(error?.response?.status)
        if(error?.response?.status ===401 || error?.response?.status ===500){
          setInvalidLogin(true)
        }
      })

  }
  function handle(e) {
    // setUsernameError('');
    const newData = { ...data }
    newData[e.target.id] = e.target.value
    setData(newData)
    console.log(newData)

    // if ( usernameError!== '') {

    // }
    // else (
    //   setUsernameError('username required')
    // )

  }


  return (

    <div className='login'>

      <form className='login__form' onSubmit={(e) => submit(e)}>
        <h1>Login Here </h1><br />
        <input onChange={(e) => handle(e)} id="username" value={data.username} placeholder="username" type="text"></input><br /><br />
       {error&&data.username.length<=0?
       <h4 style={{ color: 'red', backgroundColor: '#ffffdc', padding: '5px 20px 5px 20px' }}>username cant be empty</h4>:""}<br/>


        {/* {usernameError && <div className="error">{usernameError}</div>} */}
        {/* {errorMessage ? <p style={{ color: 'red', backgroundColor: '#ffffdc', padding: '5px 20px 5px 20px' }}>{errorMessage}</p> : null} */}

      
        <input onChange={(e) => handle(e)} id="password" value={data.password} placeholder="password" type="text"></input><br />
        {error&&data.password.length<=0?
       <h4 style={{ color: 'red', backgroundColor: '#ffffdc', padding: '5px 20px 5px 20px' }}>password cant be empty</h4>:""}
      {isInvalidLogin && <span  style={{ color: 'red', backgroundColor: '#ffffdc', padding: '5px 20px 5px 20px' }}><h4>INVALID USER</h4></span>}<br/>
        <button type="submit" className='submit__btn'>submit</button>
      </form>
      
      {/* <Form/> */}
    </div>
  )
}

export default Login