import React, { useState, } from 'react';
import {Link,Navigate} from 'react-router-dom';

const BASE_URL = `https://fitnesstrac-kr.herokuapp.com/api`;

const Login = ({setLoggedIn,setUser, setUserId}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [pressed, setPressed] = useState(false);

  const handleRefreshAndRedirect = () => {
    window.location.reload();
    return <Navigate to="/" />;
  };

  const login = async (ev) => {
    ev.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password

        })
      });
      const result = await response.json();
      console.log(result);
      setPressed(true);
      if(result.message==="you're logged in!") {
        setSuccess(true);
        setLoggedIn(true);
        setResultMessage(result.message);
        setUsername('');
        setPassword('');
        localStorage.setItem('token', result.token);
        localStorage.setItem('user',result.user.username);
        localStorage.setItem('userId',result.user.id);
        window.location.reload()
      }else{
        setSuccess(false);
        setResultMessage(result.message);
        setLoggedIn(false);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return <>
    <div className="loginContainer" style={{display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems:'center',marginTop:'100px'}}>
      <h1 style={{ fontSize: '70px', textAlign: 'center', marginBottom: '50px' }}>Log In</h1>
      <form onSubmit={login} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <input type='text' placeholder='Username*' value={username} onChange=
          {(ev) => setUsername(ev.target.value)} style={{ padding: '8px', marginBottom: '30px', fontSize: '16px', width: '400px',height:'50px',borderRadius:'10px' }}></input>
        <input type='password' placeholder='Password*' value={password} onChange=
          {(ev) => setPassword(ev.target.value)} style={{ padding: '8px', marginBottom: '10px', fontSize: '16px', width: '400px',height:'50px',borderRadius:'10px' }}></input>
        <Link to='/register' style={{marginTop:'20px'}}>Don't have an account? Sign up!</Link>
        <button type="submit" className="btn btn-outline-primary" style={{ padding: '10px', backgroundColor: '#4CAF50', border: 'none', color: '#fff', cursor: 'pointer',marginTop: '30px',width: '200px',height:'50px',fontSize: '25px',borderRadius:'10px' }}>LOG IN</button>
      </form>
      {pressed ? (success ? <div style={{padding: '30px',backgroundColor:'blue',marginTop:'30px',borderRadius:'30px',textAlign:'center'}}>
      <p style={{fontSize:'25px',color:'white'}}>{resultMessage}</p>
      <Navigate to="/" />
      </div> : <div style={{padding: '30px',backgroundColor:'blue',marginTop:'30px',borderRadius:'30px',textAlign:'center'}}>
      <p style={{fontSize:'25px',color:'white'}}>{resultMessage}</p>
      <Link to='/login' onClick={()=>setPressed(false)} style={{marginTop:'20px',fontSize:'30px',color:'white',padding:'10px',backgroundColor:'coral',borderRadius:'10px',textDecoration:'none'}}>Try to login again</Link>
      </div>) : <p></p>}
    </div>
  </>
}

export default Login;