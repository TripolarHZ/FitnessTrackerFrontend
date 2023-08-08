import React, { useState, } from 'react';
import {Link} from 'react-router-dom';

const COHORT_NAME = '2303-ftb-et-web-pt';
const BASE_URL = `https://fitnesstrac-kr.herokuapp.com/api/${COHORT_NAME}`;

const Register = () => {
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);
  const [success, setSuccess] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [pressed, setPressed] = useState(false);
  const registerUser = async (ev) => {
    ev.preventDefault();
    try {
      const response = await fetch(
        `${BASE_URL}/users/register`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            username: username,
            password: password
          }
        })
      });
      const result = await response.json();
      console.log(result);
      setPressed(true);
      if(result.success===true) {
        setSuccess(true);
        setResultMessage(result.data.message);
        setUsername('');
      }
      else{
        setSuccess(false);
        setResultMessage(result.error.message);
      }
      setPassword('');
    } catch (err) {
      console.error(err);
    }
  }

  return <>
  <div className="signUpContainer" style={{display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems:'center',marginTop:'100px'}}>
    <h1 style={{ fontSize: '70px', textAlign: 'center', marginBottom: '50px' }}>Sign Up</h1>
    <form onSubmit={registerUser} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <input type='text' placeholder='Username*' value={username} onChange=
        {(ev) => setUsername(ev.target.value)} style={{ padding: '8px', marginBottom: '30px', fontSize: '16px', width: '400px',height:'50px',borderRadius:'10px' }}></input>
      <input type='password' placeholder='Password*' value={password} onChange=
        {(ev) => setPassword(ev.target.value)} style={{ padding: '8px', marginBottom: '10px', fontSize: '16px', width: '400px',height:'50px',borderRadius:'10px' }}></input>
      <button type="submit" className="btn btn-outline-primary" style={{ padding: '10px', backgroundColor: '#4CAF50', border: 'none', color: '#fff', cursor: 'pointer',marginTop: '30px',width: '200px',height:'50px',fontSize: '25px',borderRadius:'10px' }}>SIGN UP</button>
    </form>
    {pressed ? (success ? <div style={{padding: '30px',backgroundColor:'blue',marginTop:'30px',borderRadius:'30px',textAlign:'center'}}>
      <p style={{fontSize:'25px',color:'white'}}>{resultMessage}</p>
      <Link to='/login' style={{marginTop:'20px',fontSize:'30px',color:'white',padding:'10px',backgroundColor:'coral',borderRadius:'10px',textDecoration:'none'}}>Go back to login</Link>
      </div> : <div style={{padding: '30px',backgroundColor:'blue',marginTop:'30px',borderRadius:'30px',textAlign:'center'}}>
      <p style={{fontSize:'25px',color:'white'}}>{resultMessage}</p>
      <Link to='/register' onClick={()=>setPressed(false)} style={{marginTop:'20px',fontSize:'30px',color:'white',padding:'10px',backgroundColor:'coral',borderRadius:'10px',textDecoration:'none'}}>Try to sign up again</Link>
      <p style={{fontSize:'25px',color:'white'}}>or</p>
      <Link to='/login' style={{marginTop:'20px',fontSize:'30px',color:'white',padding:'10px',backgroundColor:'coral',borderRadius:'10px',textDecoration:'none'}}>Go back to login</Link>
      </div>) : <p></p>}
  </div>
  </>
}

export default Register;